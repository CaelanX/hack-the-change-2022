import React, {useState} from 'react'
import LoginCard from "./Components/LoginCard";
import RegisterCard from "./Components/RegisterCard";
import {Button, Typography} from "@mui/material";

function Authentication() {
  const [registration, setRegistration] = useState(false)
  const onClick = () => {
    setRegistration(!registration)
  }

  return <div className="authentication-page">
    <Typography className='authentication-title' variant='h1' >Uni<span>Creds</span></Typography>
    {registration ? <RegisterCard/> : <LoginCard/>}
    {registration ? <></> :
    <Button variant={'contained'} onClick={onClick}>Register</Button> }
  </div>
}

export default Authentication;