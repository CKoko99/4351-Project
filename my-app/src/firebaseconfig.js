// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_QHjlnSJE2HI0MenAV7Woqsw1fazoKqk",
  authDomain: "restaurant-reservation-33c61.firebaseapp.com",
  projectId: "restaurant-reservation-33c61",
  storageBucket: "restaurant-reservation-33c61.appspot.com",
  messagingSenderId: "338184770468",
  appId: "1:338184770468:web:33d0bdc34c9e13ffbb6731",
  measurementId: "G-ZBJYZFNF24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);