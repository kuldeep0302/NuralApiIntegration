import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Button from "@mui/material/Button";
import "./Entitymapping.css";

const calltype = [];

const Entitymapping = () => {
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
    <div className="Entitymapping-container">
      <div className="fistline-Entitymapping">
        <span>
          <Link to="/Setting">
            <img src="photos\arrow.png" alt="back" style={{ width: "30px" }} />
          </Link>
        </span>
        <h2>Entity Mapping</h2>
      </div>

      <div className="autocompleteform-Entitymapping">
        <div className="textbox-main-Entitymapping">
          <div className="line-Entitymapping">
            <div className="textinput-Entitymapping">
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
                      Entity Mapping Type"
                    variant="standard"
                  />
                )}
              />
            </div>{" "}
            <div className="textinput-Entitymapping">
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
                      Relation"
                    variant="standard"
                  />
                )}
              />
            </div>{" "}
            <div className="textinput-Entitymapping">
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
                      Primary Entity "
                    variant="standard"
                  />
                )}
              />
            </div>
          </div>

          <div className="line-Entitymapping">
            <div className="textinput-Entitymapping">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Secondary Entity"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="button-Entitymapping">
            <span className="buttons-Entitymapping-span">
              <Button
                className="action-button"
                size="large"
                variant="contained"
                style={{ backgroundColor: "#32499F", color: "white" }}
              >
                RESET
              </Button>
            </span>
            <span className="buttons-Entitymapping-span">
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
      <div className="table-Entitymapping">
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

export default Entitymapping;
