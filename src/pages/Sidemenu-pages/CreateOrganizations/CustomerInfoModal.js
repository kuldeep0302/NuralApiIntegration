import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  FormControlLabel,
  Switch,
  Modal,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ChangePasswordModal from "./ChangePasswordModal";
import { Link } from "react-router-dom";
import UpdatePaymentodal from "./UpdatePaymentModal";

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


function Changepassword() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        className="action-button"
        size="large"
        style={{
          backgroundColor: "#32499F",
          color: "white",
        }}
        onClick={handleOpen}
      >
        Change Password
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <ChangePasswordModal />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function UpdatePayment() {
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <Button
          variant="contained"
          className="action-button"
          size="large"
          style={{
            backgroundColor: "#32499F",
            color: "white",
          }}
          onClick={handleOpen}
        >
          Update Payment
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 900 }}>
            <UpdatePaymentodal />
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

const CustomerInfoModal = () => {
  const [status, setStatus] = useState(false);
  const [accountStatus, setAccountStatus] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    companyName: "",
    mobileNo: "",
    email: "",

    location: "",

    productSubscribed: "",
    subscriptionStartDate: null,
    subscriptionEndDate: null,
    subscriptionPlan: "",
    noOfLicenses: "",
    planPrice: "",
    paymentDueDate: "",
    accessKey: "",
    loginID: "",
    password: "",
    companyLogo: null,
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (field, newValue) => {
    setFormData({
      ...formData,
      [field]: newValue,
    });
  };

  return (
    <Box
      sx={{
        overflowY: "scroll",
        height: "85vh",
        padding: "30px",
        backgroundColor: "#eff3fe",
        margin: "5px",
        borderRadius: "10px",
        paddingBottom: "30px",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Customer Info
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6} md={4}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Client Name"
            name="clientName"
            value={formData.clientName}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Mobile No."
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Product Subscribed"
            name="Product Subscribed"
            value={formData.productSubscribed}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              sx={{ width: "fit-content" }}
              label="Subscription Start Date"
              inputFormat="DD/MM/YYYY"
              value={formData.subscriptionStartDate}
              onChange={(newValue) =>
                handleDateChange("subscriptionStartDate", newValue)
              }
              renderInput={(params) => (
                <TextField variant="standard" fullWidth {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              sx={{ width: "fit-content" }}
              label="Subscription End Date"
              inputFormat="DD/MM/YYYY"
              value={formData.subscriptionEndDate}
              onChange={(newValue) =>
                handleDateChange("subscriptionEndDate", newValue)
              }
              renderInput={(params) => (
                <TextField variant="standard" width="25%" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6} md={4}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Subscription Plan"
            name="Subscription Plan"
            value={formData.subscriptionPlan}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <TextField
            variant="standard"
            width="fit-content"
            label="No. of Licenses"
            name="noOfLicenses"
            value={formData.noOfLicenses}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Plan Price"
            name="planPrice"
            value={formData.planPrice}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            variant="standard"
            width="fit-content"
            label="Payment Due Date"
            name="Payment Due Date"
            value={formData.paymentDueDate}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography>Status:</Typography>&nbsp;
            <FormControlLabel
              control={
                <Switch
                  checked={status}
                  onChange={() => setStatus(!status)}
                  color="success"
                />
              }
              label={status ? "Active" : "Inactive"}
            />
          </div>
        </Grid>

        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Changepassword />
        </Grid>
      </Grid>

      <br />
      <hr />

      <Typography variant="h6">Accounts</Typography>

      <Grid item xs={12} md={6}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography>Status:</Typography>&nbsp;
          <FormControlLabel
            control={
              <Switch
                checked={accountStatus}
                onChange={() => setAccountStatus(!accountStatus)}
                color="success"
              />
            }
            label={accountStatus ? "Active" : "Inactive"}
          />
        </div>
      </Grid>

      <Box mt={2}>
        <Typography>
          <b>1. 11/01/2024</b>
        </Typography>
        <Typography>By: xxxxxx</Typography>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ backgroundColor: "#fff", borderRadius: "5px", padding: "20px" }}
        >
          <Typography>Amount: xxxxxx</Typography>
          <Typography>Payment Mode: xxxxxx</Typography>
          <Typography>Payment Reference No.: xxxxxx</Typography>
          <Typography>Payment Date: xxxxxx</Typography>
          <Typography>Remark: xxxxxx</Typography>
        </Grid>
        <br />

        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <UpdatePayment/>
          </div>
          <div>
            <Link to="#" style={{ textDecoration: "none" }}>
              View History
            </Link>
          </div>
        </Grid>
      </Box>
      <br />
      <hr />

      <Box mt={2}>
        <Typography variant="h6">Client Updates</Typography>
        <Typography>
          <b>1. 11/01/2024</b>
        </Typography>
        <Typography>By: xxxxxx</Typography>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ backgroundColor: "#fff", borderRadius: "5px", padding: "20px" }}
        >
          <Typography>xxxxxxxxxxxxxxxx</Typography>
          <Typography>xxxxxxxxxxxxxxxx</Typography>
        </Grid>
        <br />
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              className="action-button"
              size="large"
              style={{
                backgroundColor: "#32499F",
                color: "white",
              }}
            >
              Add Update
            </Button>
          </div>

          <div>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              className="action-button"
              size="large"
              style={{
                backgroundColor: "#32499F",
                color: "white",
                marginRight: "10px",
              }}
            >
              Edit Info
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              className="action-button"
              size="large"
              style={{
                backgroundColor: "#32499F",
                color: "white",
              }}
            >
              Close
            </Button>
          </div>
        </Grid>
      </Box>
    </Box>
  );
};

export default CustomerInfoModal;
