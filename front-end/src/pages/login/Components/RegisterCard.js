import React from 'react'
import {FormikProvider, useFormik} from 'formik'
import * as yup from 'yup'
import {db} from '../../../firebase-config'
import {Button, FormControl, Input, InputAdornment, InputLabel, Stack} from "@mui/material";
import {Mail, Person} from "@mui/icons-material";
import {collection, doc, setDoc} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

const RegisterCard = () => {
    const auth = getAuth();

    const onRegister = async (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                    console.log("created");
                    const user = userCredential.user
                setDoc(doc(db, "users", values.email), values)
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
            password: "",

        },
        // validationSchema: validationSchema,
        onSubmit:(values) => {onRegister(values)},
    });

    return <div>
        <form >
            <FormikProvider value={formik}>
            <Stack sx={{
                       width: '50ch',
                   }}
                   justifyContent="center"
                   alignItems="center"
                   spacing={2}>

                <FormControl>
                    <InputLabel htmlFor="name.first">First Name</InputLabel>
                    <Input id="name.first"
                           type="text"
                           onChange={formik.handleChange}
                           value={formik.values.name.first}
                    />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="name.last">Last Name</InputLabel>
                    <Input id="name.last"
                           type="text"
                           onChange={formik.handleChange}
                           value={formik.values.name.last}
                    />
                </FormControl>

                <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email"
                       onChange={formik.handleChange}
                       value={formik.values.email}
                       type="text"
                />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="address.street">Street Address</InputLabel>
                    <Input id="address.street"
                           type="text"
                           onChange={formik.handleChange}
                           value={formik.values.address.street}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="address.city">City</InputLabel>
                    <Input id="address.city"
                           type="text"
                           onChange={formik.handleChange}
                           value={formik.values.address.city}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="address.state">State, Province, or Territory</InputLabel>
                    <Input id="address.state"
                           type="text"
                           onChange={formik.handleChange}
                           value={formik.values.address.state}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="address.country">Country</InputLabel>
                    <Input id="address.country"
                           type="text"
                           onChange={formik.handleChange}
                           value={formik.values.address.country}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password"
                           type="password"
                           onChange={formik.handleChange}
                           value={formik.values.password}
                    />
                </FormControl>
                <Button form="register-form" onClick={formik.submitForm} variant='contained'>Register</Button>

            </Stack>
            </FormikProvider>
        </form>


    </div>
}

export default RegisterCard;
