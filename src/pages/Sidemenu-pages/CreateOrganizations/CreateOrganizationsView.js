import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import React from "react";
import { FaEdit } from "react-icons/fa";
import CustomerInfoModal from "./CustomerInfoModal";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import CommonButton from "../../../Componants/Common/Button";
import CustomDatePicker from "../../../Componants/Common/Custom Date Picker/CustomDatePicker";
// import { Link, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const cells = [
  "Client Name",
  "Subscription Plan",
  "Subscribed On",
  "Subscription Ends On",
  "No. of Licenses",
  "Payment Due Date",
  "Status",
  "Action",
];
const rows = [
  {
    clientName: "ABC Corp",
    subscriptionPlan: "Enterprise",
    subscribedOn: "2023-01-15",
    subscriptionEndsOn: "2024-01-14",
    licenses: 50,
    paymentDue: "2024-01-10",
    status: "Active",
  },
  {
    clientName: "XYZ Pvt Ltd",
    subscriptionPlan: "Pro Plan",
    subscribedOn: "2023-06-01",
    subscriptionEndsOn: "2024-06-01",
    licenses: 20,
    paymentDue: "2023-12-15",
    status: "Active",
  },
  {
    clientName: "Global Ventures",
    subscriptionPlan: "Basic Plan",
    subscribedOn: "2022-09-20",
    subscriptionEndsOn: "2023-09-19",
    licenses: 10,
    paymentDue: "2023-09-10",
    status: "Inactive",
  },
  {
    clientName: "Tech Solutions",
    subscriptionPlan: "Enterprise",
    subscribedOn: "2023-03-12",
    subscriptionEndsOn: "2024-03-11",
    licenses: 100,
    paymentDue: "2024-03-01",
    status: "Active",
  },
];
const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];
const CreateOrganizationsView = () => {
  // const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <HeaderNavigation value={"Client Organization"} />

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
                  label="Subscription Type"
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
              label="Customer Name"
              variant="standard"
              // onChange={(e, val) => {
              //   setValue({ ...value, workflowName: e.target.value });
              // }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Customer Email"
              variant="standard"
              // onChange={(e, val) => {
              //   setValue({ ...value, workflowName: e.target.value });
              // }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Customer Mobile No."
              variant="standard"
              // onChange={(e, val) => {
              //   setValue({ ...value, workflowName: e.target.value });
              // }}
            />
          </Grid>
          <Grid container  gap={3}>
            <Grid item>
              <CustomDatePicker label={"Payment Due From"} width={"90%"} />
            </Grid>

            <Grid item>
              <CustomDatePicker label={"Payment Due To"} width={"90%"} />
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
                    label="Status"
                    variant="standard"
                    style={{ width: "12rem" }}
                  />
                )}
              />
            </Grid>
            <CommonButton name={"Serach"} />
            <CommonButton name={"Cancel"} />
          </Grid>
        </Grid>

        <Grid container mt={5}>
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
                    <TableCell align="center">{row.clientName}</TableCell>
                    <TableCell align="center">{row.subscriptionPlan}</TableCell>
                    <TableCell align="center">{row.subscribedOn}</TableCell>
                    <TableCell align="center">
                      {row.subscriptionEndsOn}
                    </TableCell>
                    <TableCell align="center">{row.licenses}</TableCell>
                    <TableCell align="center">{row.paymentDue}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    {/* <TableCell
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
                </TableCell> */}
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

export default CreateOrganizationsView;
