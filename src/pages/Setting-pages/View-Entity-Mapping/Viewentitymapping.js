import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Viewentitymapping.css";

const Viewentitymapping = () => {
  const [value, setValue] = useState({
    role: "", // Initialize this value as needed
    workflowName: "", // Initialize this value as needed
  });

  const calltype = [];

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  return (
    <div className="Viewentitymapping-container">
      <div className="fistline-Viewentitymapping">
        <p className="name-Viewentitymapping">
          <span>
            <Link to="/Viewentitymapping">View Entity Mapping</Link> &gt;
          </span>
          <span>
            <Link to="#">Add</Link>
          </span>
        </p>
      </div>

      <div className="autocompleteform-Viewentitymapping">
        <div className="namewithicone-Viewentitymapping">
          <p className="name-Viewentitymapping">
            <span>
              <p>View Entity Mapping</p>
            </span>
          </p>
        </div>
        <div className="textbox-main-Viewentitymapping">
          <div className="second-textbox-Viewentitymapping">
            <div className="autocomplete-Viewentitymapping">
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
                      label="Entity Mapping Type"
                      variant="standard"
                    />
                  )}
                />
              </Stack>
            </div>
            <div className="autocomplete-Viewentitymapping">
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
                      label="Relation"
                      variant="standard"
                    />
                  )}
                />
              </Stack>
            </div>
            <div className="autocomplete-Viewentitymapping">
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
                      label="Primary Entity"
                      variant="standard"
                    />
                  )}
                />
              </Stack>
            </div>
          </div>

          <div className="first-textbox-Viewentitymapping">
            <div className="textinput-Viewentitymapping">
              <TextField
                id="standard-basic"
                label="Secondary Entity"
                variant="standard"
                onChange={(e) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="buttons-Viewentitymapping">
            <Button
              id="save-button"
              className="Save-Viewentitymapping"
              type="button"
              variant="contained"
              onClick={() => {}}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewentitymapping;
