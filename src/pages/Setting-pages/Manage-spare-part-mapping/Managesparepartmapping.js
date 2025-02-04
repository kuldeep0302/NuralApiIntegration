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
import { fontWeight } from "@mui/system";
import {
  fetchModelList,
  fetchSparePartList,
  getSparePartByModel,
  getSparePartByModelToggle,
  mapSparePartToModel,
} from "../../../API Service/apiService";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../Componants/Loader/Loader";
import Paginate from "../../../Componants/Common/Paginate";
import config from "../../../Componants/Common/config";

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
  const pageSize = config.pageSize;

  const [modelList, setModelList] = useState([]);
  const [modelName, setModelName] = useState("");
  const [modelId, setModelId] = useState("");
  const [sparePartList, setSparePartList] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [sparePartName, setSparePartName] = useState("");
  const [sparePartId, setSparePartId] = useState("");
  const [dataSize, setDataSize] = useState(pageSize);
  const [totalRecords, setTotalRecords] = useState(1);
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedSparePartName, setSelectedSparePartName] = useState("");
  const [selectedSparePartId, setSelectedSparePartId] = useState("");
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState("");
  const [selectedCode, setSelectedCode] = useState(null);
  const [relatedCodes, setRelatedCodes] = useState("");
  const [selectedModelCode, setSelectedModelCode] = useState("");
  const [modelCodeOptions, setModelCodeOptions] = useState([]);
  const [selectedCode2, setSelectedCode2] = useState([]);
  const [searchParams, setSearchParams] = useState({
    modelId: "",
    modelCode: "",
    page: page,
    pageSize: pageSize,
  });
  const [errors, setErrors] = useState({
    sparePartName: false,
    sparePartCode: false,
    modelName: false
  });
  const [errorMessages, setErrorMessages] = useState({
    sparePartName: "",
    sparePartCode: "",
    modelName: ""
  });

  function handleClick() {
    const saveButton = document.getElementById("save-button");
    saveButton.textContent = "Saved";
    saveButton.classList.add("saved");
    alert("Data saved successfully!");
  }

  useEffect(() => {
    getModelList();
    fetchSpareParts();
  }, []);

  useEffect(() => {
    sparePartByModel();
  }, [page, flag]);

  const handleSearch = () => {
    setPage(1);
    setSearchParams(prev => ({
      ...prev,
      page: 1,
      pageSize: pageSize
    }));
    setFlag(!flag);
  };

  const handleCancelSearch = () => {
    setPage(1);
    setSearchParams({
      modelId: "",
      modelCode: "",
      page: 1,
      pageSize: pageSize
    });
    setFlag(!flag);
  };

  const getModelList = async () => {
    try {
      const response = await fetchModelList(); // API call to fetch subcategories
      console.log("Fetched Modellist:", response);
      // Set the subcategory list
      setModelList(response.data.models || []);
    } catch (error) {
      console.error("Error fetching Modellist:", error);
    }
  };

  const sparePartByModel = async () => {
    let params = {
      ...searchParams,
      modelId: searchParams.modelId || "",
      page: page,
      pageSize: pageSize,
    };

    try {
      setLoading(true);
      const response = await getSparePartByModel(params);
      if (response.data && response.data[0]) {
        setSpareParts(response.data[0].data || []);
        setTotalRecords(response.data[0].totalCount || 0);
        // Reset page if current page is greater than total pages
        const totalPages = Math.ceil((response.data[0].totalCount || 0) / pageSize);
        if (page > totalPages) {
          setPage(1);
          setSearchParams(prev => ({...prev, page: 1}));
        }
      } else {
        setSpareParts([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.error("Error fetching spare parts:", error);
      setSpareParts([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpareParts = async () => {
    // API call to fetch spare part list
    try {
      setLoading(true);
      const response = await fetchSparePartList();
      setSparePartList(response.data.spareParts);
      console.log(response.data.spareParts);
      setLoading(false);
    } catch (error) {
      console.log("Error in fetching spare part list", error);
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", handleClick);
  });

  const [value, setValue] = React.useState({});

  const validateFields = () => {
    const newErrors = {
      sparePartName: !selectedSparePartId,
      sparePartCode: !selectedCode2 || selectedCode2.length === 0,
      modelName: !modelId
    };

    const newErrorMessages = {
      sparePartName: !selectedSparePartId ? "Please select a spare part" : "",
      sparePartCode: !selectedCode2 ? "Please select a spare part code" :
        selectedCode2.length === 0 ? "Spare part code is required" : "",
      modelName: !modelId ? "Please select a model" : ""
    };

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async () => {
    try {
      if (!validateFields()) {
        return;
      }

      setLoading(true);
      const data = {
        modelId: modelId,
        sparePartId: selectedSparePartId,
      };

      const response = await mapSparePartToModel(data);
      console.log("Mapped data:", response);

      toast.success("Spare part mapped successfully");
      fetchSpareParts();

      // Reset form and errors
      handleCancel();

    } catch (error) {
      console.log("Error in mapping spare part to model", error);
      toast.error(error.response?.data?.message || "Failed to map spare part to model");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setModelId("");
    setSelectedSparePartId("");
    setSelectedSparePartName("");
    setModelName("");
    setSelectedCode2("");
    // Reset errors
    setErrors({
      sparePartName: false,
      sparePartCode: false,
      modelName: false
    });
    setErrorMessages({
      sparePartName: "",
      sparePartCode: "",
      modelName: ""
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams(prev => ({
      ...prev,
      page: newPage,
      pageSize: pageSize
    }));
  };

  const handleSearchChange = (fieldName, value) => {
    setSearchParams((p) => ({
      ...p,
      [fieldName]: value,
    }));
  };

  const handleStatus = async (row) => {
    try {
      const response = await getSparePartByModelToggle(row.modelSparePartsId);
      console.log("Status updated:", response);
      sparePartByModel();
    } catch (error) {
      console.log("Error in updating status:", error);
    }
  }


  return (
    <Grid container>
      <HeaderNavigation value={"Spare Part Mapping"} />
      {/* create Category */}
      <Toaster />
      {loading && <Loader />}
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
              value={sparePartList.find((option) => option._id === selectedSparePartId) || null}
              onChange={(event, newValue) => {
                setSelectedSparePartName(newValue ? newValue.sparePartName : "");
                setSelectedSparePartId(newValue ? newValue._id : null);
                // Reset spare part code when spare part name changes
                setSelectedCode2(null);
                const filteredCodes = newValue
                  ? sparePartList
                    .filter((item) => item.sparePartName === newValue.sparePartName)
                    .map((item) => ({
                      label: item.sparePartCode,
                      id: item._id,
                    }))
                  : [];
                setRelatedCodes(filteredCodes);
                setSelectedCode(null);
                // Clear error when value is selected
                setErrors(prev => ({
                  ...prev,
                  sparePartName: false,
                  sparePartCode: false // Reset spare part code error
                }));
                setErrorMessages(prev => ({
                  ...prev,
                  sparePartName: "",
                  sparePartCode: "" // Reset spare part code error message
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Spare Part Name"
                  variant="standard"
                  style={{ width: "10rem" }}
                  error={errors.sparePartName}
                  helperText={errorMessages.sparePartName}
                  required
                />
              )}
            />
          </Grid>

          <Grid item>
            <Autocomplete
              id="spare-part-code"
              options={sparePartList}
              getOptionLabel={(option) => option.sparePartCode}
              value={sparePartList.find((option) => option._id === selectedCode2) || null}
              onChange={(event, newValue) => {
                setSelectedCode2(newValue ? newValue._id : null);
                // Clear error when value is selected
                setErrors(prev => ({ ...prev, sparePartCode: false }));
                setErrorMessages(prev => ({ ...prev, sparePartCode: "" }));
              }}
              disabled={!selectedSparePartId} // Disable if no spare part name is selected
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Spare Part Code"
                  variant="standard"
                  style={{ width: "10rem" }}
                  error={errors.sparePartCode}
                  helperText={errorMessages.sparePartCode}
                  required
                />
              )}
            />
          </Grid>
          <Grid container>
            <Grid item container>
              <h4 sx={{ fontWeight: "500", color: "blue" }}>Map With Model</h4>
            </Grid>
            <Grid item>
              <Autocomplete
                id="disable-close-on-select"
                closeOnSelect
                options={modelList}
                value={modelList.find((option) => option._id === modelId) || null}
                getOptionLabel={(option) => option.modelName}
                onChange={(event, newValue) => {
                  setModelName(newValue ? newValue.modelName : "");
                  setModelId(newValue ? newValue._id : null);
                  // Clear error when value is selected
                  setErrors(prev => ({ ...prev, modelName: false }));
                  setErrorMessages(prev => ({ ...prev, modelName: "" }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Model"
                    variant="standard"
                    style={{ width: "10rem" }}
                    error={errors.modelName}
                    helperText={errorMessages.modelName}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container gap={2} spacing={5} sx={{ marginTop: "1rem" }}>
          <Grid item>
            <CommonButton name={"Cancel"} handleOnClick={handleCancel} />
          </Grid>
          <Grid item>
            <CommonButton name={"Save"} handleOnClick={handleSubmit} />
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
              value={
                modelList.find(
                  (option) => option._id === searchParams.modelId
                ) || null
              }
              getOptionLabel={(option) => option.modelName}
              onChange={(event, newValue) => {
                // Set selected model ID and name
                handleSearchChange("modelId", newValue._id || "");
                // Filter model codes based on selected model name
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
              options={modelList}
              value={
                modelList.find(
                  (option) => option._id === searchParams.modelCode
                ) || null
              }
              getOptionLabel={(option) => option.modelCode}
              onChange={(event, newValue) => {
                // Set selected model ID and name
                // handleSearchChange("modelId", newValue._id || "");
                handleSearchChange("modelCode", newValue._id || "");

                // Filter model codes based on selected model name
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

          <Grid item >
            <CommonButton name={"Search"} handleOnClick={handleSearch} />
          </Grid>
          <Grid  >
            <CommonButton
              name={"Show All"}
              handleOnClick={handleCancelSearch}
            />
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
                {spareParts && spareParts.map((row, index) => (
                  <TableRow key={index}>
                    {/* Spare Part Name */}
                    <TableCell align="center">{row.spareParts[0].sparePartName}</TableCell>

                    {/* Spare Part Code */}
                    <TableCell align="center">{row.spareParts[0].sparePartCode}</TableCell>

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
                        onClick={() => handleStatus(row)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={row.status === "active" ? activeIcon : inactiveIcon}
                          alt={row.status === "active" ? "Active" : "Inactive"}
                          height="20px"
                          width="20px"

                        />
                      </IconButton>

                      {/* Edit Button */}
                      {/* <IconButton
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
                      </IconButton> */}

                      {/* Delete Button */}

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Paginate
            page={page}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            dataSize={pageSize}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ManageModel;
