import React, { useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const TableButton = ({ name, handleOnClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    if (handleOnClick) {
      handleOnClick();
    } else {
      setIsActive(true);
      console.log(`this is OnClick`);
    }
  };

  return (
    <>
      {isActive && (
        <Stack
          sx={{ width: "30%" }}
          spacing={2}
          style={{
            position: "fixed",
            top: 5,
            zIndex: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Alert severity="error" onClose={() => setIsActive(false)}>
            Hey, you forgot to handle onClick.
          </Alert>
        </Stack>
      )}
      <Button
        onClick={handleClick}
        sx={{
          backgroundColor: "#33499F",
          color: "white",
          boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
          // marginTop: "10px",
          // marginBottom: "10px",
          fontSize: "14px",
          // minWidth: "100px",
          width: "auto",
          // height: "38px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#33499F",
          },
          display: "flex",
        }}
        variant="contained"
      >
        {name}
      </Button>
    </>
  );
};

export default TableButton;
