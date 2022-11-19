import React, {useState} from 'react';
import {Form, Visibi FilledInput, IconButton, InputAdornment} from "@mui/material";
import {Input} from "@mui/material";

function Authentication() {

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: '',
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    return <>

        <Input
            id="filled-adornment-password"
            onChange={}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        type={values.showPassword ? 'text' : 'password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
    </>
}

export default Authentication;