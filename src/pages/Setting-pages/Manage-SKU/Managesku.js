import React from "react";
import "./Managesku.css";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Button from "@mui/material/Button";

const calltype = [];

const callsource = [];

const Managesku = () => {
  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  const callsourceDefaultProps = {
    options: callsource,
    getOptionLabel: (option) => option.title,
  };

  function handleClick() {
    const saveButton = document.getElementById("save-button");
    saveButton.textContent = "Saved";
    saveButton.classList.add("saved");
    alert("Data saved successfully!");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", handleClick);
  });

  const [value, setValue] = React.useState({});

  return (
    <div className="Managesku-container">
      <div className="fistline-Managesku">
        <span>
          <Link to="/Setting">
            <img src="photos\arrow.png" alt="back" style={{ width: "30px" }} />
          </Link>
        </span>
        <h2>Manage SKU</h2>
      </div>

      <div className="autocompleteform-Managesku">
        <div className="textbox-main-Managesku">
          <div className="line-Managetexmaster">
            <div className="textinput-Managesku">
              <Autocomplete
                onChange={(e, val) => {
                  setValue({ ...value, role: val.title });
                }}
                {...callsourceDefaultProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Brand Name"
                    variant="standard"
                  />
                )}
              />
            </div>

            <div className="textinput-Managesku">
              <Autocomplete
                onChange={(e, val) => {
                  setValue({ ...value, role: val.title });
                }}
                {...callsourceDefaultProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Category"
                    variant="standard"
                  />
                )}
              />
            </div>

            <div className="textinput-Managesku">
              <div>
                <Autocomplete
                  onChange={(e, val) => {
                    setValue({ ...value, role: val.title });
                  }}
                  {...calltypeDefaultProps}
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField {...params} label="Model" variant="standard" />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="line-Managesku">
            <div className="textinput-Managesku">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="SKU Name"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Managesku">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="SKU Code"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Managesku">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="SKU Description"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="line-Managesku">
            <div className="textinput-Managesku">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="HSN Code"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Managesku"></div>
            <div className="textinput-Managesku"></div>
          </div>

          <div className="button-Managesku">
            <span className="buttons-Managesku-span">
              <Button
                className="action-button"
                size="large"
                variant="contained"
                style={{ backgroundColor: "#32499F", color: "white" }}
              >
                RESET
              </Button>
            </span>
            <span className="buttons-Managesku-span">
              <Button
                id="save-button"
                className="action-button"
                size="large"
                variant="contained"
                style={{ backgroundColor: "#32499F", color: "white" }}
              >
                SAVE
              </Button>
            </span>
          </div>
        </div>
      </div>
      <div className="table-Managesku">
        <table>
          <thead>
            <tr>
              <th>Country Name</th>
              <th>Country Code</th>
              <th>Currency</th>
              <th>Display Order</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default Managesku;
