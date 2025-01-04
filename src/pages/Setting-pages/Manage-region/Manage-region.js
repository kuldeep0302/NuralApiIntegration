import React, { useState, useEffect } from "react";
import "./Manage-region.css";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/lab/Autocomplete";
import { FaEdit, FaTrash } from "react-icons/fa";
import Switch from "@mui/material/Switch";
import axios from "axios";

const Manageregion = () => {
  const [value, setValue] = React.useState([]);
  const [regions, setRegions] = useState([]);
  const [zones, setZones] = useState([]);
  const [countries, setCountries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // fetch region data from api
    fetch("http://localhost:8090/api/v1/regions")
      .then((response) => response.json())
      .then((response) => setRegions(response.data))
      .catch((error) => console.log("Error in fetching regions data:", error));

    // Fetch countries data
    axios
      .get("http://localhost:8090/api/v1/countries")
      .then((res) => {
        setCountries(res.data.data);
        const updatedCallSource = res.data.data.map((item) => {
          return { value: item.id, label: item.countryName };
        });

        setValue(updatedCallSource);
      })
      .catch((error) => {
        console.error("Error fetching countries data:", error);
      });

    // Fetch zones data
    axios
      .get("http://localhost:8090/api/v1/zones")
      .then((res) => {
        setZones(res.data.data);
        const updatedCallSource = res.data.data.map((item) => {
          return { value: item.id, label: item.zoneName };
        });

        setValue(updatedCallSource);
      })
      .catch((error) => {
        console.error("Error fetching zones data:", error);
      });
  }, []);

  const [postData, setPostData] = useState({
    countryId: "",
    zoneId: "",
    regionName: "",
    displayOrder: "",
    remarks: "",
  });

  const handlePostRequest = async () => {
    try {
      const isRegionExists = regions.some((regions) => {
        return (
          regions.regionName === postData.regionName &&
          regions.zoneId === postData.zoneId
        );
      });

      if (isRegionExists) {
        alert("This region name already taken for the selected zone.");
        return;
      }
      let response;

      if (editIndex !== null) {
        // If editIndex is not null, then we are editing an existing region
        response = await axios.put(
          `http://localhost:8090/api/v1/region/${regions[editIndex].id}`,
          postData
        );
      } else {
        // Otherwise, we are adding a new region
        response = await axios.post(
          "http://localhost:8090/api/v1/region",
          postData
        );
      }

      alert(response.data.message);

      // Clear text fields after successful save
      setPostData({
        countryId: "",
        zoneId: "",
        regionName: "",
        displayOrder: "",
        remarks: "",
      });
    } catch (error) {
      alert("Error making POST request:", error);
    }
  };
  const handleEdit = (index) => {
    const regionToEdit = regions[index];
    setPostData({ ...regionToEdit });
    setEditIndex(index);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div className="manageregion-container">
      <div className="fistline-manageregion">
        <span>
          <Link to="/Setting">
            <img src="photos/arrow.png" alt="back" style={{ width: "30px" }} />
          </Link>
        </span>
        <h2>Manage Region</h2>
      </div>

      <div className="autocompleteform-manageregion">
        <div className="textinputmain-manageregion">
          <div className="line-Manageregion">
            <div className="textinput-manageregion">
              <Autocomplete
                id="country-autocomplete"
                clearOnEscape
                options={value}
                onChange={(e, a) => {
                  setPostData({ ...postData, countryId: a.value });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country Name"
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      ...params.InputProps,
                      style: {
                        background: "#EFF3FE",
                        borderBottom: "1px solid #ccc",
                      },
                    }}
                  />
                )}
              />
            </div>

            <div className="textinput-manageregion">
              <Autocomplete
                id="zone-autocomplete"
                clearOnEscape
                options={value}
                onChange={(e, a) => {
                  setPostData({ ...postData, zoneId: a.value });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Zone Name"
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      ...params.InputProps,
                      style: {
                        background: "#EFF3FE",
                        borderBottom: "1px solid #ccc",
                      },
                    }}
                  />
                )}
              />
            </div>

            <div className="textinput-manageregion">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Region Name"
                variant="standard"
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    regionName: e.target.value.toUpperCase(),
                  });
                }}
              />
            </div>
          </div>

          <div className="line-Manageregion">
            <div className="textinput-manageregion">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Region Code"
                variant="standard"
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    regionCode: e.target.value.toUpperCase(),
                  });
                }}
              />
            </div>
            <div className="textinput-manageregion">
              <Switch
                {...label}
                checked={postData.remarks === "active"}
                checkedChildren="active"
                unCheckedChildren="inactive"
                onChange={(checked) => {
                  setPostData({
                    ...postData,
                    remarks: checked ? "active" : "inactive",
                  });
                }}
              />
            </div>
            <div className="textinput-manageregion"></div>
          </div>

          <div className="button-manageregion">
            <span className="buttons-manageregion-span">
              <Button
                className="action-button"
                size="large"
                component="label"
                variant="contained"
                style={{ backgroundColor: "#32499F", color: "white" }}
                onClick={() => {
                  setPostData({
                    displayOrder: "",
                    stateId: "",
                    regionName: "",
                    remarks: "",
                  });
                  setEditIndex(null);
                }}
              >
                CANCEL
              </Button>
            </span>
            <span className="buttons-manageregion-span">
              <Button
                className="action-button"
                size="large"
                component="label"
                onClick={handlePostRequest}
                variant="contained"
                style={{ backgroundColor: "#32499F", color: "white" }}
              >
                SAVE
              </Button>
            </span>
          </div>
        </div>
      </div>

      <div className="table-Manageregionmain">
        <table>
          <thead>
            <tr>
              <th>Country Name</th>
              <th>Zone Name</th>
              <th>Region Name</th>
              <th>Region Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((regions, index) => (
              <tr key={regions.id}>
                <td>xxxxx</td>
                <td>xxxxx</td>
                <td>{regions.regionName}</td>
                <td>xxxxx</td>
                <td>{regions.remarks}</td>
                <td>
                  <FaEdit
                    style={{ cursor: "pointer", marginRight: "5px" }}
                    onClick={() => handleEdit(index)}
                  />
                  <FaTrash style={{ cursor: "pointer" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manageregion;
