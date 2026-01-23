import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography
} from "@mui/material";

const ExcelPreview = ({ rows }) => {
  if (rows.length === 0) {
    return <Typography>No Excel data loaded</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table size="small">
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, colIndex) => (
                <TableCell key={colIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExcelPreview;
