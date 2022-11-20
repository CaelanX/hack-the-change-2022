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

	const [openModel, setOpenModel] = React.useState(false);
	const [pdfUrl, setPdfUrl] = useState(undefined);
	const [file, setFile] = useState(undefined);
	const [finishedUplod, setFinishedUplod] = useState(false)


	const storage = getStorage();
	const formik = useFormik({
		initialValues: {
			credentialName: 'IELTS',
		},
		onSubmit: values => {
			addDoc(credentialRef, { ...values, pdfUrl, verfiedat: '', isverified: new Date() })
			setOpenModel(false);
		}
	})

	const { values, handleChange, setFieldValue } = formik

	const onUploadFile = async (files) => {
		setFinishedUplod(true)
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
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
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
						<Grid item xs={12} sx={{ border: '1px dashed grey', borderRadius: '10px', padding: '30px', marginY: '16px' }}>
							<Box sx={{ display: 'relative', flexDirection: "column", }}>
								<Dropzone onDrop={onUploadFile} >
									{({ getRootProps, getInputProps }) => (
										<section>
											<div {...getRootProps()}>
												<input {...getInputProps()} />
												{!finishedUplod && <Box sx={{ position: 'absolute', left: '5%', top: '20%', padding: "100px 200px" }}>Drag 'n' drop some files here, or click to select files</Box>}
											</div>
										</section>
									)}
								</Dropzone>
								<Box>
									<ViewPdf fileData={file} />
								</Box>
							</Box>
							{/* <UploadButtons /> */}
						</Grid>

						<Grid item xs={10}>
						</Grid>
						<Grid item xs={1} sx={{ marginLeft: '40px', marginRight: '4px' }}>
							<Button variant='contained' onClick={formik.submitForm}>Submit</Button>
						</Grid>
					</Grid>
				</Box>
			</TransitionsModal>
		</FormikProvider>
	)
}

export default CreateCredentail
