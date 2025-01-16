import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";

import ProductTabs from "../../../Componants/Common/product tabs/ProductTabs";
import {
  Autocomplete,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CommonButton from "../../../Componants/Common/Button";
import InputFileUpload from "../../../Componants/Common/Bulk Upload/InputFileUpload";
import Template from "../../../Componants/Common/Bulk Upload/Template";
import activeIcon from "../../../Assests/activeIcon.svg";
import inactiveIcon from "../../../Assests/inactiveIcon.svg";
import editIcon from "../../../Assests/editIcon.svg";
import deleteIcon from "../../../Assests/deleteIcon.svg";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import { fontWeight } from '@mui/system';
import { fetchModelList, fetchSparePartList, getSparePartByModel, mapSparePartToModel } from "../../../API Service/apiService";
import toast from "react-hot-toast";

const callsource = [];

const cells = [
  "Spare Part Name",
  "Spare Part Code",
  "Model Name",
  "Model Code",
  "Action",
];
const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];
const serials = [{ label: "Yes" }, { label: "No" }];
const rows = [
  {
    id: 1,
    brandName: "Nike",
    modelName: "Air Max",
    serialized: "Yes",
    category: "Sports",
    subCategory: "Footwear",
  },
  {
    id: 2,
    brandName: "Adidas",
    modelName: "Ultraboost",
    serialized: "Yes",
    category: "Sports",
    subCategory: "Apparel",
  },
  {
    id: 3,
    brandName: "Apple",
    modelName: "iPhone",
    serialized: "Yes",
    category: "Technology",
    subCategory: "Electronics",
  },
  {
    id: 4,
    brandName: "Coca-Cola",
    modelName: "Coca-Cola Classic",
    serialized: "No",
    category: "Beverage",
    subCategory: "Soft Drinks",
  },
  {
    id: 5,
    brandName: "Samsung",
    modelName: "Galaxy S",
    serialized: "Yes",
    category: "Technology",
    subCategory: "Consumer Electronics",
  },
  {
    id: 6,
    brandName: "Sony",
    modelName: "PlayStation 5",
    serialized: "Yes",
    category: "Technology",
    subCategory: "Electronics",
  },
  {
    id: 7,
    brandName: "Pepsi",
    modelName: "Pepsi Zero Sugar",
    serialized: "No",
    category: "Beverage",
    subCategory: "Soft Drinks",
  },
];

