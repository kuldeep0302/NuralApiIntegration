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

const callsource = [];

const cells = ["Spare Part Name", "Spare Part Code","HSN ", "Action"];
const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];
const serials = [
  { label: "Yes" },
  { label: "No" },
];
const rows = [
    {
      id: 1,
      brandName: "Nike",
      description: "Leading global brand known for sports footwear and apparel.",
      category: "Sports",
      subCategory: "Footwear", // Added subcategory
    },
    {
      id: 2,
      brandName: "Adidas",
      description: "Innovative sports brand focused on performance and style.",
      category: "Sports",
      subCategory: "Apparel", // Added subcategory
    },
    {
      id: 3,
      brandName: "Apple",
      description: "Technology giant known for its innovative electronics and software.",
      category: "Technology",
      subCategory: "Electronics", // Added subcategory
    },
    {
      id: 4,
      brandName: "Coca-Cola",
      description: "World's largest beverage company, famous for its soft drinks.",
      category: "Beverage",
      subCategory: "Soft Drinks", // Added subcategory
    },
    {
      id: 5,
      brandName: "Samsung",
      description: "Leading manufacturer of electronics, including smartphones and TVs.",
      category: "Technology",
      subCategory: "Consumer Electronics", // Added subcategory
    },
  ];
  
const SparePartCreation = () => {
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
      {/* <HeaderNavigation value={"Spare Part Creation"} /> */}
      <HeaderNavigation value={"Spare Part Creation"}/>
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
        

        <Grid container spacing={10}>
        <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Spare Part Name"
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
              label="Spare Part Code"
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
                  label="HSN"
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
              options={serials}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Is Serialezed"
                  variant="standard"
                  style={{ width: "11rem" }}
                />
              )}
            />
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
                  label="Spare Part Name"
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
                  label="Spare Part Code"
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
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
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
                    {/* <TableCell align="center">{row.description}</TableCell> */}
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

export default SparePartCreation;
