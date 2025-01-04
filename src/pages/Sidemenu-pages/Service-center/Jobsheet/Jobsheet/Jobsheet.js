import React, { useState } from "react";
import "./Jobsheet.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const calltype = [];

const Jobsheet = () => {
  const [value, setValue] = useState({});

  const [warrantyVoid, setWarrantyVoid] = useState(false);
  const [replaceAvailable, setReplaceAvailable] = useState(false);

  const handleWarrantyToggle = () => {
    setWarrantyVoid((prevState) => !prevState);
  };

  const handleReplaceToggle = () => {
    setReplaceAvailable((prevState) => !prevState);
  };

  const [state, setState] = useState({
    state: "",
    city: "",
    jobSheetType: "",
    // Add more fields here as needed
  });

  const handleTextChange = (fieldName, value) => {
    setState({
      ...state,
      [fieldName]: value,
    });
  };

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  const [setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleCancelButtonClick = () => {
    // Assuming Jobsheet is a reference to the window you want to close
    Jobsheet.close();
  };
  

  return (
    <>
      <div className="Jobsheet-container">
        <div className="first-with-Jobsheet">
          <div className="first-heading-Jobsheet">Jobsheet No. JS214000060</div>
          <div className="cross-Jobsheet">
            <img src="/photos/Vector.png" alt="faasf" id="cancelbutton"  onClick={handleCancelButtonClick} />
          </div>
        </div>

        <div className="main-line-Jobsheet">
          <div className="first-line-Jobsheet">
            <div className="textinput-Jobsheet">
              <TextField
                id="standard-basic"
                label="State"
                variant="standard"
                value={state.state}
                onChange={(e) => handleTextChange("state", e.target.value)}
              />
            </div>{" "}
            <div className="textinput-Jobsheet">
              <TextField
                id="standard-basic"
                label="City"
                variant="standard"
                value={state.city}
                onChange={(e) => handleTextChange("city", e.target.value)}
              />
            </div>
            <div className="textinput-Jobsheet">
              <TextField
                id="standard-basic"
                label="Jobsheet Type"
                variant="standard"
                value={state.jobSheetType}
                onChange={(e) =>
                  handleTextChange("jobSheetType", e.target.value)
                }
              />
            </div>{" "}
          </div>

          <div className="Secound-line-Jobsheet">
            <div className="textinput-Jobsheet">
              <TextField
                id="standard-basic"
                label="Fault as observed by Customer"
                variant="standard"
                value={state.faultObservedByCustomer}
                onChange={(e) =>
                  handleTextChange("faultObservedByCustomer", e.target.value)
                }
              />
            </div>
            <div className="textinput-Jobsheet">
              <TextField
                id="standard-basic"
                label="Fault as observed by Service Center"
                variant="standard"
                value={state.faultObservedByServiceCenter}
                onChange={(e) =>
                  handleTextChange(
                    "faultObservedByServiceCenter",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="textinput-Jobsheet">
              <TextField
                id="standard-basic"
                label="Remark"
                variant="standard"
                value={state.remark}
                onChange={(e) => handleTextChange("remark", e.target.value)}
              />
            </div>
          </div>

          <div className="switchline-main-Jobsheet">
            <div className="switchline-Jobsheet">
              <h4 className="warrent-Jobsheet">Warranty Void Status</h4>
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
            <div className="switchline2-Jobsheet">
              <h4 className="warrent-Jobsheet">Replacement Available</h4>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={replaceAvailable}
                      onChange={handleReplaceToggle}
                    />
                  }
                  label={replaceAvailable ? "Yes" : "No"}
                />
              </div>
            </div>
          </div>
          <div className="main-line2-Jobsheet">
            <div className="third-line-Jobsheet">
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
                    Brand"
                        variant="standard"
                      />
                    )}
                  />
                </Stack>
              </div>
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
                    Category"
                        variant="standard"
                      />
                    )}
                  />
                </Stack>
              </div>{" "}
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
                    Sub Category"
                        variant="standard"
                      />
                    )}
                  />
                </Stack>
              </div>{" "}
            </div>

            <div className="third-line-Jobsheet">
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
                    Model"
                        variant="standard"
                      />
                    )}
                  />
                </Stack>
              </div>{" "}
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
                    SKU"
                        variant="standard"
                      />
                    )}
                  />
                </Stack>
              </div>{" "}
              <div className="textinput-Jobsheet">
                <TextField
                  id="standard-basic"
                  label="Contact Person Name"
                  variant="standard"
                  value={state.contactPersonName}
                  onChange={(e) =>
                    handleTextChange("contactPersonName", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="third-line-Jobsheet">
              <div className="textinput-Jobsheet">
                <TextField
                  id="standard-basic"
                  label="Contact Number"
                  variant="standard"
                  value={state.contactNumber}
                  onChange={(e) =>
                    handleTextChange("contactNumber", e.target.value)
                  }
                />
              </div>{" "}
            </div>
          </div>

          <div className="upload-Jobsheet">
            <div className="sign-Jbsheet">
              <h4>Customer Sign</h4>
              <button className="sign-Jobsheet">Sign</button>
            </div>

            <div className="container-Jobsheet">
              <div className="upload-excel-Jobsheet">
                <p>Image Upload (Product Being Replaced)</p>
              </div>

              <div className="upload-text-Jobsheet">
                <input
                  className="input-Jobsheet"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="container-Jobsheet">
              <div className="upload-excel-Jobsheet">
                <p>Image Upload (Product Being Replaced)</p>
              </div>

              <div className="upload-text-Jobsheet">
                <input
                  className="input-Jobsheet"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          <div className="buttons-Jobsheet">
            <button className="create-Jobsheet">Close omplaint</button>
            <button className="cancel-Jobsheet">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobsheet;
