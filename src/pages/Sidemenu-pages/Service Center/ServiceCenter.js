import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import "./serviceCenter.css";
import Reappointment from "./../Repair/Dashboard/Reappoitment";

const cells = [
  "Brand",
  "Total Calls",
  "In Warranty",
  "Out Warranty",
  "In Warranty",
  "Out Warranty",
  "Reappointment",
  "Pending for Part",
  "Payment Collected",
];
const mockData = [
  {
    Brand: "Samsung",
    "Total Calls": 150,
    "In Warranty": 80,
    "Out Warranty": 70,
    Reappointment: 10,
    "Pending for Part": 5,
    "Payment Collected": "$500",
  },
  {
    Brand: "Apple",
    "Total Calls": 200,
    "In Warranty": 120,
    "Out Warranty": 80,
    Reappointment: 15,
    "Pending for Part": 8,
    "Payment Collected": "$1200",
  },
  {
    Brand: "LG",
    "Total Calls": 100,
    "In Warranty": 60,
    "Out Warranty": 40,
    Reappointment: 8,
    "Pending for Part": 2,
    "Payment Collected": "$300",
  },
  {
    Brand: "Sony",
    "Total Calls": 170,
    "In Warranty": 100,
    "Out Warranty": 70,
    Reappointment: 12,
    "Pending for Part": 6,
    "Payment Collected": "$750",
  },
  {
    Brand: "OnePlus",
    "Total Calls": 130,
    "In Warranty": 90,
    "Out Warranty": 40,
    Reappointment: 7,
    "Pending for Part": 3,
    "Payment Collected": "$400",
  },
];

const ServiceCenter = () => {
  const [visibleTables, setVisibleTables] = useState([]);
  const [value, setValue] = useState();
  const Unallocated = "Unallocated";
  const Allocated = "Allocated";
  const Pendingforpart = "Pendingforpart";
  const Close = "Close";
  const toggleTable = (tableId) => {
    if (visibleTables.includes(tableId)) {
      setVisibleTables(visibleTables.filter((id) => id !== tableId));
    } else {
      setVisibleTables([tableId]);
    }
  };

  return (
    <Grid container>
      <HeaderNavigation value={"Service Center"} />
      <Grid
        container
        gap={1}
        sx={{
          // background: "#EFF3FE",
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
        <Grid
          item
          sx={{
            backgroundColor: "#324A9F",
            color: "white",
            width: "12rem",
            borderRadius: "10px",
            border: "2px solid white",
            minHeight: "8rem",
          }}
        >
          <Grid container justifyContent={"center"}>
            Calls
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            gap={5}
            sx={{ marginTop: "13px" }}
          >
            <Grid item>total</Grid>
            <Grid item>open</Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            gap={5}
            sx={{ marginTop: "13px" }}
          >
            <Grid item>500</Grid>
            <Grid item>300</Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            backgroundColor: "#F98500",
            color: "white",
            width: "12rem",
            borderRadius: "10px",
            border: "2px solid white",
            minHeight: "8rem",
          }}
        >
          <Grid container justifyContent={"center"}>
            Closed(Repair)
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            gap={5}
            sx={{ marginTop: "13px", fontSize: "12px" }}
          >
            <Grid item>In Warranty</Grid>
            <Grid item>Out Warranty</Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            gap={5}
            sx={{ marginTop: "13px" }}
          >
            <Grid item>500</Grid>
            <Grid item>300</Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            backgroundColor: "#F98500",
            color: "white",
            width: "12rem",
            borderRadius: "10px",
            border: "2px solid white",
            minHeight: "8rem",
          }}
        >
          <Grid container justifyContent={"center"}>
            Close(Replacement)
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            gap={5}
            sx={{ marginTop: "13px", fontSize: "12px" }}
          >
            <Grid item>In Warranty</Grid>
            <Grid item>Out Warranty</Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            gap={5}
            sx={{ marginTop: "13px" }}
          >
            <Grid item>500</Grid>
            <Grid item>300</Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            backgroundColor: "#CF0808",
            color: "white",
            width: "12rem",
            borderRadius: "10px",
            border: "2px solid white",
            minHeight: "8rem",
          }}
        >
          <Grid container justifyContent={"center"}>
            Open Calls
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            gap={5}
            sx={{ marginTop: "13px", fontSize: "12px" }}
          >
            <Grid item>Reappointment</Grid>
            <Grid item>
              Pending <br /> for Part
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            gap={5}
            sx={{ marginTop: "13px" }}
          >
            <Grid item>500</Grid>
            <Grid item>300</Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            backgroundColor: "#23AF00",
            color: "white",
            width: "12rem",
            borderRadius: "10px",
            border: "2px solid white",
            minHeight: "8rem",
          }}
        >
          <Grid container justifyContent={"center"}>
            Total Payment Pending
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            gap={10}
            sx={{ marginTop: "26px" }}
          >
            <Grid item>5000</Grid>
          </Grid>
        </Grid>
      </Grid>

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
                {mockData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.Brand}</TableCell>
                    <TableCell align="center">{row["Total Calls"]}</TableCell>
                    <TableCell align="center">{row["In Warranty"]}</TableCell>
                    <TableCell align="center">{row["Out Warranty"]}</TableCell>
                    <TableCell align="center">{row["In Warranty"]}</TableCell>
                    <TableCell align="center">{row["Out Warranty"]}</TableCell>
                    <TableCell align="center">{row.Reappointment}</TableCell>
                    <TableCell align="center">
                      {row["Pending for Part"]}
                    </TableCell>
                    <TableCell align="center">
                      {row["Payment Collected"]}
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

export default ServiceCenter;
