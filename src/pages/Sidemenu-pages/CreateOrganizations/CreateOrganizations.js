import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Autocomplete,
  Typography,
  Box,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const subscriptionPlans = [];
const subscriptionTypes = ["Trial", "Subscription"];
const inventoryManagementOpt=["Yes","No"];

const CreateOrganizations = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    companyName: "",
    mobileNo: "",
    email: "",
    alternateNo: "",
    location: "",
    subscriptionType: "Trial",
    subscriptionStartDate: null,
    subscriptionEndDate: null,
    subscriptionPlan: "",
    noOfLicenses: "",
    planPrice: "",
    accessKey: "",
    loginID: "",
    password: "",
    inentoryManagement:"",
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

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      companyLogo: e.target.files[0],
    });
  };

  const handleSubscriptionTypeChange = (event, newValue) => {
    setFormData({
      ...formData,
      subscriptionType: newValue,
    });
  };
  const handleInventoryManagementChange = (event, newValue) => {
    setFormData({
      ...formData,
      inentoryManagement: newValue,
    });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  const handleSubscriptionPlanChange = (event, newValue) => {
    setFormData({
      ...formData,
      subscriptionPlan: newValue,
    });
  };

  return (
    <>
      <div
        className="firstbox-ClientOrganization"
        style={{
         
          borderBottom: "1px solid #ccc",
          paddingTop: "20px",
          paddingLeft: "25px",
          height: "60px",
          fontSize: "x-large !important",
          position: "relative",
          bottom: "20px",
        }}
      >
        <h2 className="first-text-ClientOrganization">Clients/Organizations</h2>
      </div>
      <Box
        classname="ClientOrganization-container"
        sx={{
          padding: "30px",
          backgroundColor: "#eff3fe",
          margin: "5px",
          borderRadius: "10px",
          paddingBottom: "30px",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Create Clients/Organizations
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
              label="Alternate No."
              name="alternateNo"
              value={formData.alternateNo}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <TextField
              variant="standard"
              width="fit-content"
              label="Address"
              name="address"
              value={formData.location}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Subscription Type */}
          <Grid item xs={6} md={4}>
            <Autocomplete
              sx={{
                width: {
                  xs: "100%", // Full width on extra-small screens
                  sm: "75%", // 75% width on small screens
                  md: "60%", // 60% width on medium screens
                  lg: "50%", // 50% width on large screens
                },
              }}
              options={subscriptionTypes}
              value={formData.subscriptionType}
              onChange={handleSubscriptionTypeChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Subscription Type"
                  variant="standard"
                />
              )}
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

          {/* Conditionally Rendered Fields */}
          {formData.subscriptionType === "Subscription" && (
            <>
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
                <Autocomplete
                  sx={{
                    width: {
                      xs: "100%", 
                      sm: "75%", 
                      md: "60%", 
                      lg: "50%", 
                    },
                  }}
                  options={subscriptionPlans}
                  value={formData.subscriptionPlan}
                  onChange={handleSubscriptionPlanChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subscription Plan"
                      variant="standard"
                    />
                  )}
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
            </>
          )}

          <Grid item xs={6} md={4}>
            <TextField
              variant="standard"
              width="fit-content"
              label="Access Key"
              name="accessKey"
              value={formData.accessKey}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <TextField
              variant="standard"
              width="fit-content"
              label="Login ID"
              name="loginID"
              value={formData.loginID}
              onChange={handleInputChange}
            />
          </Grid>

          {/* <Grid item xs={6} md={4}>
            <TextField
              variant="standard"
              width="fit-content"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Grid> */}
          <Grid item xs={6} md={4}>
            <Autocomplete
              sx={{
                width: {
                  xs: "100%", // Full width on extra-small screens
                  sm: "75%", // 75% width on small screens
                  md: "60%", // 60% width on medium screens
                  lg: "50%", // 50% width on large screens
                },
              }}
              options={inventoryManagementOpt}
              value={formData.inentoryManagement}
              onChange={handleInventoryManagementChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Inventory Management"
                  variant="standard"
                />
              )}
            />
          </Grid>


          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              className="action-button"
              size="large"
              style={{
                backgroundColor: "#32499F",
                color: "white",
                width: "fit-content",
              }}
            >
              Choose Company Logo
              <input type="file" hidden onChange={handleFileChange} />
            </Button>

            {/* <div className="textinput-ClientOrganization">
              <input
                style={{ border: 0, paddingTop: "20px" }}
                type="file"
                onChange={handleFileChange}
              />
            </div> */}
          </Grid>

          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              className="action-button"
              size="large"
              style={{ backgroundColor: "#32499F", color: "white" }}
              onClick={handleSubmit}
            >
              Create
            </Button>
            <Button
              variant="contained"
              className="action-button"
              size="large"
              style={{
                backgroundColor: "#32499F",
                color: "white",
                marginLeft: "10px",
              }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CreateOrganizations;
