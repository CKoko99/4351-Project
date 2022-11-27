import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCInum8TLXyo_-_08ZWFY3xN5Z3Ikn7hQE",
  authDomain: "cosc4351-40e40.firebaseapp.com",
  projectId: "cosc4351-40e40",
  storageBucket: "cosc4351-40e40.appspot.com",
  messagingSenderId: "872197037352",
  appId: "1:872197037352:web:0d67286d985ad158e3041d",
  measurementId: "G-ZCWZMJ9X3X"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);