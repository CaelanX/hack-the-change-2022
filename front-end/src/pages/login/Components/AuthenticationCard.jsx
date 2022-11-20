import React, {useState} from 'react';
import {Input, IconButton, InputAdornment, Stack, InputLabel, FormControl, Button,} from "@mui/material";
import {Visibility, Person, VisibilityOff} from "@mui/icons-material";
import yup from'yup';
import {useFormik} from "formik";


function AuthenticationCard() {
    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Valid email address required')
            .required('Email is required'),
        password: yup

    })
    const formik = useFormik({
        initialValues: {
            email: values.email,
            password: "",
        }
    })
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    return <div className="login-div">
        <Stack
            component="form"
            sx={{
                width: '25ch',
            }}
            spacing={2}
            noValidate
            autoComplete="off">
            <FormControl>
                <InputLabel htmlFor="login-email">Email</InputLabel>
                    <Input id="login-email"
                        onChange={handleChange('email')}
                        value={values.email}
                        endAdornment={
                            <InputAdornment position="end">
                                <Person/>
                            </InputAdornment>
                        }
                    />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="login-password">Password</InputLabel>
                    <Input
                        id="login-password"
                        type={values.showPassword ? "text" : "password"}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"

                                    value={values.password}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
            </FormControl>
            </Stack>

            <Button className="login-button" variant="outlined">Login</Button>
            <Button className="login-register-button" variant="contained">Register</Button>

    </div>

}

export default AuthenticationCard;