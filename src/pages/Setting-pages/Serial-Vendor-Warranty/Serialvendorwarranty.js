import React, { useState } from "react";
import "./Serialvendorwarranty.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const callsource = [];

const Serialvendorwarranty = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const callsourceDefaultProps = {
    options: callsource,
    getOptionLabel: (option) => option.title,
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      // Implement your file upload logic here, e.g., use a file upload API
      console.log("Uploading file:", selectedFile.name);
    } else {
      console.log("No file selected.");
    }
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
    <div className="container-Serialvendorwarranty">
      <div className="fistline-Serialvendorwarranty">
        <span>
          <Link to="/Setting">
            <img src="photos\arrow.png" alt="back" style={{ width: "30px" }} />
          </Link>
        </span>
        <h2>Serial vendor warranty</h2>
      </div>
      <div className="Uicontainer-Serialvendorwarranty">
        <div className="line-Serialvendorwarranty">
          <div className="textinput-Serialvendorwarranty">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, role: val.title });
              }}
              {...callsourceDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField {...params} label="Model" variant="standard" />
              )}
            />
          </div>
          <div className="textinput-Serialvendorwarranty">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, role: val.title });
              }}
              {...callsourceDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField {...params} label="SKU" variant="standard" />
              )}
            />
          </div>
          <div className="textinput-Serialvendorwarranty">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Invoice Date"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="line-Serialvendorwarranty">
          <div className="textinput-Serialvendorwarranty">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="POP-Warranty"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
          <div className="textinput-Serialvendorwarranty">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="manufacturing-Warranty"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
          <div className="textinput-Serialvendorwarranty">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Vendor-Warranty"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="button-Serialvendorwarranty">
          <span className="buttons-Serialvendorwarranty-span">
            <Button
              className="action-button"
              size="large"
              variant="contained"
              style={{ backgroundColor: "#32499F", color: "white" }}
            >
              Save
            </Button>
          </span>
          <span className="buttons-Serialvendorwarranty-span">
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
      <div className="uploadcontainer-Serialvendorwarranty">
        <div className="upload-excel-Serialvendorwarranty">
          <p>Upload Excel:</p>
        </div>

        <div className="upload-text-Serialvendorwarranty">
          <input
            className="input-Serialvendorwarranty"
            type="file"
            onChange={handleFileChange}
          />
          <span className="buttons-Serialvendorwarranty-span">
            <Button
              id="save-button"
              className="action-button"
              size="large"
              variant="contained"
              onClick={handleUpload}
              style={{ backgroundColor: "#32499F", color: "white" }}
            >
              Upload
            </Button>
          </span>
        </div>
      </div>

      <div className="table-Serialvendorwarranty">
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

export default Serialvendorwarranty;
