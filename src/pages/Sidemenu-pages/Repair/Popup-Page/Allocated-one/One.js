import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Button from "@mui/material/Button";
import "./One.css";

const calltype = [];

const One = () => {
  const [value, setValue] = useState({
    customerCompanyName: "",
    contactPersonName: "",
    email: "",
    mobileNo: "",
  });

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  const [purchaseDate, setPurchaseDate] = useState(null);
  const [visitDate, setVisitDate] = useState(null);
  const [PrefferedDate, setPreferredDate] = useState(null);

  const handleDateChange = (date, fieldName) => {
    if (fieldName === "purchaseDate") {
      setPurchaseDate(date);
    } else if (fieldName === "visitDate") {
      setVisitDate(date);
    } else if (fieldName === "preferredDate") {
      setPreferredDate(date);
    }
  };

  return (
    <div className="container-one">
      <div className="first-withicone-one">
        <div className="first-heading">Update Feedback</div>
        <div className="cross-one" id="cancelbutton">
          <img src="/photos/Vector.png" alt="faasf" />
        </div>
      </div>
      <div className="text-container-one">
        <div className="line-One">
          <div className="textinput-One">
            <TextField
              id="standard-basic"
              label="Customer Name"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
          <div className="textinput-One">
            <TextField
              id="standard-basic"
              label="City"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
          <div className="textinput-One">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, role: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="
                    Service Type"
                  variant="standard"
                />
              )}
            />
          </div>
        </div>

        <div className="line-One">
          <div className="textinput-One">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, role: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="
                    Jobsheet Type"
                  variant="standard"
                />
              )}
            />
          </div>
          <div className="textinput-One">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, role: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="
                    Fault as observed by customer"
                  variant="standard"
                />
              )}
            />
          </div>
          <div className="textinput-One">
            <TextField
              id="standard-basic"
              label="Remark"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="underline-Searchdealercustomer"></p>
      </div>

      <div className="first-withicone-one">
        <div className="first-heading">Job Details</div>
        <div className="cross-one">
          <img src="/photos/Vector1.png" alt="faasf" />
        </div>
      </div>
      <div className="text-container-one">
        {" "}
        <div className="line-One">
          <div className="textinput-One">
            <TextField
              id="standard-basic"
              label="Product Name"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>

          <div className="textinput-One">
            <TextField
              id="standard-basic"
              label="Product Code"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>

          <div className="textinput-One">
            <TextField
              id="standard-basic"
              label="Warranty Status"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="line-One">
          <div className="textinput-One">
            <TextField
              className="date-One"
              label="Purchase Date"
              type="date"
              value={purchaseDate}
              onChange={(e) => handleDateChange(e.target.value, "purchaseDate")}
              name="selectedDate"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="textinput-One">
            <TextField
              id="standard-basic"
              label="Engineer Assigned"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>

          <div className="textinput-One">
            <TextField
              className="date-One"
              label="Visit Date"
              type="date"
              value={visitDate}
              onChange={(e) => handleDateChange(e.target.value, "visitDate")}
              name="selectedDate"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className="line-One">
          <div className="textinput-One">
            <TextField
              id="standard-basic"
              label="Visit Time"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
          <div className="textinput-One">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, role: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="
                    Defect"
                  variant="standard"
                />
              )}
            />
          </div>
          <div className="textinput-One">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, role: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="
                    Action"
                  variant="standard"
                />
              )}
            />
          </div>
        </div>
        <div className="line-One">
          <div className="textinput-One">
            <TextField
              className="date-One"
              label="Preffered Date"
              type="date"
              value={PrefferedDate}
              onChange={(e) =>
                handleDateChange(e.target.value, "PrefferedDate")
              }
              name="selectedDate"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className="buttons-One">
          <span className="buttons-One-span">
            <Button
              className="action-button"
              size="large"
              component="label"
              variant="contained"
            >
              Create
            </Button>
          </span>
          <span className="buttons-One-span">
            <Button
              className="action-button"
              size="large"
              component="label"
              variant="contained"
            >
              Cancel
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default One;
