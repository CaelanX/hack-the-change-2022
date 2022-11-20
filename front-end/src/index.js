import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import Homepage from "./pages/homepage";
import CreateCredential from "./pages/CreateCredential/CreateCredential";
import LoginCard from "./pages/login/Components/LoginCard";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginCard/>}/>
        <Route path="homepage" element={<Homepage/>}/>
        <Route path="credential" element={<CreateCredential/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

