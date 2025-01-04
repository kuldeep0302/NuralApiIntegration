import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HeaderNavigation from "../../../../Componants/Common/header Navigation/HeaderNavigation";
import CommonButton from "../../../../Componants/Common/Button";
import Subheader from "../../../../Componants/Common/Subheader";
import InputFileUpload from "../../../../Componants/Common/Bulk Upload/InputFileUpload";
import CustomDatePicker from "../../../../Componants/Common/Custom Date Picker/CustomDatePicker";
import { useNavigate } from "react-router-dom";
import LogcomplaintIcon from "../../../../Assests/logComplaintIcon.svg";
import { width } from "@mui/system";
const customerCells = [
  "Name",
  "State",
  "City",
  "Mobile",
  "Address",
  "Email",
  "Edit",
  "Action",
];
const mockCustomerData = [
  {
    Name: "John Doe",
    State: "California",
    City: "Los Angeles",
    Mobile: "123-456-7890",
    Address: "123 Main St",
    Email: "john.doe@example.com",
    Edit: "Edit",
    Action: "Delete",
  },
  {
    Name: "Jane Smith",
    State: "Texas",
    City: "Houston",
    Mobile: "987-654-3210",
    Address: "456 Elm St",
    Email: "jane.smith@example.com",
    Edit: "Edit",
    Action: "Delete",
  },
  {
    Name: "Alice Johnson",
    State: "New York",
    City: "New York",
    Mobile: "555-123-4567",
    Address: "789 Oak St",
    Email: "alice.johnson@example.com",
    Edit: "Edit",
    Action: "Delete",
  },
  {
    Name: "Bob Williams",
    State: "Florida",
    City: "Miami",
    Mobile: "444-789-0123",
    Address: "321 Pine St",
    Email: "bob.williams@example.com",
    Edit: "Edit",
    Action: "Delete",
  },
];
const productCells = [
  "Brand",
  "Category",
  "Subcategory",
  "Model",
  "Date of Purchage",
  "Invoice",
  "Action",
];
const callCells = [
  "Jobsheet Date",
  "Jobsheet No.",
  "Complaint No.",
  "Product Category",
  "Model",
  "Jobsheet Status",
];
const productData = [
  {
    Brand: "Samsung",
    Category: "Electronics",
    Subcategory: "Mobile",
    Model: "Galaxy S21",
    "Date of Purchase": "2022-01-15",
    Invoice: "INV123456",
    Action: "Edit",
  },
  {
    Brand: "Apple",
    Category: "Electronics",
    Subcategory: "Laptop",
    Model: "MacBook Pro",
    "Date of Purchase": "2021-11-02",
    Invoice: "INV654321",
    Action: "Edit",
  },
  {
    Brand: "Sony",
    Category: "Electronics",
    Subcategory: "Camera",
    Model: "Alpha 7R IV",
    "Date of Purchase": "2023-06-18",
    Invoice: "INV789101",
    Action: "Edit",
  },
];
const callData = [
  {
    "Jobsheet Date": "2023-09-20",
    "Jobsheet No.": "JS12345",
    "Complaint No.": "C123",
    "Product Category": "Electronics",
    Model: "Galaxy S21",
    "Jobsheet Status": "Pending",
  },
  {
    "Jobsheet Date": "2023-09-18",
    "Jobsheet No.": "JS54321",
    "Complaint No.": "C124",
    "Product Category": "Appliances",
    Model: "Dyson V11",
    "Jobsheet Status": "Completed",
  },
  {
    "Jobsheet Date": "2023-09-25",
    "Jobsheet No.": "JS67890",
    "Complaint No.": "C125",
    "Product Category": "Laptop",
    Model: "MacBook Pro",
    "Jobsheet Status": "In Progress",
  },
];
const modalCell = [
  "Location",
  "Serive Center Name",
  "Address",
  "Contact No.",
  "Email",
];
const serviceCenters = [
  {
    location: "New York",
    serviceCenterName: "NYC Auto Repair",
    address: "123 Main St, New York, NY 10001",
    contactNo: "(555) 123-4567",
    email: "contact@nyautorepair.com",
  },
  {
    location: "Los Angeles",
    serviceCenterName: "LA Mechanics Hub",
    address: "456 Sunset Blvd, Los Angeles, CA 90001",
    contactNo: "(555) 987-6543",
    email: "info@lamechanicshub.com",
  },
  {
    location: "Chicago",
    serviceCenterName: "Windy City Garage",
    address: "789 Lakeshore Dr, Chicago, IL 60601",
    contactNo: "(555) 234-5678",
    email: "support@windygarage.com",
  },
  {
    location: "Houston",
    serviceCenterName: "Houston Auto Care",
    address: "321 Bayou Rd, Houston, TX 77001",
    contactNo: "(555) 876-5432",
    email: "houston@autocare.com",
  },
  {
    location: "Miami",
    serviceCenterName: "Miami Fix-It",
    address: "654 Ocean Dr, Miami, FL 33101",
    contactNo: "(555) 345-6789",
    email: "service@miamifixit.com",
  },
];

