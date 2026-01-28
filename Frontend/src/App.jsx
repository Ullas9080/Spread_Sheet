import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

import GoogleLogin from "./components/GoogleLogin";
import ExcelUpload from "./components/ExcelUpload";
import ExcelPreview from "./components/ExcelPreview";
import FormulaList from "./components/FormulaList";

import { uploadExcel, processSheet } from "./service/api";

function App() {
  const [rows, setRows] = useState([]);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [rawSpreadsheetId, setRawSpreadsheetId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "success") {
      setIsLoggedIn(true);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const handleCalculate = async (formulaKey) => {
    try {
      
setStatus("Processing formulas...");

      const res = await processSheet({
        rawSpreadsheetId,
        formulaKey
      });

      if (!res.newSheetUrl) {
        alert("Sheet URL not received ❌");
        return;
      }

      setStatus("Calculation completed ✅");
      window.open(res.newSheetUrl, "_blank");

    } catch (err) {
      setStatus("Processing failed ❌");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Excel Upload → Select Formula → Apply
      </Typography>

      {!isLoggedIn && <GoogleLogin />}

      {isLoggedIn && (
        <>
          <ExcelUpload
            setRows={setRows}
            setFile={setFile}
            setStatus={setStatus}
            setRawSpreadsheetId={setRawSpreadsheetId}
            uploadExcel={uploadExcel}
          />

          <Typography sx={{ mb: 2 }}>{status}</Typography>

          <ExcelPreview rows={rows} />

          {rawSpreadsheetId && (
            <FormulaList
              onCalculate={handleCalculate}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default App;
