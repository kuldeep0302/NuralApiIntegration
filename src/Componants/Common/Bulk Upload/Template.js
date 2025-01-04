import { Grid, Link } from "@mui/material";
import React from "react";

const Template = ({label}) => {
  return (
    <Grid>
      <Link
        href="#"
        underline="none"
        // onClick={handleDownload}
        sx={{ fontSize: "16px", cursor: "pointer", fontWeight: 700, padingTop:'10rem' }}
      >
        {label}
      </Link>
    </Grid>
  );
};

export default Template;
