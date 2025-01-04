import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Button from "@mui/material/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Managedistrict.css";
import {
  deleteDistrictList,
  getCountryList,
  getDistrictList,
  getRegionList,
  getStateList,
  getZoneList,
} from "../../../API Service/apiService";

const calltype = [];

const callsource = [];
// const tableCells = [
//   "Country Name",
//   "Zone",
//   "Region Name",
//   "Region Code",
//   "Status",
//   "Action",
// ];
const tableCells = [
  "Country Name",
  "State Name",
  "Region Name",
  "District Name",
  "Status",
  "Action",
];
const Managedistrict = () => {
  const history = useNavigate();
  const [value, setValue] = useState({});
  const [districtList, setDistrictList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [zoneList, setZoneList] = useState([]);

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

  const handleDelete = async(id)=>{
    try{
      await deleteDistrictList(id);
      alert('District deleted successfully!');
      fetchDistrictList();
    }
    catch(error){
      console.log(`Error in deleting district ${error}`);
      throw error;
    }
  }
  // API call
  const fetchCountryList = async () => {
    try {
      const response = await getCountryList();
      setCountryList(response.data);
    } catch (error) {
      console.log(`Error in fetching country list dropdown ${error}`);
      throw error;
    }
  };
  const fetchRegionList = async (countryId) => {
    try {
      const response = await getRegionList();
      return response.data;
    } catch (error) {
      console.log(`Error in fetching region list dropdown ${error}`);
      throw error;
    }
  };

  const fetchZoneList = async () => {
    try {
      const response = await getZoneList();
      setZoneList(response.data);
    } catch (error) {
      console.log(`Error in fetching zone list dropdown ${error}`);
      throw error;
    }
  };
  const fetchStateList = async()=>{
    try{
      const response = await getStateList();
      setStateList(response.data);
    }
    catch(error){
      console.log(`Error in fetching state list dropdown ${error}`);
      throw error;
    }
  };

  const fetchDistrictList = async () => {
    try {
      const response = await getDistrictList();
      setDistrictList(response.data);
    } catch (error) {
      console.log(`Error in fetching District List ${error}`);
      throw error;
    }
  };

  useEffect(() => {
    fetchDistrictList();
    fetchCountryList();
    fetchRegionList();
    fetchZoneList();
    fetchStateList();
  },[]);
  
  return (
    <div className="Managedistrict-container">
      <div className="fistline-Managedistrict">
        <span>
          <Link to="/Setting">
            <img src="photos/arrow.png" alt="back" style={{ width: "30px" }} />
          </Link>
        </span>
        <h2>Manage District</h2>
      </div>

      <div className="autocompleteform-Managedistrict">
        <div className="textinputmain-Managedistrict">
          <div className="line-Managedistrict">
            <div className="textinput-Managedistrict">
              <Autocomplete
                onChange={(e, val) => {
                  setValue({ ...value, role: val.title });
                }}
                {...callsourceDefaultProps}
                id="disable-close-on-select"
                options={countryList}
                getOptionLabel={(option) => option.countryName}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country Name"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="textinput-Managedistrict">
              <Autocomplete
                onChange={(e, val) => {
                  setValue({ ...value, role: val.title });
                }}
                {...calltypeDefaultProps}
                options={zoneList}
                getOptionLabel={(option) => option.zoneName}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField {...params} label="Zone Name" variant="standard" />
                )}
              />
            </div>
            <div className="textinput-Managedistrict">
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
                    label="Region Name"
                    variant="standard"
                  />
                )}
              />
            </div>
          </div>

          <div className="line-Managedistrict">
            <div className="textinput-Managedistrict">
              <Autocomplete
                onChange={(e, val) => {
                  setValue({ ...value, role: val.title });
                }}
                {...calltypeDefaultProps}
                id="disable-close-on-select"
                options={stateList}
                getOptionLabel={(option) => option.stateName}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State Name"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="textinput-Managedistrict">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="District Name"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Managedistrict">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="District Code"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, workflowName: e.target.value });
                }}
              />
            </div>
          </div>
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
                history("/Setting");
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
              variant="contained"
              style={{ backgroundColor: "#32499F", color: "white" }}
            >
              SAVE
            </Button>
          </span>
        </div>
      </div>

      <div className="table-Managestate">
        <table>
          <thead>
            <tr>
              {tableCells.map((cell, index) => (
                <th key={index}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {districtList.length === 0 ? (
              <tr>
                <td colSpan={tableCells.length}>No Data Found</td>
              </tr>
            ) : (
              districtList.map((district, index) => (
                <tr key={district.id}>
                  <td>xxxx</td>
                  <td>xxxx</td>
                  <td>xxxx</td>
                  <td>{district.districtName}</td>
                  <td>{district.status}</td>
                  <td>
                    <FaEdit style={{ cursor: "pointer", marginRight: "5px" }} />
                    <FaTrash style={{ cursor: "pointer" }} onClick={()=>handleDelete(district.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Managedistrict;
