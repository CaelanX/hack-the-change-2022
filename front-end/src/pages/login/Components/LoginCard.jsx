import React, {useState} from 'react';
import {Input, IconButton, InputAdornment, Stack, InputLabel, FormControl, Button,} from "@mui/material";
import {Visibility, Person, VisibilityOff} from "@mui/icons-material";
import * as yup from'yup';
import {useFormik} from "formik";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate} from 'react-router-dom'
import {red} from '@mui/material/colors'


function LoginCard() {
    const [showPassword, setShowPassword] = useState(false)
    const navigator = useNavigate();
    const auth = getAuth();
    console.log(auth)

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
            email: "email@gmail.com",
            password: "password",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                navigator("/homepage")

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

    return <div className="login-div">
        <form onSubmit={formik.handleSubmit}>
        <Stack
            sx={{
                width: '25ch',
            }}
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        sx={{
                            color: red[500],
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <Person/>
                            </InputAdornment>
                        }
                    />
            </FormControl>

            <FormControl>
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
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
            </FormControl>
            </Stack>
            <Button type='submit' className="login-button" variant="outlined">Login</Button>
    </form>
</div>

}

export default LoginCard;