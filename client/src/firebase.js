// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABs02LDvpj-aT3uoyXkz3aGskq1aJRORc",
  authDomain: "tasklink-a7f09.firebaseapp.com",
  //databaseURL: "https://tasklink-a7f09-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tasklink-a7f09",
  storageBucket: "tasklink-a7f09.firebasestorage.app",
  messagingSenderId: "501009535490",
  appId: "1:501009535490:web:34543e702740fef9bacd1b",
  measurementId: "G-S557CYX4MW"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

