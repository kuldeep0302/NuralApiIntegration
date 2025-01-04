import React from "react";
import { TextField, Button, Box } from "@mui/material";
const ChangePasswordModal = ({ open, handleClose }) => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#f0f4ff",
        padding: 3,
        borderRadius: 2,
        width: "100%",
      }}
    >
      <h4>Change Password</h4>
      <TextField label="Current Password" type="password" fullWidth />
      <TextField label="New Password" type="password" fullWidth />
      <TextField label="Confirm Password" type="password" fullWidth />
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "fit-content", margin: "0px 100px", backgroundColor: "#32499F",
          color: "white", }}
        component="label"
        className="action-button"
      >
        Change Password
      </Button>
    </Box>
  );
};

export default ChangePasswordModal;
