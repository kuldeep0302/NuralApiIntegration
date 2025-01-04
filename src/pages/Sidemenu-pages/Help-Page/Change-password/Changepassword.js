import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Changepassword.css";
import CommonButton from "../../../../Componants/Common/Button";
import HeaderNavigation from "../../../../Componants/Common/header Navigation/HeaderNavigation";
import { Grid } from "@mui/material";

const Changepassword = () => {
  const [value, setValue] = useState({});

  return (
    <div className="container-Changepassword">
      <HeaderNavigation value={'Change Password'} />
      <div className="textfiled-Changepassword">
        <div className="line-Changepassword">
          <div className="textinput-Changepassword">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Old Password"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
          <div className="textinput-Changepassword">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="New Password"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>

          <div className="textinput-Changepassword">
            {" "}
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Confirm Password*"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
        </div>
            <Grid container sx={{margin:'10px'}}>

            <CommonButton name={"Change Password"} />
            </Grid>

        <div className="button-Changepassword">
          <div className="textinput-Changepassword">
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Changepassword;
