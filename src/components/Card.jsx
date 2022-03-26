import './Card.css';

const Card = ({bgColor, calcData, title}) => {
    return (
        <div style={{backgroundColor:bgColor}} className="main-container">
            <h2>{title}</h2>
        {Array.isArray(calcData) ?
            (calcData.map((elem)=> (
            <span key={Math.random()}>{parseFloat(elem).toFixed(6)}</span>
        ))) :
         (<span>{calcData}</span>) }
        </div>
    );
};

export default Card;