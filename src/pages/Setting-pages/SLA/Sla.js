import React, { useState } from "react";
import "./Sla.css";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/lab/Autocomplete";

const Sla = () => {
  const [value, setValue] = useState({});

  const calltype = [];

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  return (
    <div className="Sla-container">
      <div className="fistline-Sla">
        <span>
          <Link to="/Setting">
            <img src="photos\arrow.png" alt="back" style={{ width: "30px" }} />
          </Link>
        </span>
        <h2>SLA</h2>
      </div>

      <div className="autocompleteform-Sla">
        <div className="textbox-main-Sla">
          <div className="line-Sla">
            <div className="textinput-Sla">
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
                    label="Jobsheet Type"
                    variant="standard"
                  />
                )}
              />
            </div>

            <div className="textinput-Sla"></div>

            <div className="textinput-Sla"></div>
          </div>

          <div className="button-Sla">
            <span className="buttons-Sla-span">
              <Button
                className="action-button"
                size="large"
                variant="contained"
                style={{ backgroundColor: "#32499F", color: "white" }}
              >
                RESET
              </Button>
            </span>
            <span className="buttons-Sla-span">
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

      <div className="table-Sla">
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

export default Sla;
