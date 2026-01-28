import { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from "@mui/material";

const FORMAL_NAMES = ["Finance", "Transport", "Human Resources"];

const FORMULA_KEY_MAP = {
  Finance: "finance",
  Transport: "transport",
  "Human Resources": "hr",
};

export default function FormulaList({ onCalculate }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleApply = () => {
console.log(selectedOption);

    const formulaKey = FORMULA_KEY_MAP[selectedOption];
    onCalculate(formulaKey);

  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}>
      <FormControl>
        <FormLabel>Formula List</FormLabel>
        <RadioGroup value={selectedOption} onChange={handleChange}>
          {FORMAL_NAMES.map((name) => (
            <FormControlLabel
              key={name}
              value={name}
              control={<Radio />}
              label={name}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleApply}
        disabled={!selectedOption}
      >
        Calculate (Apply Formula)
      </Button>
    </Box>
  );
}
