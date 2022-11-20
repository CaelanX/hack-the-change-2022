import React, {useState} from 'react'
import AuthenticationCard from "./Components/AuthenticationCard";
import RegisterCard from "./Components/RegisterCard";
import {Button, Typography} from "@mui/material";

function Authentication() {
  const [registration, setRegistration] = useState(false)
  const onClick = () => {
    setRegistration(!registration)
  }

  return <div className="authentication-page">
    <Typography className='authentication-title' variant='h1' >Uni<span>Creds</span></Typography>
    {registration ? <RegisterCard/> : <AuthenticationCard/>}
    {registration ? <></> :
    <Button variant={'contained'} onClick={onClick}>Register</Button> }
  </div>
}

export default Authentication;