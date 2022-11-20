import { Box } from '@mui/system'
import React from 'react'
import UnstyledInput from './Components/Input'
import Grid from '@mui/material/Grid';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { FormikProvider, useFormik } from 'formik'
import UploadButtons from './Components/UploadButton';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase-config';

const CreateCredentail = () => {
	const credentialRef = collection(db, 'credentials')

	const formik = useFormik({
		initialValues: {
			credentialName: 'IELTS',
		},
		onSubmit: values => {
			addDoc(credentialRef, { ...values })
		}

	})
	return (
		<FormikProvider value={formik}>
			<Box sx={{ px: 10 }}>
				<Grid container >
					<Grid item xs={6} >
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Credential Name</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Age"
								value={"IELTS"}
								onChange={formik.handleChange}
							>
								<MenuItem value={"IELTS"}>IELTS</MenuItem>
								<MenuItem value={"TOFEL"}>TOFEL</MenuItem>
								<MenuItem value={"TRANSCRIPT"}>Transcript</MenuItem>
								<MenuItem value={"DIPLOMA"}>Diploma</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<UploadButtons />

					</Grid>



				</Grid>
				<Button onClick={formik.submitForm} />
			</Box>
		</FormikProvider>
	)
}

export default CreateCredentail
