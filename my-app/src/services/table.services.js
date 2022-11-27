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

const tableCollectionRef = collection(db, "Table");
class TableDataService {
  addTables = (newTable) => {
    return addDoc(tableCollectionRef, newTable);
  };

  updateTable = (id, updatedTable) => {
    const tableDoc = doc(db, "Table", id);
    return updateDoc(tableDoc, updatedTable);
  };

  deleteTable = (id) => {
    const tableDoc = doc(db, "Table", id);
    return deleteDoc(tableDoc);
  };

  getAllTables = () => {
    return getDocs(tableCollectionRef);
  };

  getTable = (id) => {
    const tableDoc = doc(db, "Table", id);
    return getDoc(tableDoc);
  };
}

export default new TableDataService();
