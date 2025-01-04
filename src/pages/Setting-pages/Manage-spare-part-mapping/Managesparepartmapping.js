import React from "react";

import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";

import ProductTabs from "../../../Componants/Common/product tabs/ProductTabs";
import {
  Autocomplete,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CommonButton from "../../../Componants/Common/Button";
import InputFileUpload from "../../../Componants/Common/Bulk Upload/InputFileUpload";
import Template from "../../../Componants/Common/Bulk Upload/Template";
import activeIcon from "../../../Assests/activeIcon.svg";
import inactiveIcon from "../../../Assests/inactiveIcon.svg";
import editIcon from "../../../Assests/editIcon.svg";
import deleteIcon from "../../../Assests/deleteIcon.svg";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import { fontWeight } from '@mui/system';

const callsource = [];

const cells = [
  "Spare Part Name",
  "Spare Part Code",
  "Model Name",
  "Model Code",
  "Action",
];
const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];
const serials = [{ label: "Yes" }, { label: "No" }];
const rows = [
  {
    id: 1,
    brandName: "Nike",
    modelName: "Air Max",
    serialized: "Yes",
    category: "Sports",
    subCategory: "Footwear",
  },
  {
    id: 2,
    brandName: "Adidas",
    modelName: "Ultraboost",
    serialized: "Yes",
    category: "Sports",
    subCategory: "Apparel",
  },
  {
    id: 3,
    brandName: "Apple",
    modelName: "iPhone",
    serialized: "Yes",
    category: "Technology",
    subCategory: "Electronics",
  },
  {
    id: 4,
    brandName: "Coca-Cola",
    modelName: "Coca-Cola Classic",
    serialized: "No",
    category: "Beverage",
    subCategory: "Soft Drinks",
  },
  {
    id: 5,
    brandName: "Samsung",
    modelName: "Galaxy S",
    serialized: "Yes",
    category: "Technology",
    subCategory: "Consumer Electronics",
  },
  {
    id: 6,
    brandName: "Sony",
    modelName: "PlayStation 5",
    serialized: "Yes",
    category: "Technology",
    subCategory: "Electronics",
  },
  {
    id: 7,
    brandName: "Pepsi",
    modelName: "Pepsi Zero Sugar",
    serialized: "No",
    category: "Beverage",
    subCategory: "Soft Drinks",
  },
];

const ManageModel = () => {
  function handleClick() {
    const saveButton = document.getElementById("save-button");
    saveButton.textContent = "Saved";
    saveButton.classList.add("saved");
    alert("Data saved successfully!");
  }
  const handleSearch = () => {
    // logic of search
  };

  document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", handleClick);
  });

  const [value, setValue] = React.useState({});

  return (
    <Grid container>
      <HeaderNavigation value={"Spare Part Mapping"} />
      {/* create Category */}
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
        <Grid container gap={5}>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Spare Part Name"
                  variant="standard"
                  style={{ width: "11rem" }}
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
                  label="Spare Part Code"
                  variant="standard"
                  style={{ width: "11rem" }}
                />
              )}
            />
          </Grid>
          <Grid container>
            <Grid item container>
              <h4 sx={{fontWeight:'500', color:'blue'}}>Map With Model</h4>
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
                    style={{ width: "11rem" }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container gap={2} spacing={5} sx={{ marginTop: "1rem" }}>
          <Grid item>
            <CommonButton name={"Cancel"} />
          </Grid>
          <Grid item>
            <CommonButton name={"Save"} />
          </Grid>

          <Grid container></Grid>
        </Grid>
      </Grid>

      {/* Bulk Upload */}
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
        <Grid container>
          {" "}
          <Typography variant="h6">Bulk Upload</Typography>
        </Grid>
        <Grid container gap={10}>
          <Grid item>
            <InputFileUpload />
          </Grid>
          <Grid item>
            <CommonButton name={"Upload"} />
          </Grid>
          <Grid item sx={{ padding: "1rem" }}>
            <Template label={"Download Template"} />
          </Grid>
          <Grid item sx={{ padding: "1rem" }}>
            <Template label={"Download Reference Code"} />
          </Grid>
        </Grid>
      </Grid>
      {/* Brand list */}
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
          <Typography variant="h6">List View</Typography>
        </Grid>
        <Grid container gap={5}>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Model Name"
                  variant="standard"
                  style={{ width: "10rem" }}
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
                  label="Model Code"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </Grid>
         
          <Grid item>
            <CommonButton name={"Search"} />
          </Grid>
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
                    </TableCell> // Adding a key prop
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.brandName}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.subCategory}</TableCell>
                    <TableCell align="center">{row.modelName}</TableCell>
                    {/* <TableCell align="center">{row.serialized}</TableCell> */}
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
                          src={activeIcon}
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
                          src={editIcon}
                          alt="Edit"
                          height={"20px"}
                          width={"20px"}
                        />
                      </IconButton>
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

export default ManageModel;
