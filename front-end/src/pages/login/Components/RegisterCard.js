import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {db} from '../../../../src/firebase-config'
import {FormControl, Input, InputAdornment, InputLabel, Stack} from "@mui/material";
import {Mail, Person} from "@mui/icons-material";
import { doc, setDoc } from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

function RegisterCard(){
    const auth = getAuth();
    const onRegister = async (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                    // const user = userCredential.user
                    // db.collection("users").doc(values.email).set(values)
                    //     .then(() => {
                    //
                    //     })
                console.log(userCredential)

                }
            )

    }


    const validationSchema = yup.object({
        name: yup.object({
            first: yup
                .string('Enter your first name')
                .required('First name is required'),
            last: yup
                .string('Enter your first name')
                .required('First name is required'),
        }),
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        address: yup.object({
            street: yup
                .string('Enter your address')
                .required('Street address required'),
            city: yup
                .string('Enter your city')
                .required('city is required'),
            state: yup
                .string('Enter your State, Province or Territory')
                .required('State, Province, or Territory is required'),
            country: yup
                .string('Enter your country')
                .required('country is required'),
            postalCode: yup
                .string('Enter your postal/zip code')
                .required('city is required'),
        }),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),

    });

    const formik = useFormik({
        initialValues: {
            name: {
                first: "",
                last: "",
            },
            email: "",
            address: {
                street: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
            },
            password: ""

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {onRegister(values)},
    });

    return <div>
        <form onSubmit={formik.handleSubmit}>
            <Stack sx={{
                       width: '25ch',
                   }}
                   justifyContent="center"
                   alignItems="center"
                   spacing={2}>

                <FormControl>
                    <InputLabel htmlFor="register-firstName">First Name</InputLabel>
                    <Input id="register-firstName"
                           onChange={formik.handleChange}
                           value={formik.values.name.first}
                    />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="register-lastName">Last Name</InputLabel>
                    <Input id="register-lastName"
                           onChange={formik.handleChange}
                           value={formik.values.name.last}
                    />
                </FormControl>

                <FormControl>
                <InputLabel htmlFor="register-email">Email</InputLabel>
                <Input id="register-email"
                       onChange={formik.handleChange}
                       value={formik.values.email}
                       endAdornment={
                           <InputAdornment position="end">
                               <Mail/>
                           </InputAdornment>
                       }
                />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="register-street">Street Address</InputLabel>
                    <Input id="register-street"
                           onChange={formik.handleChange}
                           value={formik.values.address.street}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="register-city">City</InputLabel>
                    <Input id="register-city"
                           onChange={formik.handleChange}
                           value={formik.values.address.city}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="register-state">State, Province, or Territory</InputLabel>
                    <Input id="register-state"
                           onChange={formik.handleChange}
                           value={formik.values.address.state}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="register-country">Country</InputLabel>
                    <Input id="register-street"
                           onChange={formik.handleChange}
                           value={formik.values.address.country}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="register-password">Password</InputLabel>
                    <Input id="register-password"
                           onChange={formik.handleChange}
                           value={formik.values.address.password}
                    />
                </FormControl>

            </Stack>

        </form>


    </div>
}

export default RegisterCard;
