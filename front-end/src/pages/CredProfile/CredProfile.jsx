import { Box, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../firebase-config";
import {
	collection,
	getDocs,
	query,
	where
} from "firebase/firestore";

import { useLocation } from 'react-router-dom'
import ViewPDFFire from './ViewPDFFire';

function useQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const columns = [
	{ field: "id", headerName: "id", width: 130 },
	{ field: "name", headerName: "Name", width: 130 },
	{
		field: "verifiedAt",
		headerName: "Issued On",
		type: "number",
		width: 150,
	},
	{
		field: "isVerified",
		headerName: "Status",
		width: 130,
		renderCell: (params) => {
			return params.row.isVerified ? <Chip label="verified" color='success' /> : <Chip label="pending" color='warning' />
		}

	},
	{
		field: "pdfUrl",
		headerName: "File",
		width: 200,
	}
];

const CredProfile = () => {
	const routerQuery = useQuery();
	const [credIds, setCredIds] = useState([]);
	const [documents, setDocuments] = useState([]);

	const documentCollectionRef = collection(db, "documents");

	const fetchData = async (credIdsArray) => {
		console.log('credIdsArray', credIdsArray)
		if (credIdsArray.length > 0) {
			// const queryById = query(documentCollectionRef, where("id", "in", credIdsArray));
			const data = await getDocs(documentCollectionRef);
			console.log(data.docs)
			setDocuments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, pros: doc.id })));

		}
	}


	useEffect(() => {
		const credIdsArray = routerQuery.get('docs').split(',');
		console.log(credIdsArray)
		setCredIds(credIdsArray);
		fetchData(credIdsArray)

	}, [routerQuery])

	return (
		<Box sx={{ padding: "40px 100px" }}>
			{console.log(documents)}
			<DataGrid
				rows={documents.filter((doc) => credIds.includes(doc.id))}
				columns={columns}
				pageSize={9}
				rowsPerPageOptions={[9]}
				autoHeight={true}
				checkboxSelection
				density="comfortable"
				disableExtendRowFullWidth={false}
				hideFooterPagination={true}
			/>
		</Box>
	)
}

export default CredProfile
