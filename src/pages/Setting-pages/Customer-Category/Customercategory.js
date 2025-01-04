import React from "react";
import "./Customercategory.css";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/lab/Autocomplete";

const calltype = [];

const Customercategory = () => {
  const calltypeDefaultProps = {
    options: calltype,
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
    <div className="Customercategory-container">
      <div className="fistline-Customercategory">
        <span>
          <Link to="/Setting">
            <img src="photos\arrow.png" alt="back" style={{ width: "30px" }} />
          </Link>
        </span>
        <h2>Customer Category</h2>
      </div>

      <div className="autocompleteform-Customercategory">
        <div className="textbox-main-Customercategory">
          <div className="line-Customercategory">
            <div className="textinput-Customercategory">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Container Type"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Customercategory">
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
                    Part Type"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="textinput-Customercategory"> </div>
          </div>

          <div className="button-Customercategory">
            <span className="buttons-Customercategory-span">
              <Button
                className="action-button"
                size="large"
                variant="contained"
                style={{ backgroundColor: "#32499F", color: "white" }}
              >
                RESET
              </Button>
            </span>
            <span className="buttons-Customercategory-span">
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

      <div className="table-Customercategory">
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

export default Customercategory;
