import React, {useState} from 'react';
import {Input, IconButton, InputAdornment, Stack, InputLabel, FormControl, Button,} from "@mui/material";
import {Visibility, Person, VisibilityOff} from "@mui/icons-material";
import * as yup from'yup';
import {useFormik} from "formik";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate} from 'react-router-dom'
import {red} from '@mui/material/colors'
import {Typography} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./LoginCard.css"

const auth = getAuth();

function LoginCard() {
    const [showPassword, setShowPassword] = useState(false)

    const navigator = useNavigate();

    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Valid email address required')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password must be 8 characters or longer')
            .required('Password is required')

    })
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    toast.success("Loggin In");
                    setTimeout(()=>{
                        navigator("/homepage")
                    },3000)
            }
            )
        }
    })

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClick = () => {
       navigator("/register")
    }

    return (
      <div className="login-page">
        <Typography className="login-title" sx={{fontWeight: "bold"}} variant="h1">
          Uni<span>Creds</span>
        </Typography>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <Stack
            sx={{
              width: "35ch",
            }}
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                sx={{
                  color: red[500],
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <Person />
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl fullWidth={true}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      value={formik.values.password}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
              <Stack spacing={3} direction={"row"}>
                  <Button sx={{backgroundColor: "darkred"}}
                  type="submit"
                  className="login-button"
                  variant="contained"
              >
                  Login
              </Button>
              <a
                  onClick={handleClick}
              >
                  <Typography style={{ color: "blue" }}>Sign up</Typography>
              </a>{" "}
              </Stack>
          </Stack>

        </form>
          <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
          />
      </div>
    );

}

export default LoginCard;