const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];
const jobsheet = [{ label: "Repair" }, { label: "Replacement" }];
const serviceType = [{ label: "Walking" }, { label: "Field" }];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#EFF3FE",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ProductModal = () => {
  const [value, setValue] = useState();
  return (
    <Box sx={{ ...style, width: "75%" }}>
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
        <Grid item md={3}>
          <CustomDatePicker label={"Invoice Date"} width={"90%"} />
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
          <InputFileUpload />
        </Grid>
      </Grid>
      <Grid container justifyContent={"flex-end"} gap={2}>
        <Grid item>
          <CommonButton name={"Create"} />
        </Grid>
        <Grid item>
          <CommonButton name={"Cancel"} />
        </Grid>
      </Grid>
    </Box>
  );
};

const CustomerModal = () => {
  const [value, setValue] = useState();
  return (
    <Box sx={{ ...style, width: "75%" }}>
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
      <Grid container justifyContent={"flex-end"} gap={2}>
        <Grid item>
          <CommonButton name={"Update"} />
        </Grid>
        <Grid item>
          <CommonButton name={"Cancel"} />
        </Grid>
      </Grid>
    </Box>
  );
};
const LogComplaintModal = () => {
  const [value, setValue] = useState();
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Box sx={{ ...style, width: "75%", overflow: "auto", maxHeight: "90vh" }}>
      <Box sx={{ width: "100%" }}>
        <h4>Log Product Complaint</h4>
      </Box>
      <Grid container gap={5}>
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
            label="City"
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
            options={jobsheet}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Jobsheet Type"
                variant="standard"
                style={{ width: "12.5rem" }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid container gap={5}>
        <Grid item>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={jobsheet}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Service Type"
                variant="standard"
                style={{ width: "12.5rem" }}
              />
            )}
          />
        </Grid>

        <Grid item>
          <TextField
            style={{ width: "12.5rem" }}
            id="standard-basic"
            label="Fault Observed by Engineer"
            variant="standard"
            onChange={(e, val) => {
              setValue({ ...value, workflowName: e.target.value });
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            style={{ width: "12.5rem" }}
            id="standard-basic"
            label="Remarks"
            variant="standard"
            onChange={(e, val) => {
              setValue({ ...value, workflowName: e.target.value });
            }}
          />
        </Grid>
      </Grid>
      <Divider
        sx={{
          height: "1px",
          backgroundColor: "gray",
          width: "100%",
          margin: "10px auto",
        }}
      />

      <Grid container gap={3}>
        <Grid item>
          <TextField
            style={{ width: "80%" }}
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
            style={{ width: "80%" }}
            id="standard-basic"
            label="Contact No."
            variant="standard"
            onChange={(e, val) => {
              setValue({ ...value, workflowName: e.target.value });
            }}
          />
        </Grid>
        <Grid item>
          <CustomDatePicker label={"Preferred Date"} width={"80%"} />
        </Grid>

        <Grid item>
          <TextField
            style={{ width: "80%" }}
            id="standard-basic"
            label="Preferred Time Slot"
            variant="standard"
            onChange={(e, val) => {
              setValue({ ...value, workflowName: e.target.value });
            }}
          />
        </Grid>
      </Grid>
      <Grid container gap={2}>
        <Grid item md={3}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={jobsheet}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Service Center"
                variant="standard"
                style={{ width: "12.5rem" }}
              />
            )}
          />
        </Grid>

        <Grid item md sx={{ marginTop: "20px" }}>
          <Grid container justifyContent={"center"}>
            <p style={{ fontSize: "0.8rem" }}>Note: Service Center Info</p>
          </Grid>

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 500, fontSize: "12px" }} // Set font size for the entire table
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {modalCell.map((cell, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        color: "white",
                        textAlign: "center",
                        fontSize: "12px",
                      }} // Font size for header cells
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceCenters.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" sx={{ fontSize: "12px" }}>
                      {row.location}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "12px" }}>
                      {row.serviceCenterName}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "12px" }}>
                      {row.address}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "12px" }}>
                      {row.contactNo}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "12px" }}>
                      {row.email}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label="Close Call Without Service Engineer"
          />
        </FormGroup>

        {checked && (
          <Box
            // component="form"
            sx={{
              width: "100%",

              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Solution Provided"
                multiline
                rows={4}
                // defaultValue="Default Value"
                sx={{ backgroundColor: "white" }}
              />
            </div>
          </Box>
        )}
      </Grid>
      <Grid container justifyContent={"flex-end"} gap={2}>
        <Grid item>
          <CommonButton name={"Update"} />
        </Grid>
        <Grid item>
          <CommonButton name={"Cancel"} />
        </Grid>
      </Grid>
    </Box>
  );
};
const Searchdealercustomer = () => {
  const [open, setOpen] = useState(false);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [openLogComplaintModal, setOpenLogComplaintModal] = useState(false);
  const [value, setValue] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCustomerModal = () => {
    setOpenCustomerModal(true);
  };
  const handleLogComplaintModal = () => {
    setOpenLogComplaintModal(true);
  };
  const handleAMC = () => {
    navigate("/CreateCustomerAmc");
  };
  const handleClose = () => {
    setOpen(false);
    setOpenCustomerModal(false);
    setOpenLogComplaintModal(false);
  };
  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Grid container>
      <HeaderNavigation value={"Search Customer"} location={""} />
      {/* create customer */}
      <Grid
        container
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
        <Grid container>
          <Grid item sm={6} md={4}>
            <TextField
              // style={{ width: "100%" }}
              id="standard-basic"
              label="Email"
              variant="standard"
              // onChange={(e, val) => {
              //   setValue({ ...value, workflowName: e.target.value });
              // }}
            />
          </Grid>
          <Grid item sm={6} md={4}>
            <TextField
              // style={{ width: "100%" }}
              id="standard-basic"
              label="Contact No."
              variant="standard"
              // onChange={(e, val) => {
              //   setValue({ ...value, workflowName: e.target.value });
              // }}
            />
          </Grid>
          <Grid item sm={6} md={4}>
            <TextField
              // style={{ width: "100%" }}
              id="standard-basic"
              label="Customer Name"
              variant="standard"
              // onChange={(e, val) => {
              //   setValue({ ...value, workflowName: e.target.value });
              // }}
            />
          </Grid>
        </Grid>
        <Grid container gap={5} sx={{ marginTop: "1rem" }}>
          <Grid item>
            <CommonButton name={"Search"} />
          </Grid>
          <Grid item>
            <CommonButton name={"Reset"} />
          </Grid>
          <Grid item sx={{ marginLeft: "auto" }}>
            <CommonButton name={"Create Customer"} />
          </Grid>
        </Grid>
      </Grid>
      {/* Customer Details */}
      <Grid
        container
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
        <Grid container>
          <Subheader heading={"Customer Details"} />
        </Grid>
        <Grid container gap={5} sx={{ marginTop: "1rem" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {customerCells.map((cell, index) => (
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
                {mockCustomerData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.Name}</TableCell>
                    <TableCell align="center">{row.State}</TableCell>
                    <TableCell align="center">{row.City}</TableCell>
                    <TableCell align="center">{row.Mobile}</TableCell>
                    <TableCell align="center">{row.Address}</TableCell>
                    <TableCell align="center">{row.Email}</TableCell>
                    <TableCell align="center">
                      <CommonButton
                        name={"Edit"}
                        handleOnClick={handleCustomerModal}
                      />{" "}
                    </TableCell>
                    <TableCell align="center">
                      <CommonButton
                        name={"Add Product"}
                        handleOnClick={handleOpen}
                      />{" "}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {/* customer Product and Call history table */}
      <Grid
        container
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
        <Grid container spacing={2}>
          {/* Tabs */}
          <Grid item>
            <Typography
              onClick={() => handleTabChange(0)}
              sx={{
                cursor: "pointer",
                color: tabIndex === 0 ? "#33499F" : "gray",
                fontWeight: tabIndex === 0 ? "bold" : "normal",
                fontSize: "16px",
              }}
            >
              Product Details
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              onClick={() => handleTabChange(1)}
              sx={{
                cursor: "pointer",
                color: tabIndex === 1 ? "#33499F" : "gray",
                fontWeight: tabIndex === 1 ? "bold" : "normal",
                fontSize: "16px",
              }}
            >
              Call History
            </Typography>
          </Grid>
        </Grid>
        <Grid container gap={5} sx={{ marginTop: "1rem" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {tabIndex === 0
                    ? productCells.map((cell, index) => (
                        <TableCell
                          key={index}
                          sx={{ color: "white", textAlign: "center" }}
                        >
                          {cell}
                        </TableCell>
                      ))
                    : callCells.map((cell, index) => (
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
                {tabIndex === 0
                  ? productData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{row.Brand}</TableCell>
                        <TableCell align="center">{row.Category}</TableCell>
                        <TableCell align="center">{row.Subcategory}</TableCell>
                        <TableCell align="center">{row.Model}</TableCell>
                        <TableCell align="center">
                          {row["Date of Purchase"]}
                        </TableCell>
                        <TableCell align="center">{row.Invoice}</TableCell>
                        {/* <TableCell align="center">{row.Action}</TableCell> */}

                        <TableCell
                          align="Center"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        >
                          <CommonButton
                            name={"AMC"}
                            handleOnClick={handleAMC}
                          />
                          <IconButton
                            onClick={handleLogComplaintModal}
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                              height: "40px",
                              width: "40px",
                              paddingLeft: "auto",
                            }}
                          >
                            <img
                              src={LogcomplaintIcon}
                              alt="active"
                              style={{ height: "100%", width: "100%" }} // Ensure the image fits the button size
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  : callData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {row["Jobsheet Date"]}
                        </TableCell>
                        <TableCell align="center">
                          {row["Jobsheet No."]}
                        </TableCell>
                        <TableCell align="center">
                          {row["Complaint No."]}
                        </TableCell>
                        <TableCell align="center">
                          {row["Product Category"]}
                        </TableCell>
                        <TableCell align="center">{row.Model}</TableCell>
                        <TableCell align="center">
                          {row["Jobsheet Status"]}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Product details modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ProductModal />
      </Modal>

      {/* Edit Customer Details */}
      <Modal
        open={openCustomerModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <CustomerModal />
      </Modal>
      {/* Log Complaint */}
      <Modal
        open={openLogComplaintModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <LogComplaintModal />
      </Modal>
    </Grid>
  );
};

export default Searchdealercustomer;
