import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import UnstyledInput from './Components/Input'
import Grid from '@mui/material/Grid';
import { Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';

import { FormikProvider, useFormik } from 'formik'
import UploadButtons from './Components/UploadButton';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import TransitionsModal from './Components/ModalWrapper';
import Dropzone from 'react-dropzone'

const CreateCredential = () => {
	const [file, setFile] = useState(null);
	const credentialRef = collection(db, 'documents')
	const [pdfUrl, setPdfUrl] = useState(null);


	// Create a root reference
	const storage = getStorage();
	const imageRef = ref(storage, 'sample.pdf');

	const formik = useFormik({
		initialValues: {
			credentialName: 'IELTS',
		},
		onSubmit: values => {
			addDoc(credentialRef, { ...values, pdfUrl })
		}

	})

	useEffect(() => {
		getDownloadURL(imageRef).then((url) => {
			// Insert url into an <img> tag to "download"
			setPdfUrl(url);
		}).catch((error) => {
			// Handle any errors
		});
	}, [])

	const onUploadFile = async (e) => {
		const file = e.target.files[0];
		const storageRef = ref(storage, file.name);
		await uploadBytes(storageRef, file);
	}

	return (
		<FormikProvider value={formik}>
			<TransitionsModal>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<Grid container >
						<Grid item xs={12} >
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
						<Grid item xs={12}>
							<Dropzone onDrop={onUploadFile}>
								{({ getRootProps, getInputProps }) => (
									<section>
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											<p>Drag 'n' drop some files here, or click to select files</p>
										</div>
									</section>
								)}
							</Dropzone>
							<UploadButtons />
						</Grid>
						<Grid item xs={12}>

							<Button variant='outlined' onClick={formik.submitForm}>Submit</Button>
						</Grid>
					</Grid>
				</Box>
			</TransitionsModal>
		</FormikProvider>
	)
}

export default CreateCredential
