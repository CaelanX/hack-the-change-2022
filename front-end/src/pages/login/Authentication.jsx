import React, {useState} from 'react'
import LoginCard from "./Components/LoginCard";
import RegisterCard from "./Components/RegisterCard";
import {Button, Typography} from "@mui/material";

function Authentication() {

  return (
    <div
      className="authentication-page"
      style={{
        backgroundColor: "#00000076",
        height: "100vh",
        position: "relative",
        botton: "100",
      }}
    >
      <LoginCard /> :
    </div>
  );
}

export default Authentication;