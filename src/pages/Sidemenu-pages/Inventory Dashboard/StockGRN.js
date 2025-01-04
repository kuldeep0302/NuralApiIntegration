import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import InventoryTabs from "../../../Componants/Common/Inventory tabs/InventoryTabs";
import InputFileUpload from "../../../Componants/Common/Bulk Upload/InputFileUpload";
import CommonButton from "../../../Componants/Common/Button";
import Template from "../../../Componants/Common/Bulk Upload/Template";
import Subheader from "../../../Componants/Common/Subheader";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";

const StockGRN = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
    } else {
      console.log("No file selected.");
    }
  };

  const handleDownload = () => {
    console.log("Downloading file...");
  };

  return (
    <Grid container>
      <HeaderNavigation value={'Stock GRN'}/>
      <InventoryTabs />
      <Grid
        container
        sx={{
          // background: "#EFF3FE",
          // marginLeft: "10px",
          // marginTop: "4px",
          // marginRight: "10px",
          // fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
          // width: "100%",
          // borderRadius: "5px",
          // padding: "10px",
          // fontWeight: 600,
          backgroundColor: "#eff3fe",
          maxWidth: "100%",
          margin: "10px",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <Grid container sx={{ marginBottom: "20px" }}>
          <Subheader heading={"Bulk Upload"} />
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Typography>Upload File</Typography>
          </Grid>
        </Grid>
        <Grid container gap={10}>
          <Grid item>
            <InputFileUpload
              inputProps={{ accept: ".xlsx, .xls" }}
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item>
            <CommonButton name={"Upload"} onClick={handleUpload} />
          </Grid>
          <Grid item sx={{ padding: "1rem" }}>
            <Template label={"Download Template"} onClick={handleDownload} />
          </Grid>
          <Grid item sx={{ padding: "1rem" }}>
            <Template
              label={"Download Reference Code"}
              onClick={handleDownload}
            />
          </Grid>
        </Grid>
        <Grid container gap={5}>
          <Grid item>
            <TextField
              style={{ width: "12.5rem" }}
              id="standard-basic"
              label="GRN Reference No."
              variant="standard"
            //   onChange={(e, val) => {
            //     setValue({ ...value, workflowName: e.target.value });
            //   }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "12.5rem" }}
              id="standard-basic"
              label="GRN Remarks"
              variant="standard"
            //   onChange={(e, val) => {
            //     setValue({ ...value, workflowName: e.target.value });
            //   }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StockGRN;
