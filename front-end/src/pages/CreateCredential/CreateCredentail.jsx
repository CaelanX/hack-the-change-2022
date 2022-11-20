import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import UnstyledInput from './Components/Input'
import Grid from '@mui/material/Grid';
import { Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import ViewPdf from './Components/ViewPdf'

import { FormikProvider, useFormik } from 'formik'
import UploadButtons from './Components/UploadButton';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import TransitionsModal from './Components/ModalWrapper';
import Dropzone from 'react-dropzone'

const CreateCredentail = () => {
	const credentialRef = collection(db, 'documents')
	const [pdfUrl, setPdfUrl] = useState(undefined);
	const [file, setFile] = useState(undefined);


	// Create a root reference
	const storage = getStorage();
	// const imageRef = ref(storage, file);

	const formik = useFormik({
		initialValues: {
			credentialName: 'IELTS',
		},
		onSubmit: values => {
			addDoc(credentialRef, { ...values, pdfUrl })
		}

	})

	const { values, handleChange, setFieldValue } = formik

	// useEffect(() => {
	// 	getDownloadURL(imageRef).then((url) => {
	// 		// Insert url into an <img> tag to "download"
	// 		setPdfUrl(url);
	// 	}).catch((error) => {
	// 		// Handle any errors
	// 	});
	// }, [])

	const onUploadFile = async (files) => {
		console.log(files[0])
		setFile(files[0])
		const storageRef = ref(storage, files[0].name);
		console.log(storageRef)

		await uploadBytes(storageRef, files[0])

		await getDownloadURL(storageRef).then((url) => {
			setPdfUrl(url);
		}).catch((error) => {
			// Handle any errors
		});

	}

	return (
		<FormikProvider value={formik}>
			<TransitionsModal>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<Grid container >
						<Grid item xs={12} >
							<FormControl fullWidth>
								<InputLabel id="credentialName">Credential Name</InputLabel>
								<Select
									labelId="credentialName"
									key="credentialName"
									label="Credential Name"
									value={values.credentialName}
									onChange={(e) => setFieldValue('credentialName', e.target.value)}
								>
									<MenuItem value={"IELTS"}>IELTS</MenuItem>
									<MenuItem value={"TOFEL"}>TOFEL</MenuItem>
									<MenuItem value={"TRANSCRIPT"}>Transcript</MenuItem>
									<MenuItem value={"DIPLOMA"}>Diploma</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Dropzone onDrop={onUploadFile} >
								{({ getRootProps, getInputProps }) => (
									<section>
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											<p>Drag 'n' drop some files here, or click to select files</p>
										</div>
									</section>
								)}
							</Dropzone>
							{/* <UploadButtons /> */}
						</Grid>
						<Grid item xs={12}>

							<Button variant='outlined' onClick={formik.submitForm}>Submit</Button>
						</Grid>
					</Grid>
					<ViewPdf file={file} />
				</Box>
			</TransitionsModal>
		</FormikProvider>
	)
}

export default CreateCredentail
