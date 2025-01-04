import { useState } from "react";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@material-ui/core";

const ProductTabs = ({ selectedTab }) => {
  const [value, setValue] = useState(selectedTab);
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(selectedTab);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    if (newValue === "one") {
      navigate("/Managebrand");
    } else if (newValue === "two") {
      navigate("/Manageproductcatgeory");
    } else if (newValue === "three") {
      navigate("/Manageproductsubcatgeory");
    } else if (newValue === "four") {
      navigate("/Managemodel");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs"
        variant={isSmallScreen ? "scrollable" : "standard"}
        scrollButtons={isSmallScreen ? "auto" : "off"}
        sx={{ "& .MuiTab-root:focus": { outline: "none" } }}
      >
        <Tab
          sx={{ fontSize: "14px !important" }}
          value="one"
          label="Add Brand"
        />
        <Tab
          sx={{ fontSize: "14px !important" }}
          value="two"
          label="Category"
        />
        <Tab
          sx={{ fontSize: "14px !important" }}
          value="three"
          label="Sub Category"
        />
        <Tab
          sx={{ fontSize: "14px !important" }}
          value="four"
          label="Add Model"
        />
      </Tabs>
    </Box>
  );
};

export default ProductTabs;
