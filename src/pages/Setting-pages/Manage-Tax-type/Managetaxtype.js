import React from "react";
import "./Managetaxtype.css";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";

const Managetaxtype = () => {
  function handleClick() {
    const saveButton = document.getElementById("save-button");
    saveButton.textContent = "Saved";
    saveButton.classList.add("saved");
    alert("Data saved successfully!");
  }

  React.useEffect(() => {
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", handleClick);

    return () => {
      saveButton.removeEventListener("click", handleClick);
    };
  }, []);

  const [value, setValue] = React.useState({});

  return (
    <div className="Managetaxtype-container">
      <div className="fistline-Managetaxtype">
        <span>
          <Link to="/Setting">
            <img src="photos\arrow.png" alt="back" style={{ width: "30px" }} />
          </Link>
        </span>
        <h2>Manage Tax Type</h2>
      </div>

      <div className="autocompleteform-Managetaxtype">
        <div className="textbox-main-Managetaxtype">
          <div className="line-Managetaxtype">
            <div className="textinput-Managetaxtype">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Tax Type"
                variant="standard"
                onChange={(e) => {
                  setValue({ ...value, taxType: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Managetaxtype">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Tax Name"
                variant="standard"
                onChange={(e) => {
                  setValue({ ...value, taxName: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Managetaxtype"></div>
          </div>

          <div className="button-Managetaxtype">
            <span className="buttons-Managetaxtype-span">
              <Button
                className="action-button"
                size="large"
                variant="contained"
                style={{ backgroundColor: "#32499F", color: "white" }}
              >
                Cancel
              </Button>
            </span>
            <span className="buttons-Managetaxtype-span">
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
      <div className="table-Managetaxtype">
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

export default Managetaxtype;
