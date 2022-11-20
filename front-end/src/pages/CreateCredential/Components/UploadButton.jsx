import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ref, uploadBytes, getStorage } from 'firebase/storage';
import Dropzone from 'react-dropzone'

export default function UploadButtons() {
	const storage = getStorage();
	const onUploadFile = async (e) => {
		const file = e.target.files[0];
		const storageRef = ref(storage, file.name);
		await uploadBytes(storageRef, file);
	}

	return (
		<Stack direction="row" alignItems="center" spacing={2}>
			<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
				{({ getRootProps, getInputProps }) => (
					<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<p>Drag 'n' drop some files here, or click to select files</p>
						</div>
					</section>
				)}
			</Dropzone>
			<Button variant="contained" component="label">
				Upload
				<input hidden accept=".pdf" multiple type="file" onChange={onUploadFile} />
			</Button>
		</Stack>
	);
}
