import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Stack from "@mui/material/Stack";
import "./Manageentitycreditterm.css";

const Manageentitycreditterm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    role: "",
    workflowName: "",
  });

  const calltype = [];

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

  return (
    <div className="Manageentitycreditterm-container">
      <div className="fistline-Manageentitycreditterm">
        <p className="name-Manageentitycreditterm">
          <span>
            <Link to="/Manageentitycreditterm">Manage Entity Credit Term</Link>{" "}
            &gt;
          </span>
          <span>
            <Link to="#">Add</Link>
          </span>
        </p>
      </div>

      <div className="autocompleteform-Manageentitycreditterm">
        <div className="namewithicone-Manageentitycreditterm">
          <p className="name-Manageentitycreditterm">
            <span>
              <p>Manage Entity Credit Term</p>
            </span>
          </p>
        </div>
        <div className="textbox-main-Manageentitycreditterm">
          <div className="second-textbox-Manageentitycreditterm">
            <div className="autocomplete-Manageentitycreditterm">
              <Stack spacing={1} sx={{ width: "100%" }}>
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
                      label="Entity Type"
                      variant="standard"
                    />
                  )}
                />
              </Stack>
            </div>
            <div className="autocomplete-Manageentitycreditterm">
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Autocomplete
                  onChange={(e, val) => {
                    setValue({ ...value, role: val.title });
                  }}
                  {...calltypeDefaultProps}
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField {...params} label="Entity" variant="standard" />
                  )}
                />
              </Stack>
            </div>
            <div className="autocomplete-Manageentitycreditterm">
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Autocomplete
                  onChange={(e, val) => {
                    setValue({ ...value, role: val.title });
                  }}
                  {...calltypeDefaultProps}
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField {...params} label="Brand" variant="standard" />
                  )}
                />
              </Stack>
            </div>
          </div>

          <div className="first-textbox-Manageentitycreditterm">
            <div className="textinput-Manageentitycreditterm">
              <TextField
                id="standard-basic"
                label="Overdraft Limit"
                variant="standard"
                onChange={(e) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Manageentitycreditterm">
              <TextField
                id="standard-basic"
                label="Overdraft Days"
                variant="standard"
                onChange={(e) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>

            <div className="date-input">
              <label htmlFor="birthday">Valid From</label>
              <input type="date" id="birthday" name="birthday" />
            </div>
          </div>

          <div className="time-input">
            <label htmlFor="validFrom">HH:MM</label>
            <input type="time" id="validFrom" name="validFrom" />
          </div>

          <div className="button-Manageentitycreditterm">
            {" "}
            <button
              className="CANCEL-Manageentitycreditterm"
              type="button"
              onClick={() => {
                navigate("/Manageentitycredittermmain");
              }}
            >
              CANCEL
            </button>
            <button
              id="save-button"
              className="Save-Manageentitycreditterm"
              type="button"
              onClick={handleClick}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manageentitycreditterm;
