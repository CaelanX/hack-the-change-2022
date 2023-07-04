import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import Homepage from "./pages/homepage";
import CreateCredential from "./pages/CreateCredential/CreateCredential";
import LoginCard from "./pages/login/Components/LoginCard";
import RegisterCard from "./pages/login/Components/RegisterCard";
import CredProfile from './pages/CredProfile/CredProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginCard />} />
        <Route path="register" element={<RegisterCard />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="credential" element={<CreateCredential />} />
        <Route path="profile" element={<CredProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

