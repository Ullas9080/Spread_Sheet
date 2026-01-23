import React, { useState } from "react";
import * as XLSX from "xlsx";

import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from "@mui/material";

function App() {

  const [rows, setRows] = useState([]);

 
  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

      const workbook = XLSX.read(e.target.result, {
        type: "binary"
      });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: ""
      });

      setRows(data);

    };

    reader.readAsBinaryString(file);
  };





  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Excel Import & Send to API
      </Typography>

      {/* Upload Button */}
      <Box sx={{ mb: 3 }}>
        <Button variant="contained" component="label">
          Upload Excel File
          <input
            type="file"
            accept=".xlsx,.xls"
            hidden
            onChange={handleExcelUpload}
          />
        </Button>
      </Box>

      {/* Excel Data Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table size="small">
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell align="center">
                  No Excel data loaded
                </TableCell>
              </TableRow>
            )}

            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell key={colIndex}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
