import { Button, Box } from "@mui/material";
import * as XLSX from "xlsx";

const ExcelUpload = ({
  setRows,
  setFile,
  setStatus,
  setRawSpreadsheetId,
  uploadExcel
}) => {

  const handleFileSelect = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: ""
      });

      setRows(data);
    };
    reader.readAsBinaryString(selectedFile);

 
    try {
      setStatus("Uploading...");
      const res = await uploadExcel(selectedFile);

      setRawSpreadsheetId(res.rawSpreadsheetId);

      setStatus("Uploaded to Google Drive ✅");
    } catch (err) {
      setStatus(err.message || "Upload failed ❌");
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Button component="label" variant="outlined">
        Select Excel File
        <input
          type="file"
          accept=".xlsx,.xls"
          hidden
          onChange={handleFileSelect}
        />
      </Button>
    </Box>
  );
};

export default ExcelUpload;
