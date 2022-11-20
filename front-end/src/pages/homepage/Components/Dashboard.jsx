import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { async } from "@firebase/util";
import CreateCredential from "../../CreateCredential/CreateCredential";

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

  const documentCollectionRef = collection(db, "documents");

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await getDocs(documentCollectionRef);
    setDocuments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, pros: doc.id })));
  }

  console.log(documents)

  return (
    <div style={{ height: "100%", width: "50%", margin: "auto" }}>
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
      />
      <CreateCredential />
    </div>
  );
}
