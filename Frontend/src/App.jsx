import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

import GoogleLogin from "./components/GoogleLogin";
import ExcelUpload from "./components/ExcelUpload";
import ExcelPreview from "./Components/ExcelPreview"
import { uploadExcel } from "./service/api";

function App() {
  const [rows, setRows] = useState([]);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "success") {
      setIsLoggedIn(true);

      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Excel Upload to Google Drive
      </Typography>


      {!isLoggedIn && <GoogleLogin />}

      {isLoggedIn && (
        <>
          <ExcelUpload
            setRows={setRows}
            setFile={setFile}
            file={file}
            setStatus={setStatus}
            uploadExcel={uploadExcel}
          />

          <Typography sx={{ mb: 2 }}>{status}</Typography>

          <ExcelPreview rows={rows} />
        </>
      )}
    </Container>
  );
}

export default App;
