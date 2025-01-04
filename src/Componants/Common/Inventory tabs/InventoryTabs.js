import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Alert, Button, Grid, Stack } from "@mui/material";

// TabButton component
const TabButton = ({ name, handleOnClick, bgColor }) => {
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState(true);

  const handleClick = (event) => {
    if (bgColor) {
      setColor(bgColor);
    }
    if (handleOnClick) {
      handleOnClick(event, name); // Pass 'name' or any other value to handleOnClick
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
          backgroundColor: bgColor === true ? "#33499F" : "#D2F0F4",
          color: bgColor === true ? "white" : "black",
          boxShadow: "4px 2px 4px rgb(110, 142, 237)",
          fontSize: "14px",
          width: "auto",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#33499F", 
            color:"#fff"
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

// ProductTabs component
const InventoryTabs = ({ selectedTab }) => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState("false");
  const [tabIndex, setTabIndex] = useState(selectedTab);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, tabName) => {
    setTabIndex(tabName); // Update based on tab name or identifier
    if (tabName === "Dashboard") {
      navigate("/inventory-dashboard");
      console.log(`Dashboard is right here`);
      setBgColor(true);
    } else if (tabName === "Stock GRN") {
      navigate("/inventory-stockgrn");
      setBgColor(true);
    } else if (tabName === "Buffer Stock/Transfer") {
      navigate("/inventory-stocktransfer");
      setBgColor(true);
    } else if (tabName === "Part Return") {
      navigate("/inventory-partreturn");
      setBgColor(true);
    }
  };

  return (
    <Grid container gap={3}
      sx={{
        background: "#F5F8FF",
        margin: "10px",
        width: "100%",
        borderRadius: "5px",
        padding: "10px",
        fontWeight: 600,
        display: "flex",
        flexWrap: "nowrap",
      }}
    >
      <Grid item sx={{ flexBasis: "auto" }}>
        <TabButton
          name={"Dashboard"}
          handleOnClick={handleChange}
          bgColor={true}
        />
      </Grid>
      <Grid item sx={{ flexBasis: "auto" }}>
        <TabButton
          name={"Stock GRN"}
          handleOnClick={handleChange}
          bgColor={bgColor}
        />
      </Grid>
      <Grid item sx={{ flexBasis: "auto" }}>
        <TabButton
          name={"Buffer Stock/Transfer"}
          handleOnClick={handleChange}
          bgColor={bgColor}
        />
      </Grid>
      <Grid item sx={{ flexBasis: "auto" }}>
        <TabButton
          name={"Part Return"}
          handleOnClick={handleChange}
          bgColor={bgColor}
        />
      </Grid>
    </Grid>
  );
};

export default InventoryTabs;
