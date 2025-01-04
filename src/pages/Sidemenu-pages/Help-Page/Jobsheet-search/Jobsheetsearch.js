import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import deleteIcon from "../../../../Assests/deleteIcon.svg";
// import ExportToExcel from "../../../Componants/Common/ExportToExcel";
import HeaderNavigation from "../../../../Componants/Common/header Navigation/HeaderNavigation";
import CommonButton from "../../../../Componants/Common/Button";
import Subheader from "../../../../Componants/Common/Subheader";

const cells = [
  "Jobhseet Date",
  "Jobhseet No.",
  "Product Category",
  "Contact Person",
  "Jobhseet Type",
  "Service Type",
  "Jobhseet Status",
  "Action",
];
const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];
const tableData = [
  {
    "Jobhseet Date": "2024-10-10",
    "Jobhseet No.": "JS-1001",
    "Product Category": "Electronics",
    "Contact Person": "John Doe",
    "Jobhseet Type": "Installation",
    "Service Type": "On-site",
    "Jobhseet Status": "Completed",
    Action: "View Details",
  },
  {
    "Jobhseet Date": "2024-10-12",
    "Jobhseet No.": "JS-1002",
    "Product Category": "Furniture",
    "Contact Person": "Alice Smith",
    "Jobhseet Type": "Repair",
    "Service Type": "In-store",
    "Jobhseet Status": "Pending",
    Action: "View Details",
  },
  {
    "Jobhseet Date": "2024-10-13",
    "Jobhseet No.": "JS-1003",
    "Product Category": "Appliances",
    "Contact Person": "Robert Brown",
    "Jobhseet Type": "Maintenance",
    "Service Type": "On-site",
    "Jobhseet Status": "In Progress",
    Action: "View Details",
  },
  {
    "Jobhseet Date": "2024-10-14",
    "Jobhseet No.": "JS-1004",
    "Product Category": "Electronics",
    "Contact Person": "Lucy Davis",
    "Jobhseet Type": "Installation",
    "Service Type": "In-store",
    "Jobhseet Status": "Cancelled",
    Action: "Reschedule",
  },
  {
    "Jobhseet Date": "2024-10-09",
    "Jobhseet No.": "JS-1005",
    "Product Category": "Furniture",
    "Contact Person": "Emma Wilson",
    "Jobhseet Type": "Repair",
    "Service Type": "On-site",
    "Jobhseet Status": "Completed",
    Action: "View Invoice",
  },
];

const JobsheetSearch = () => {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState({});
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Grid container>
      <HeaderNavigation value={"Jobsheet Search"} />
      {/* create Brand */}
      <Grid
        container
        sx={{
          background: "#EFF3FE",
          marginLeft: "10px",
          marginTop: "4px",
          marginRight: "10px",
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
          width: "100%",
          borderRadius: "5px",
          padding: "10px",
          fontWeight: 600,
        }}
      >
        <Grid container spacing={5}>
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
                  style={{ width: "12rem" }}
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
                  style={{ width: "12rem" }}
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
                  label="Jobsheet Type"
                  variant="standard"
                  style={{ width: "12rem" }}
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
                  label="Service Type"
                  variant="standard"
                  style={{ width: "12rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Jobsheet No."
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
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
                  label="Product Category"
                  variant="standard"
                  style={{ width: "12rem" }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container gap={2} spacing={5} sx={{ marginTop: "1rem" }}>
          <Grid item>
            <CommonButton name={"Search"} />
          </Grid>
          <Grid item>
            <CommonButton name={"Reset"} />
          </Grid>

          <Grid container></Grid>
        </Grid>
      </Grid>

      {/* Jobsheet Search  list */}
      <Grid
        container
        sx={{
          background: "#EFF3FE",
          marginLeft: "10px",
          marginTop: "4px",
          marginRight: "10px",
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
          width: "100%",
          borderRadius: "5px",
          padding: "10px",
          fontWeight: 600,
        }}
      >
        <Grid item container>
          {/* <Typography variant="h6">Jobsheets</Typography> */}
          <Subheader heading={"Jobsheets"} />
        </Grid>

        <Grid container>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {cells.map((cell, index) => (
                    <TableCell
                      key={index}
                      sx={{ color: "white", textAlign: "center" }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={handleChange}
                            />
                          }
                          label="Close Call Without Service Engineer"
                        />
                      </FormGroup>
                      {row["Jobhseet Date"]}
                    </TableCell>
                    <TableCell align="center">{row["Jobhseet No."]}</TableCell>
                    <TableCell align="center">
                      {row["Product Category"]}
                    </TableCell>
                    <TableCell align="center">
                      {row["Contact Person"]}
                    </TableCell>
                    <TableCell align="center">{row["Jobhseet Type"]}</TableCell>
                    <TableCell align="center">{row["Service Type"]}</TableCell>
                    <TableCell align="center">
                      {row["Jobhseet Status"]}
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        // onClick={() => handleStatus(index)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={deleteIcon}
                          alt="active"
                          height={"20px"}
                          width={"20px"}
                        />
                      </IconButton>

                      <IconButton
                        // onClick={() => handleEdit(index)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={deleteIcon}
                          alt="Edit"
                          height={"20px"}
                          width={"20px"}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default JobsheetSearch;
