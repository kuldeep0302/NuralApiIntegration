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
import CustomDatePicker from "../../../../../Componants/Common/Custom Date Picker/CustomDatePicker";
import CommonButton from "../../../../../Componants/Common/Button";
const dateTypes = [{ label: "Creation" }, { label: "Closure" }];
const cells = [
  "Job Number",
  "Job Date",
  "Model",
  "creation Date",
  "Closure Date",
  "Repair Action",
];
const rows = [
  {
    jobNumber: "J001",
    jobDate: "10/02/2022",
    model: "Car Model",
    creationDate: "10/02/2022",
    closureDate: "15/02/2022",
    repairAction: "Completed",
  },
];
const JobReport = () => {
  return (
    <Grid container>
      <HeaderNavigation value={"Job Report"} />
      <Grid
        container
        gap={5}
        sx={{
          background: "#F5F8FF",
          margin: "10px 10px ",
          width: "100%",
          borderRadius: "5px",
          padding: "12px",
          fontWeight: 600,
        }}
      >
        <Grid item>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={dateTypes}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Date Type"
                variant="standard"
                style={{ width: "12rem" }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <CustomDatePicker label={"From Date"} width={"12rem"} />
        </Grid>
        <Grid item>
          <CustomDatePicker label={"To Date"} width={"12rem"} />
        </Grid>

        <Grid container gap={5}>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={dateTypes}
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
              options={dateTypes}
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
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={dateTypes}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Model"
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
              options={dateTypes}
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
        </Grid>
        <CommonButton name={"Search"} />
        <CommonButton name={"Cancel"} />
      </Grid>

      <Grid
        container
        sx={{
          background: "#F5F8FF",
          margin: "0 10px ",
          width: "100%",
          borderRadius: "5px",
          padding: "12px",
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
                  <TableCell align="center">{row.jobNumber}</TableCell>
                  <TableCell align="center">{row.jobDate}</TableCell>
                  <TableCell align="center">{row.model}</TableCell>
                  <TableCell align="center">{row.creationDate}</TableCell>
                  <TableCell align="center">{row.closureDate}</TableCell>
                  <TableCell align="center">{row.repairAction}</TableCell>
                  {/* <TableCell
                      align="right"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end"
                      }}
                    >
                      <IconButton
                        // onClick={() => handleStatus(index)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" }
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
                          "&:focus": { outline: "none" }
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
                          "&:focus": { outline: "none" }
                        }}
                      >
                        <img
                          src={deleteIcon}
                          alt="active"
                          height={"20px"}
                          width={"20px"}
                        />
                      </IconButton>
                    </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default JobReport;
