import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import InventoryTabs from "../../../../Componants/Common/Inventory tabs/InventoryTabs";
import HeaderNavigation from "../../../../Componants/Common/header Navigation/HeaderNavigation";
import Subheader from "../../../../Componants/Common/Subheader";
import CommonButton from "../../../../Componants/Common/Button";
import infoIcon from "../../../../Assests/infoIcon.svg";
import deleteIcon from "../../../../Assests/deleteIcon.svg";
import BarcodeIcon from "../../../../Assests/BarcodeIcon.svg";
const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];
const cell1 = [
  "Part Name",
  "Part Code",
  "Qty Available",
  "Allocate Qty",
  "Serial No.",
  "Count",
];
const cell2 = ["Part Name", "Part Code", "Allocate Qty", "Serial No.", "Count"];
const mockData = [
  {
    partCode: "xxxx",
    partName: "xxxx",
    qtyAvailable: 1000,
    allocateQty: 0,
    serialNo: "No",
    count: 0,
  },
];
const mockData2 = [
  {
    partCode: "xxxx",
    partName: "xxxx",
    allocateQty: 0,
    serialNo: "No",
    count: 0,
  },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#EFF3FE",
  boxShadow: 24,
  pt: 1,
  px: 0.5,
  pb: 3,
};

const SerialNoModal = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <Box sx={{ ...style, width: "35%" }}>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#33499F",
            color: "#fff",
            margin: "0",
          }}
        >
          <h4>Serial No. </h4>
        </Box>
        <Grid
          container
          justifyContent={"center"}
          sx={{
            width: "100%",
            paddingTop: "5px",
            margin: "auto",
            padding: "auto",
          }}
        >
          <TableContainer component={Paper}>
            <Table
              sx={{ justifyContent: "center" }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "white", textAlign: "center" }}>
                    Serial No.
                  </TableCell>
                  <TableCell sx={{ color: "white", textAlign: "center" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockData2.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.partName}</TableCell>
                    <TableCell align="center">
                      <IconButton
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
        <Grid container justifyContent={"center"} gap={2}>
          <Grid item>
            <CommonButton
              name={"Submit"}
              sx={{ backgroundColor: "white !important" }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const Bufferstockallocation = () => {
  const [selectedValue, setSelectedValue] = useState(false);
  const [open, setOpen] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Only one radio button can be selected
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleModal = () => {
    setOpen(true);
  };

  return (
    <Grid container>
      <HeaderNavigation value={"Inventory"} />
      <InventoryTabs tabName={"Buffer Stock/Transfer"} />
      <Grid
        container
        sx={{
          background: "#F5F8FF",
          margin: "0 10px 10px",
          width: "100%",
          borderRadius: "5px",
          padding: "10px",
          fontWeight: 600,
        }}
      >
        <Grid container gap={3}>
          <Grid item sx={{ marginTop: "10px" }}>
            <Subheader heading={"Upload using"} />
          </Grid>
          <Grid item sx={{ marginTop: "0" }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="UI" control={<Radio />} label="UI" />
              <FormControlLabel
                value="excel"
                control={<Radio />}
                label="Excel"
              />
            </RadioGroup>
          </Grid>
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
                  label="Transfer From"
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
                  label="Transfer To"
                  variant="standard"
                  style={{ width: "12rem" }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          background: "#F5F8FF",
          margin: "0 10px ",
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
                  label="Category"
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
                  label="Sub Category"
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
                  label="Model"
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
              label="Part Name"
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Part Code"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Grid container gap={3} mt={5}>
          <CommonButton name="Search" />
          <CommonButton name="Reset" />
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
          {/* <Grid container justifyContent="flex-end">
            <ExportToExcel
              name="Export to Excel"
              data={rows}
              fileName="Brand_Data"
              headers={cells}
            />
          </Grid> */}
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {cell1.map((cell, index) => (
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
                    <TableCell align="center">{row.partName}</TableCell>
                    <TableCell align="center">{row.partCode}</TableCell>
                    <TableCell align="center">{row.qtyAvailable}</TableCell>
                    <TableCell align="center">{row.allocateQty}</TableCell>
                    <TableCell
                      align="center"
                      sx={{ display: "flex", margin: "0" }}
                    >
                      <TextField
                        id="standard-basic"
                        label=""
                        variant="standard"
                        sx={{ width: "8rem" }}
                      />{" "}
                      <IconButton
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                          padding: 0,
                        }}
                      >
                        <img
                          src={BarcodeIcon}
                          alt="active"
                          style={{ height: "40px", width: "70px" }}
                        />
                      </IconButton>
                      <CommonButton name={"Add"} />
                    </TableCell>
                    <TableCell align="center">
                      {row.count}
                      <IconButton
                        onClick={handleModal}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={infoIcon}
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
          <Grid container gap={3}>
            <CommonButton name={"Add to List"} />
            <CommonButton name={"Cancel"} />
          </Grid>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {cell2.map((cell, index) => (
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
                {mockData2.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.partName}</TableCell>
                    <TableCell align="center">{row.partCode}</TableCell>
                    <TableCell align="center">{row.allocateQty}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={handleModal}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={infoIcon}
                          alt="active"
                          height={"20px"}
                          width={"20px"}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
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
          <Grid container gap={3}>
            <CommonButton name={"Allocate"} />
            <CommonButton name={"Cancel"} />
          </Grid>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <SerialNoModal />
      </Modal>
    </Grid>
  );
};

export default Bufferstockallocation;
