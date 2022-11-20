import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import Authentication from "./pages/login/Authentication";
import Homepage from "./pages/homepage";
import CreateCredential from "./pages/CreateCredential/CreateCredential";
import RegisterCard from './pages/login/Components/RegisterCard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication/>}/>
        <Route path="homepage" element={<Homepage/>}/>
        <Route path="credential" element={<CreateCredential/>}/>
        <Route path="register" element={<RegisterCard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