const ManageModel = () => {
 const [modelList,setModelList] = useState([]);
 const [modelName, setModelName] = useState("");
 const [modelId, setModelId] = useState("");
  const [sparePartList, setSparePartList] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [sparePartName, setSparePartName] = useState("");
  const [sparePartId, setSparePartId] = useState("");
  const [selectedSparePartName,setSelectedSparePartName] = useState("");
  const [selectedSparePartId,setSelectedSparePartId] = useState("");
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState("");
  const [selectedCode, setSelectedCode] = useState(null);
  const [relatedCodes, setRelatedCodes] = useState("");
  const [selectedModelCode, setSelectedModelCode] = useState("");
  const [modelCodeOptions, setModelCodeOptions] = useState([]);

  function handleClick() {
    const saveButton = document.getElementById("save-button");
    saveButton.textContent = "Saved";
    saveButton.classList.add("saved");
    alert("Data saved successfully!");
  }
  const handleSearch = () => {
    // logic of search
  };

  const getModelList = async () => {
      try {
        const response = await fetchModelList(); // API call to fetch subcategories
        console.log("Fetched Modellist:", response);
        // Set the subcategory list
        setModelList(response.data.models || []);
      }
      catch (error) {
        console.error("Error fetching Modellist:", error);
      }
    };

  const sparePartByModel = async () => {
    try {
      setLoading(true);
      const response = await getSparePartByModel(); // API call without modelId
      const flatData = response.data.flatMap((item) =>
        item.spareParts.map((sparePart) => ({
          ...sparePart,
          modelName: item.modelName,
          modelCode: item.modelCode,
        }))
      );
      setSpareParts(flatData);
    } catch (error) {
      console.error("Error fetching spare parts:", error);
    } finally {
      setLoading(false);
    }
  };

     const fetchSpareParts = async() => {
        // API call to fetch spare part list
        try {
          setLoading(true);
          const response = await fetchSparePartList();
          setSparePartList(response.data.spareParts);
          setLoading(false);
        }
        catch (error) {
          console.log("Error in fetching spare part list", error);
        }
      };

  useEffect(() => {
    sparePartByModel();
    getModelList();
    fetchSpareParts();
  }, []); 

  document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", handleClick);
  });

  const [value, setValue] = React.useState({});
  
  const handleSubmit = async () =>{
    if(!modelId || !selectedSparePartId ||!modelName)
    {
      alert("Please fill all the fields");
    }
    else{
    try {
      setLoading(true);
      const data= 
        {
          modelId: modelId,
          sparePartId: selectedSparePartId
        }
      const respose = await mapSparePartToModel(data);
      console.log("Mapped data:", respose);
      
      alert("Spare part mapped successfully");
      } catch (error) {
        console.log("Error in mapping spare part to model", error);
    }

    modelId("");
    selectedSparePartId("");
    modelName("");
    setLoading(false);
    }
    };

  return (
    <Grid container>
      <HeaderNavigation value={"Spare Part Mapping"} />
      {/* create Category */}
      <Grid
        container
        sx={{
          background: "#EFF3FE",
          marginLeft: "10px",
          marginTop: "4px",
          marginRight: "10px",
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
          width: "100%",
          borderRadius: "5px",
          padding: "10px",
          fontWeight: 600,
        }}
      >
        <Grid container gap={5}>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              CloseOnSelect
              options={sparePartList}
              getOptionLabel={(option) => option.sparePartName}
              onChange={(event, newValue) => {
                // Update the selected spare part name
                setSelectedSparePartName(newValue ? newValue.sparePartName : "");
                setSelectedSparePartId(newValue ? newValue._id : "");
                // Filter and update related codes based on the selected spare part name
                const filteredCodes = newValue
                  ? sparePartList
                    .filter((item) => item.sparePartName === newValue.sparePartName)
                    .map((item) => ({
                      label: item.sparePartCode,
                      id: item._id,
                    }))
                  : [];
                setRelatedCodes(filteredCodes);
                setSelectedCode(null); // Reset the code selection
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Spare Part Name"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Autocomplete
              id="spare-part-code"
              options={relatedCodes} // Dynamically filtered codes
              getOptionLabel={(option) => option.label}
              value={selectedCode}
              onChange={(event, newValue) => setSelectedCode(newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Spare Part Code"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </Grid>
          <Grid container>
            <Grid item container>
              <h4 sx={{fontWeight:'500', color:'blue'}}>Map With Model</h4>
            </Grid>
            <Grid item>
              <Autocomplete
                id="disable-close-on-select"
                closeOnSelect
                options={modelList}
                getOptionLabel={(option) => option.modelName}
                onChange={(event, newValue) => {
                  // Set the model name and model id when an option is selected
                  setModelName(newValue ? newValue.modelName : "");  // Set the model name
                  setModelId(newValue ? newValue._id : null);        // Set the model id
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Model"
                    variant="standard"
                    style={{ width: "10rem" }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container gap={2} spacing={5} sx={{ marginTop: "1rem" }}>
          <Grid item>
            <CommonButton name={"Cancel"} />
          </Grid>
          <Grid item>
            <CommonButton name={"Save"} handleOnClick={handleSubmit}/>
          </Grid>

          <Grid container></Grid>
        </Grid>
      </Grid>

      {/* Bulk Upload */}
      <Grid
        container
        sx={{
          background: "#EFF3FE",
          marginLeft: "10px",
          marginTop: "4px",
          marginRight: "10px",
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
          width: "100%",
          borderRadius: "5px",
          padding: "10px",
          fontWeight: 600,
        }}
      >
        <Grid container>
          {" "}
          <Typography variant="h6">Bulk Upload</Typography>
        </Grid>
        <Grid container gap={10}>
          <Grid item>
            <InputFileUpload />
          </Grid>
          <Grid item>
            <CommonButton name={"Upload"} />
          </Grid>
          <Grid item sx={{ padding: "1rem" }}>
            <Template label={"Download Template"} />
          </Grid>
          <Grid item sx={{ padding: "1rem" }}>
            <Template label={"Download Reference Code"} />
          </Grid>
        </Grid>
      </Grid>
      {/* Brand list */}
      <Grid
        container
        sx={{
          background: "#EFF3FE",
          marginLeft: "10px",
          marginTop: "4px",
          marginRight: "10px",
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
          width: "100%",
          borderRadius: "5px",
          padding: "10px",
          fontWeight: 600,
        }}
      >
        <Grid item container>
          <Typography variant="h6">List View</Typography>
        </Grid>
        <Grid container gap={5}>
          <Grid item>
            <Autocomplete
              id="model-name"
              options={modelList}
              getOptionLabel={(option) => option.modelName}
              onChange={(event, newValue) => {
                // Set selected model ID and name
                setModelId(newValue ? newValue._id : null);
                setModelName(newValue ? newValue.modelName : "");

                // Filter model codes based on selected model name
                const filteredModelCodes = newValue
                  ? modelList
                    .filter((item) => item.modelName === newValue.modelName)
                    .map((item) => ({ label: item.modelCode, id: item._id }))
                  : [];
                setModelCodeOptions(filteredModelCodes);

                // Clear selected model code
                setSelectedModelCode("");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Model Name"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </Grid>

          {/* Model Code Dropdown */}
          <Grid item>
            <Autocomplete
              id="model-code"
              options={modelCodeOptions} // Dynamically filtered codes
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                // Set selected model code
                setSelectedModelCode(newValue ? newValue.label : "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Model Code"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </Grid>
         
          <Grid item>
            <CommonButton name={"Search"} handleOnClick={handleSearch} />
          </Grid>
        </Grid>

        <Grid container>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {cells.map((cell, index) => (
                    <TableCell
                      key={index}
                      sx={{ color: "white", textAlign: "center" }}
                    >
                      {cell}
                    </TableCell> // Adding a key prop
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {spareParts.map((row, index) => (
                  <TableRow key={index}>
                    {/* Spare Part Name */}
                    <TableCell align="center">{row.sparePartName}</TableCell>

                    {/* Spare Part Code */}
                    <TableCell align="center">{row.sparePartCode}</TableCell>

                    {/* Model Name */}
                    <TableCell align="center">{row.modelName}</TableCell>

                    {/* Model Code */}
                    <TableCell align="center">{row.modelCode}</TableCell>

                    {/* Actions */}
                    <TableCell
                      align="center"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      {/* Activate/Deactivate Button */}
                      <IconButton
                        // onClick={() => handleStatus(row)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={row.status ? activeIcon : inactiveIcon}
                          alt={row.status ? "Active" : "Inactive"}
                          height="20px"
                          width="20px"
                        />
                      </IconButton>

                      {/* Edit Button */}
                      <IconButton
                        // onClick={() =>
                        //   handleEdit(row.sparePartName, row.sparePartCode, row.modelName, row.modelCode)
                        // }
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={editIcon}
                          alt="Edit"
                          height="20px"
                          width="20px"
                        />
                      </IconButton>

                      {/* Delete Button */}
                      <IconButton
                        // onClick={() => handleDelete(row)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          height="20px"
                          width="20px"
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ManageModel;
