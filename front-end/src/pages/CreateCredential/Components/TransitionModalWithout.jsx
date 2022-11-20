import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { Fab, IconButton, Paper } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '800px',
	height: '400px',
	bgcolor: 'background.paper',
	boxShadow: 24,
	borderRadius: 4,
	padding: '20px'
};

export default function TransitionsModalWithout({ children, openModel, setOpenModel }) {

	const handleOpen = () => setOpenModel(true);
	const handleClose = () => setOpenModel(false);

	return (
		<Box>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={openModel}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openModel}>
					<Box sx={style}>
						{children}
					</Box>
				</Fade>
			</Modal>
		</Box >
	);
}
