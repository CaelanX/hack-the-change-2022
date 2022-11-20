import { useState, useEffect } from "react";
import { db } from '../../../firebase-config'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const documentCollectionRef = collection(db, "documents");




// const createUser = async () => {
//   await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
// };

// const deleteUser = async (id) => {
//   const userDoc = doc(db, "users", id);
//   await deleteDoc(userDoc);
// };
