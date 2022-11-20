import { Backdrop } from "@mui/material";

export default function GlassBackdrop({ children }) {
	return (
		<div>
			<Backdrop
				sx={{ backdropFilter: '4px', backgroundColor: 'rgba(33, 33, 33, 0.7)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open
			>
				{children}
			</Backdrop>
		</div>
	);
}
