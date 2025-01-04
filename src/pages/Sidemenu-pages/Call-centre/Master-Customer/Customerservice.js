import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Button from "@mui/material/Button";
import "./Customerservice.css";
import HeaderNavigation from "../../../../Componants/Common/header Navigation/HeaderNavigation";
import { Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import CommonButton from "../../../../Componants/Common/Button";
import InputFileUpload from "../../../../Componants/Common/Bulk Upload/InputFileUpload";

const calltype = [];
const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];
const Customerservice = () => {
  const [value, setValue] = useState({
    customerCompanyName: "",
    contactPersonName: "",
    email: "",
    mobileNo: "",
  });

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  return (
    <Grid container>
      <HeaderNavigation value={"Create Customer"} />
      <Grid
        container
        gap={3}
        sx={{
          background: "#EFF3FE",
          margin: "4px 10px 0 10px",
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
          width: "100%",
          borderRadius: "5px",
          padding: "10px 10px 10px 10px",
          fontWeight: 600,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <h4>Customer Details</h4>
        </Box>
        <Grid container spacing={5}>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Customer Name"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Mobile No."
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Email"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
        </Grid>

        <Grid container mt="3" spacing={4}>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Address"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Pin Code"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Landmark"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="GSTIN No."
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <Divider
          sx={{ height: "1px", backgroundColor: "lightgray", width: "100%" }}
        />

        <Box sx={{ width: "100%" }}>
          <h4>Product Details</h4>
        </Box>
        <Grid container mt="3" spacing={4}>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Sub Category"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Model"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Invoice No."
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Serial No."
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Purchased From"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <InputFileUpload/>
          </Grid>
        </Grid>
        <Grid container gap={2}>
          <Grid item>
            <CommonButton name={"Create"} />
          </Grid>
          <Grid item>
            <CommonButton name={"Cancel"} />
          </Grid>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </Grid>
  );
};

export default Customerservice;
