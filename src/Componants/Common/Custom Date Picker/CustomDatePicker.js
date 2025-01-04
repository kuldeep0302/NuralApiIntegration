import * as React from "react";
import { Alert, Box, Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState } from "react";

export default function NewDatePicker({ label, width, value, onChange }) {
  const [isActive, setIsActive] = useState(false);
  const handleChange = () => {
    if (!onChange) {
      setIsActive(true);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isActive && (
        <Stack
          sx={{ width: "30%" }}
          spacing={2}
          style={{
            position: "fixed",
            top: 5,
            zIndex: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Alert severity="error" onClose={() => setIsActive(false)}>
            Hey, you forgot to handle onChange.
          </Alert>
        </Stack>
      )}
      <Box sx={{ width: width }}>
        <DatePicker
          renderInput={(params) => <TextField {...params} size="x-small" />}
          label={label}
          //   value={dayjs(value)}
          onChange={handleChange}
          sx={{
            fontSize: "14px", // Apply font size to the input itself
            "& .MuiInputLabel-root": {
              fontSize: ".9rem", // Make the label font smaller
            },
            "& .MuiInputBase-input": {
              fontSize: "0.8rem", // Make the input text font smaller
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
