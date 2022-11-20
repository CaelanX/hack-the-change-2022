import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import LoginCard from "./pages/login/Components/LoginCard";

function App() {

  return (
    <div className="App">
      <LoginCard />
      {/* <Homepage /> */}
    </div>
  );
}

export default App;
