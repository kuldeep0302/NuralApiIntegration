import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Button from "@mui/material/Button";
import Jobsheet from "../Jobsheet/Jobsheet";
import "./Jobsheets.css";

const Jobsheets = () => {
  const [value, setValue] = useState({
    role: "",
  });

  const calltype = [];

  const [state, setState] = useState({
    JobsheetNumber: "",
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

  const [isPopupVisible, setPopupVisible] = useState(false);

  // Function to handle the icon click and toggle the pop-up visibility
  const handleIconClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <div className="Jobsheets-container">
        <div className="heading-Jobsheets">
          <h3>Jobsheets</h3>
        </div>

        <div className="main-line-Jobsheets">
          <div className="line-jobsheets">
            <div className="textinput-Jobsheets" aria-label="State">
              <Autocomplete
                onChange={(e, val) => {
                  handleTextChange("role", val.title);
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
            </div>{" "}
            <div className="textinput-Jobsheets" aria-label="City">
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
            </div>{" "}
            <div className="textinput-Jobsheets" aria-label="Jobsheet Type">
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
            <div className="textinput-Jobsheets">
              <TextField
               style={{width:"100%"}}
                id="standard-basic"
                label="Jobsheet Number"
                variant="standard"
                value={state.faultObservedByCustomer}
                onChange={(e) =>
                  handleTextChange("Jobsheet Number", e.target.value)
                }
              />
            </div>
          </div>

          <div className="line-jobsheets">
            <div className="textinput-Jobsheets">
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
                    Product Category"
                    variant="standard"
                  />
                )}
              />
            </div>
          </div>

          <div className="buttons-Jobsheets">
            <span className="buttons-Jobsheets-span">
              <Button
                className="action-button"
                size="large"
                component="label"
                variant="contained"
                style={{ backgroundColor: "#32499F", color: "white" }}
              >
                Search
              </Button>
            </span>
            <span className="buttons-Jobsheets-span">
              <Button
                className="action-button"
                size="large"
                component="label"
                variant="contained"
                style={{ backgroundColor: "#32499F", color: "white" }}
              >
                Reset
              </Button>
            </span>
          </div>
        </div>
      </div>

      <div className="secoundbox-Jobsheets">
        <h4 className="secound-text-Jobsheets">Jobsheets</h4>
        <h4 className="underline-Jobsheets" aria-hidden="true"></h4>
      </div>

      <div className="table-Jobsheets">
        <table>
          <thead>
            <tr>
              <th>Jobsheet Date</th>
              <th>Jobsheet Number</th>
              <th>Complaint Number</th>
              <th>Product Category</th>
              <th>SKU</th>
              <th>Contact Person</th>
              <th>Location</th>
              <th>Jobsheet Status</th>
              <th>Action</th>
            </tr>
            <tr>
              <td colspan="8">&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01/09/2021</td>
              <td>JS2140000060</td>
              <td>14456</td>
              <td>XYZ</td>
              <td>FV98980700009</td>
              <td>9876756543</td>
              <td>Delhi</td>
              <td>Open</td>
              <td>
                <input type="checkbox" />
                <img
                  src="photos\view.png"
                  alt=""
                  width="15"
                  style={{ marginLeft: "5px" }}
                />{" "}
                <img
                  src="photos\print.png"
                  alt=""
                  width="15"
                  style={{ marginLeft: "5px" }}
                />{" "}
                <img
                  src="photos\close.png"
                  alt=""
                  width="15"
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={handleIconClick}
                />
              </td>
            </tr>
            <tr className="cs-Jobsheets">
              <td colspan="4"></td>
            </tr>
            <tr>
              <td>01/09/2021</td>
              <td>JS2140000060</td>
              <td>14456</td>
              <td>XYZ</td>
              <td>FV98980700009</td>
              <td>9876756543</td>
              <td>Delhi</td>
              <td>Open</td>
              <td>
                <input type="checkbox" />
                <img
                  src="photos\view.png"
                  alt=""
                  width="15"
                  style={{ marginLeft: "5px" }}
                />{" "}
                <img
                  src="photos\print.png"
                  alt=""
                  width="15"
                  style={{ marginLeft: "5px" }}
                />{" "}
                <img
                  src="photos\close.png"
                  alt=""
                  width="15"
                  style={{ marginLeft: "5px" }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="popup-Jobsheets-main">
        {isPopupVisible && (
          <div className="popup-Jobsheets">
            {/* Pass relevant data to the Jobsheet component */}
            <Jobsheet
              jobsheetNumber={state.JobsheetNumber} // Pass the specific job sheet number
              onClose={handleIconClick} // Function to close the popup
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Jobsheets;
