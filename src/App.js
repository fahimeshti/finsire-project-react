import './App.css'
import { onValue, ref, update } from "@firebase/database";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { db } from "./firebase";

function App() {
const [mean, setMean] = useState([])
const [median, setMedian] = useState('')
const [mode, setMode] = useState('')
const [stdDev, setStdDev] = useState('')
const [userData, setUserData] = useState('')

  useEffect(()=>{
    showDataSet()
  },[])

  const updateDatabase = (newUserData) => {
    onValue(ref(db), (snapshot) => {
      const dbdata = snapshot.val();
      const updatedArr = [...dbdata.data, Number(newUserData)]
      update(ref(db), {
        data: [...updatedArr]
      });
      showDataSet()
  }, {
    onlyOnce: true
  })
};


const showDataSet = () => {
  onValue(ref(db), (snapshot) => {
    const data = snapshot.val();
    if (data !== null) {
      const cleanData = data?.data.filter(Boolean)
      setMean((getMean(cleanData)).toFixed(6))
      setMedian((getMedian(cleanData)).toFixed(6))
      setMode(getModes(cleanData))
      setStdDev((getStandardDeviation(cleanData)).toFixed(6))
    }
  })
}
  
const updateForm = (e)=> {
  e.preventDefault()
  if (userData) {
    updateDatabase(userData)
    setUserData('')
  }
}
  
  
  const getMean = (array) => array.reduce((a, b) => a + b) / array.length;

  const getMedian = (arr) => {
    let middle = Math.floor(arr.length / 2);
    arr = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
  };

  const getModes = (array) => {
    var frequency = []; 
    var maxFreq = 0; 
    var modes = [];
  
    for (var i in array) {
      frequency[array[i]] = (frequency[array[i]] || 0) + 1; 
  
      if (frequency[array[i]] > maxFreq) { 
        maxFreq = frequency[array[i]]; 
      }
    }
    for (var k in frequency) {
      if (frequency[k] === maxFreq) {
        modes.push(k);
      }
    }
    return modes;
  }

  const getStandardDeviation = (array) => {
    const n = array.length
    if (!array || array.length === 0) {return 0;}
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
  }



  
  return (
      <section className="main-cont-body">
        <div className="cards-body">
          <Card title="Mean" calcData={mean} bgColor="#F1536E" />
          <Card title="Median" calcData={median} bgColor="#3DA5F4" />
          <Card title="Std. Dev." calcData={stdDev} bgColor="#FDA006" />
          <Card title="Mode" calcData={mode} bgColor="#00C689" />
        </div>
        <button onClick={showDataSet}>Refresh Data</button>
        <form onSubmit={updateForm}>
          <input type="number" value={userData} onChange={(e)=>setUserData(e.target.value)} />
          <button type="submit">submit</button>
        </form>
      </section>
  );
}

export default App;
