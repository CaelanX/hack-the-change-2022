import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { async } from "@firebase/util";
import CreateCredential from "../../CreateCredential/CreateCredential";
import { Box, Chip, Fab } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom'
import QRCode from "react-qr-code";
import TransitionsModal from "../../CreateCredential/Components/ModalWrapper";
import TransitionsModalWithout from "../../CreateCredential/Components/TransitionModalWithout";



const columns = [
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "verifiedAt",
    headerName: "Issued On",
    type: "number",
    width: 150,
    // renderCell: (params) => {
    //   return <span>{params.row.verifiedAt}</span>
    // }
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
    headerName: "actions",
  },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];


export default function Dashboard() {

  const [documents, setDocuments] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [showShare, setShowShare] = useState(false)
  const navigator = useNavigate()
  const [openModel, setOpenModel] = useState(false);

  const documentCollectionRef = collection(db, "documents");

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await getDocs(documentCollectionRef);
    setDocuments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, pros: doc.id })));
  }

  useEffect(() => {
    console.log(selectionModel)
  }, [selectionModel])

  const handleShare = () => {
    const selectedId = selectionModel.reduce((acc, curr) => {
      return acc + curr + ","
    }, '?docs=')
    navigator(`/profile` + selectedId)


  }

  console.log(documents)

  return (
    <div style={{ height: "100%", width: "50%", margin: "auto", position: 'relative' }}>
      <DataGrid
        style={{ padding: "10px 25px" }}
        rows={documents}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        autoHeight={true}
        checkboxSelection
        density="comfortable"
        disableExtendRowFullWidth={false}
        hideFooterPagination={true}
        // selectionModel={selectionModel}
        onSelectionModelChange={(newSelection) => {
          setShowShare(true)
          setSelectionModel(newSelection);
        }}
      />
      <Box sx={{ position: 'absolute', bottom: '30px', right: '-100px' }}>
        {showShare && (
          <Box sx={{ marginBottom: '8px' }}>
            <Fab onClick={() => {
              setOpenModel(true)
            }}>
              <ShareIcon />
            </Fab>
          </Box>
        )}
        <TransitionsModalWithout openModel={openModel} setOpenModel={setOpenModel}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '70px' }}>
            {<QRCode value={`https://hack-the-change-2022.vercel.app/profile/${selectionModel.reduce((acc, curr) => {
              return acc + curr + ","
            }, '?docs=')}`} />}
          </Box>
        </TransitionsModalWithout>
        <CreateCredential />
      </Box>
    </div>
  );
}
