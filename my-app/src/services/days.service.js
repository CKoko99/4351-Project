import { db } from "../firebaseconfig";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const daysCollectionRef = collection(db, "Days");
class DaysDataService {
  addDay = (newDay) => {
    return addDoc(daysCollectionRef, newDay);
  };

  updateDays = (id, updatedDays) => {
    const daysDoc = doc(db, "Days", id);
    return updateDoc(daysDoc, updatedDays);
  };

  deleteDays = (id) => {
    const daysDoc = doc(db, "Days", id);
    return deleteDoc(daysDoc);
  };

  getAllDays = () => {
    return getDocs(daysCollectionRef);
  };

  getDay = (id) => {
    const dayDoc = doc(db, "Days", id);
    return getDoc(dayDoc);
  };
}

export default new DaysDataService();