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
import Homepage from "./pages/homepage";
import Authentication from "./pages/login/Authentication"

function App() {

  return (
    <div className="App">
      <Authentication />
      {/* <Homepage /> */}
    </div>
  );
}

export default App;
