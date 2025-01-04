import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import "./Callupdationmobile.css";

const calltype = [];

const Callupdationmobile = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [value, setValue] = useState({
    ServiceCentre: "",
  });

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  const handleDateChange = (date, dateType) => {
    setDateRange({
      ...dateRange,
      [dateType]: date,
    });
  };

  return (
    <div className="container-Callupdationmobile">
      <div className="firstname-Callupdationmobile">
        <h3 className="h-dashbord">Call Updation From Mobile</h3>
      </div>

      <div className="textfiled-Callupdationmobile">
        <div className="line-Callupdationmobile">
          <div className="textinput-Callupdationmobile">
            <TextField
              className="date-Callupdationmobile"
              label="Start Date"
              type="date"
              value={dateRange.startDate}
              onChange={(e) => handleDateChange(e.target.value, "startDate")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="textinput-Callupdationmobile">
            <TextField
              className="date-Callupdationmobile"
              label="End Date"
              type="date"
              value={dateRange.endDate}
              onChange={(e) => handleDateChange(e.target.value, "endDate")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="textinput-Callupdationmobile">
            <TextField
             style={{width:"100%"}}
              id="standard-basic"
              label="Jobsheet Number"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="line-Callupdationmobile">
          <div className="textinput-Callupdationmobile">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, Cluster: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Service Centre:"
                  variant="standard"
                />
              )}
            />
          </div>

          <div className="textinput-Callupdationmobile">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, Cluster: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Engineer Centre:"
                  variant="standard"
                />
              )}
            />
          </div>

          <div className="textinput-Callupdationmobile"></div>
        </div>

        <div className="line-Callupdationmobile">
          <div className="textinput-Callupdationmobile">
            <span className="buttons-Bufferstockallocation-span">
              <Button
                className="action-button"
                size="large"
                component="label"
                variant="contained"
                style={{ backgroundColor: "#32499F", margin: "10px" }}
              >
                Search
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Callupdationmobile;
