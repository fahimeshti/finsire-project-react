import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCyqlaUzEK4NUwhiBZ4TF4gfXYOEtKUPJ0",
  authDomain: "finsire-dataset.firebaseapp.com",
  databaseURL: "https://finsire-dataset-default-rtdb.firebaseio.com",
  projectId: "finsire-dataset",
  storageBucket: "finsire-dataset.appspot.com",
  messagingSenderId: "94137293401",
  appId: "1:94137293401:web:a32d001e3346804b592f48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)