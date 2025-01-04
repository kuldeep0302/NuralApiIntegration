import {
  Autocomplete,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import HeaderNavigation from "../../../../../Componants/Common/header Navigation/HeaderNavigation";
import CommonButton from "../../../../../Componants/Common/Button";
const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];

const cells = [
  "Service Center",
  "Brand",
  "Part Code",
  "Part Name",
  "Stock QTY",
];

const rows = [
  {
    serviceCenter: "SC001",
    brand: "Toyota",
    partCode: "P1234",
    partName: "Brake Pad",
    stockQty: 50,
  },
  {
    serviceCenter: "SC002",
    brand: "Honda",
    partCode: "P5678",
    partName: "Air Filter",
    stockQty: 20,
  },
  {
    serviceCenter: "SC003",
    brand: "Ford",
    partCode: "P91011",
    partName: "Oil Filter",
    stockQty: 35,
  },
  {
    serviceCenter: "SC004",
    brand: "Hyundai",
    partCode: "P12131",
    partName: "Spark Plug",
    stockQty: 15,
  },
  {
    serviceCenter: "SC005",
    brand: "Suzuki",
    partCode: "P14151",
    partName: "Clutch Plate",
    stockQty: 10,
  },
];

const Stockinhand = () => {
  return (
    <Grid container>
      <HeaderNavigation value={"Stock Report"} />
      <Grid
        container
        gap={5}
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
        <Grid item>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Service Center"
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
                label="Brand"
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
                label="Part Code"
                variant="standard"
                style={{ width: "12rem" }}
              />
            )}
          />
        </Grid>
        <Grid container gap={4}>
          <CommonButton name={"Search"} />
          <CommonButton name={"Cancel"} />
        </Grid>
      </Grid>

      <Grid
        container
        gap={5}
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
                  <TableCell align="center">{row.serviceCenter}</TableCell>
                  <TableCell align="center">{row.brand}</TableCell>
                  <TableCell align="center">{row.partCode}</TableCell>
                  <TableCell align="center">{row.partName}</TableCell>
                  <TableCell align="center">{row.stockQty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Stockinhand;
