import React, {useState} from 'react';
import {Input, IconButton, InputAdornment, Stack, InputLabel, FormControl, Button,} from "@mui/material";
import {Visibility, Person, VisibilityOff} from "@mui/icons-material";
import * as yup from'yup';
import {useFormik} from "formik";


function AuthenticationCard() {
    const [showPassword, setShowPassword] = useState(false)
    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Valid email address required')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(9, 'Password must be 8 characters or longer')
            .required('Password is required')

    })
    const formik = useFormik({
        initialValues: {
            email: "email@gmail.com",
            password: "password",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

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
                <InputLabel htmlFor="login-email">Email</InputLabel>
                    <Input id="login-email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
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
            <Button className="login-button" variant="outlined">Login</Button>
    </form>
</div>

}

export default AuthenticationCard;