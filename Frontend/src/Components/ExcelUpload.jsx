import { Button, Box } from "@mui/material";
import * as XLSX from "xlsx";

const ExcelUpload = ({ setRows, setFile, file, setStatus, uploadExcel }) => {
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
        defval: "",
      });

      setRows(data);
    };
    try {
      if (!file) {
        alert("Please select an Excel file");
        return;
      }
      setStatus("Uploading...");
      await uploadExcel(file);
      setStatus("Uploaded to Google Drive ✅");
    } catch (error) {
      setStatus(error.message || "Upload failed ❌");
    }
    reader.readAsBinaryString(selectedFile);
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

      {/* <Button
        variant="contained"
        sx={{ ml: 2 }}
        onClick={handleUpload}
      >
        Upload
      </Button> */}
    </Box>
  );
};

export default ExcelUpload;
