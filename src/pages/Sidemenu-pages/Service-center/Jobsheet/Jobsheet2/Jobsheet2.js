import React, { useState } from "react";
import "./Jobsheet2.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const calltype = [];

const Jobsheet2 = () => {
  const [warrantyVoid, setWarrantyVoid] = useState(false);

  const handleWarrantyToggle = () => {
    setWarrantyVoid((prevState) => !prevState);
  };

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  const [setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const [value, setValue] = useState({
    customerCompanyName: "",
    contactPersonName: "",
    email: "",
    mobileNo: "",
    // ... other fields ...
  });

  return (
    <>
      <div className="Jobsheet2-container">
        <div className="heading-Jobsheet2">
          <h3>Jobsheet No. JS214000060</h3>
        </div>

        <div className="main-line-Jobsheet2">
          <div className="first-line-Jobsheet2">
            <div className="textinput-Jobsheet2">
              <TextField
                id="standard-basic"
                label="Castomer Name"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>{" "}
            <div className="textinput-Jobsheet2">
              <TextField
                id="standard-basic"
                label="City"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Jobsheet2">
              <TextField
                id="standard-basic"
                label="Service Type"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>{" "}
          </div>

          <div className="Secound-line-Jobsheet2">
            <div className="textinput-Jobsheet2">
              <TextField
                id="standard-basic"
                label="Jobsheet Type"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>{" "}
            <div className="textinput-Jobsheet2">
              <TextField
                id="standard-basic"
                label="Fault as observed by Castomer"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Jobsheet2">
              <TextField
                id="standard-basic"
                label="Remark"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>{" "}
          </div>

          <div className="seven-line-Jobsheet2">
            <div className="auto-Logcomplaint">
              <Stack spacing={1} sx={{ width: 200 }}>
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
                      Fault as observed by Service Center"
                      variant="standard"
                    />
                  )}
                />
              </Stack>
            </div>
          </div>

          <div className="switchline-main-Jobsheet2">
            <div className="switchline-Jobsheet2">
              <h4 className="warrent-Jobsheet2">Warranty Void</h4>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={warrantyVoid}
                      onChange={handleWarrantyToggle}
                    />
                  }
                  label={warrantyVoid ? "Yes" : "No"}
                />
              </div>
            </div>
          </div>
          <div className="main-line2-Jobsheet2">
            <div className="third-line-Jobsheet2">
              <div className="textinput-Jobsheet2">
                <TextField
                  id="standard-basic"
                  label="Warranty Void Remark"
                  variant="standard"
                  onChange={(e, val) => {
                    setValue({ ...value, workflowName: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="container-Jobsheet2">
              <div className="upload-excel-Jobsheet2">
                <p>Image Upload</p>
              </div>

              <div className="upload-text-Jobsheet2">
                <input
                  className="input-Jobsheet2"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          <div className="main-line3-Jobsheet2">
            <div className="third-line-Jobsheet2">
              <div className="textinput-Jobsheet2">
                <TextField
                  id="standard-basic"
                  label="Contact Person Name"
                  variant="standard"
                  onChange={(e, val) => {
                    setValue({ ...value, workflowName: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="third-line-Jobsheet2">
              <div className="textinput-Jobsheet2">
                <TextField
                  id="standard-basic"
                  label="Contact Number"
                  variant="standard"
                  onChange={(e, val) => {
                    setValue({ ...value, workflowName: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="upload-Jobsheet2">
            <div className="sign-Jbsheet">
              <h4>Customer Sign</h4>
              <button className="sign-Jobsheet2">Sign</button>
            </div>
          </div>

          <div className="buttons-Jobsheet2">
            <button className="create-Jobsheet2">Close omplaint</button>
            <button className="cancel-Jobsheet2">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobsheet2;
