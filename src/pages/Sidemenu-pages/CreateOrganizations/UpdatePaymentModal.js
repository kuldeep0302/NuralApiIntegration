import React, { useState } from "react";
import {
  TextField,
  Button,
  //   MenuItem,
  Grid,
  Box,
  Autocomplete,
} from "@mui/material";

const calltype = [];

const UpdatePaymentodal = () => {
  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  const [value, setValue] = useState({
    ContactNumber: "",
  });
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#f0f4ff",
        padding: 3,
        borderRadius: 2,
        width: "100%",
      }}
    >
      <Grid container spacing={2} gap={2}>
        <Grid item xs={6} md={3}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Amount"
            name="amount"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <Autocomplete
            onChange={(e, val) => {
              setValue({ ...value, role: val.title });
            }}
            {...calltypeDefaultProps}
            id="disable-close-on-select"
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField {...params} label="Payment Mode" variant="standard" />
            )}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Payment Reference No."
            name="paymentrefrenceno"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} gap={2}>
        <Grid item xs={6} md={3}>
          <TextField
            variant="standard"
            label="Payment Date"
            name="paymentdate"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Remark"
            name="remark"
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        // sx={{ mt: 1 }}
        className="action-button"
        size="large"
        style={{
          backgroundColor: "#32499F",
          color: "white",
          width: "fit-content",
        }}
      >
        Update
      </Button>
    </Box>
  );
};

export default UpdatePaymentodal;
