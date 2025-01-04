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
  TextField,
} from "@mui/material";
import React from "react";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import CommonButton from "../../../Componants/Common/Button";
import activeIcon from "../../../Assests/activeIcon.svg";
import editIcon from "../../../Assests/editIcon.svg";
const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];

const cells = ["Module Name", "Parent Module", "Display Order", "Action"];
const rows = [
  {
    moduleName: "Dashboard",
    parentModule: "None",
    displayOrder: 1,
    action: "View",
  },
  {
    moduleName: "User Management",
    parentModule: "Admin",
    displayOrder: 2,
    action: "Edit",
  },
  {
    moduleName: "Reports",
    parentModule: "Dashboard",
    displayOrder: 3,
    action: "View",
  },
  {
    moduleName: "Settings",
    parentModule: "Admin",
    displayOrder: 4,
    action: "Edit",
  },
];

const ModuleMaster = () => {
  return (
    <Grid>
      <HeaderNavigation value={"Module"} />
      <Grid
        container
        gap={4}
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
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Module Name"
            variant="standard"
            //   onChange={(e, val) => {
            //     setValue({ ...value, workflowName: e.target.value });
            //   }}
          />
        </Grid>
        <Grid item>
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Description"
            variant="standard"
            //   onChange={(e, val) => {
            //     setValue({ ...value, workflowName: e.target.value });
            //   }}
          />
        </Grid>
        <Grid item>
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Display Order"
            variant="standard"
            //   onChange={(e, val) => {
            //     setValue({ ...value, workflowName: e.target.value });
            //   }}
          />
        </Grid>
        <Grid item>
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Parent Module"
            variant="standard"
            //   onChange={(e, val) => {
            //     setValue({ ...value, workflowName: e.target.value });
            //   }}
          />
        </Grid>
        <Grid item>
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Allow in Menu"
            variant="standard"
            //   onChange={(e, val) => {
            //     setValue({ ...value, workflowName: e.target.value });
            //   }}
          />
        </Grid>
        <Grid container gap={3}>
          <CommonButton name={"Create "} />
          <CommonButton name={"Cancel"} />
        </Grid>
      </Grid>
      <Grid
        container
        gap={4}
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
                label="Module Name"
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
                label="Parent Module"
                variant="standard"
                style={{ width: "10rem" }}
              />
            )}
          />
        </Grid>

        <CommonButton name={"Search"} />
        <Grid container gap={3}>
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
                    <TableCell align="center">{row.moduleName}</TableCell>
                    <TableCell align="center">{row.parentModule}</TableCell>
                    <TableCell align="center">{row.displayOrder}</TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
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

export default ModuleMaster;
