import React, { useState } from "react";
import "./Logproductcomplaint.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Stack from "@mui/material/Stack";

const calltype = [];

const Logproductcomplaint = () => {
  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  const [value, setValue] = useState({
    Remark: "",
    contactPersonName: "",
    ContactNumber: "",
  });

  return (
    <>
      <div className="Logproductcomplaint-container">
        <div className="text-auti-form-Logproductcomplaint">
          <div className="firstbox-Logproductcomplaint">
            <h4 className="first-text-Logproductcomplaint">
              Log Product Complaint
            </h4>
          </div>
          <div className="firstline-Logproductcomplaint">
            <div className="auto-Logproductcomplaint">
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
                    State"
                      variant="standard"
                    />
                  )}
                />
              </Stack>
            </div>{" "}
            <div className="auto-Logproductcomplaint">
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
                    City"
                      variant="standard"
                    />
                  )}
                />
              </Stack>
            </div>{" "}
            <div className="auto-Logproductcomplaint">
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
                    Jobsheet Type"
                      variant="standard"
                    />
                  )}
                />
              </Stack>
            </div>{" "}
          </div>

          <div className="firstline-Logproductcomplaint">
            <div className="auto-Logproductcomplaint">
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
                    Service Type"
                      variant="standard"
                    />
                  )}
                />
              </Stack>
            </div>{" "}
            <div className="auto-Logproductcomplaint">
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
                    Fault as observed by customer"
                      variant="standard"
                    />
                  )}
                />
              </Stack>
            </div>{" "}
            <div className="textinput-Callhistory">
              <TextField
                id="standard-basic"
                label="Remark"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, Remark: e.target.value });
                }}
              />
            </div>
          </div>
        </div>

        <div className="text-auti-form-Logproductcomplaint">
          <div className="firstbox-Logproductcomplaint">
            <h4 className="Secound-text-Logproductcomplaint">
              Customer Preference For Service Center
            </h4>
          </div>

          <div className="Secoundline-Logproductcomplaint">
            <div className="textinput-Callhistory">
              <TextField
                id="standard-basic"
                label="Contact Person Name"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, ContactPersonName: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Callhistory">
              <TextField
                id="standard-basic"
                label="Contact Number"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, ContactNumber: e.target.value });
                }}
              />
            </div>
          </div>
        </div>

        <div className="table-container-Logproductcomplaint">
          <table className="custom-table-Logproductcomplaint">
            <thead>
              <tr>
                <th>Location</th>
                <th>Service Center Name</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Email ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NSM 1</td>
                <td>150</td>
                <td>51%</td>
                <td>24%</td>
                <td>22%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="buttons-Logproductcomplaint">
          <button className="Search-Logproductcomplaint">Search</button>
          <button className="Reset-Logproductcomplaint">Reset</button>
          <div className="button-create--Logproductcomplaint">
            <button className="createcustomer-Logproductcomplaint">
              Create Customer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logproductcomplaint;
