import React, { useEffect, useState } from "react";
import "./Amc.css";
import TextField from "@material-ui/core/TextField";
import {
  Autocomplete,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import CommonButton from "../../../Componants/Common/Button";
import Paginate from "../../../Componants/Common/Paginate";
import ExportToExcel from "../../../Componants/Common/ExportToExcel";
import activeIcon from "../../../Assests/activeIcon.svg";
import inactiveIcon from "../../../Assests/inactiveIcon.svg";
import editIcon from "../../../Assests/editIcon.svg";
import config from "../../../Componants/Common/config";
import {
  addAmc,
  amcStatusUpdate,
  fetchAmcMaster,
  fetchBrandList,
  fetchCategoryList,
  fetchModelList,
  fetchSubCategoryListActive,
  updateAmc,
} from "../../../API Service/apiService";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../Componants/Loader/Loader";
import e from "cors";

// const amcHeaders = [
// { label: "AMC Name", key: "amcName" },
// { label: "Brand", key: "brandName" },
// { label: "Category", key: "categoryName" },
// { label: "Model", key: "modelName" },
// { label: "AMC Cost (INR)", key: "amcCost" }
// { label: "Duration (in Months)", key: "duration" }
// ];

const calltype = [];

const Amc = () => {
  const pageSize = config.pageSize;
  const [editindex, setEditIndex] = useState(null);
  const [amcId, setAmcId] = useState(0);

  //Dropdowms
  const [activeBrandList, setActiveBrandList] = useState([]);
  const [catDrop, setCatDrop] = useState([]);
  const [subCatDrop, setSubCatDrop] = useState([]);
  const [modelDrop, setModelDrop] = useState([]);

  const [activeBrandListSearch, setActiveBrandListSearch] = useState([]);
  const [catDropSearch, setCatDropSearch] = useState([]);
  const [subCatDropSearch, setSubCatDropSearch] = useState([]);
  const [modelDropSearch, setModelDropSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };
  const [dataSize, setDataSize] = useState(pageSize);

  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [flag, setFlag] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brandId: "",
    categoryId: "",
    subcategoryId: "",
    modelId: "",
    noOfServices: "",
    costOfService: "",
    duration: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    brandId: "",
    categoryId: "",
    subcategoryId: "",
    modelId: "",
    noOfServices: "",
    costOfService: "",
    duration: "",
    description: "",
  });

  const [searchParams, setSearchParams] = useState({
    name: "",
    brandId: "",
    categoryId: "",
    subcategoryId: "",
    page: page,
    pageSize: pageSize,
  });

  const [value, setValue] = useState({
    ContactNumber: "",
  });
  const [amcs, setAmcs] = useState([]);

  //  const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedAMCs = amcs.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;

  // const totalItems = amcs.length;

  // const startIndex = (currentPage - 1) * itemsPerPage;

  // const paginatedAMCs = amcs.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );
  // const paginatedCities = filteredCities.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const handlePageChange = (newPage) => {
    setPage(newPage);

    setSearchParams((prevParams) => ({
      ...prevParams,
      page: newPage.toString(),
      pageSize: page,
    }));
  };

  useEffect(() => {
    fetchAMC();
  }, [flag, page]);
  useEffect(() => {
    getBrandList();
  }, []);

  const handleChange = async (fieldName, value) => {
    // Clear error for the field being changed
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: ""
    }));

    // Handle number validations
    if (["noOfServices", "costOfService", "duration"].includes(fieldName)) {
      // Allow empty string or valid numbers
      if (value === "" || value === null) {
        setFormData(prev => ({
          ...prev,
          [fieldName]: ""
        }));
        return;
      }
      
      // Convert to number and validate
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setFormData(prev => ({
          ...prev,
          [fieldName]: numValue
        }));
      }
      return;
    }

    // Handle text fields
    if (fieldName === "name") {
      // Only allow letters, numbers, spaces and basic punctuation
      const nameRegex = /^[a-zA-Z0-9\s\-_.]*$/;
      if (value === "" || nameRegex.test(value)) {
        setFormData(prev => ({
          ...prev,
          [fieldName]: value
        }));
      }
      return;
    }

    // Handle description - no special validation needed
    if (fieldName === "description") {
      setFormData(prev => ({
        ...prev,
        [fieldName]: value
      }));
      return;
    }

    if (fieldName === "brandId" && !value) {
      setCatDrop([]);
      setSubCatDrop([]);
      setModelDrop([]);
      setFormData((p) => ({
        ...p,
        categoryId: "",
        subcategoryId: "",
        modelId: "",
        [fieldName]: value
      }));
    } else if (fieldName === "categoryId" && !value) {
      setSubCatDrop([]);
      setModelDrop([]);
      setFormData((p) => ({
        ...p,
        subcategoryId: "",
        modelId: "",
        [fieldName]: value
      }));
    } else if (fieldName === "subcategoryId" && !value) {
      setModelDrop([]);
      setFormData((p) => ({
        ...p,
        modelId: "",
        [fieldName]: value
      }));
    } else {
      setFormData((p) => ({
        ...p,
        [fieldName]: value
      }));
    }

    // Handle dropdown dependencies
    if (fieldName === "brandId" && value) {
      try {
        setLoading(true);
        const response = await fetchCategoryList(value, "", 1, 100, true);
        setCatDrop(response.data.categories);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false);
      }
    }

    if (fieldName === "categoryId" && value) {
      try {
        setLoading(true);
        const response = await fetchSubCategoryListActive("", 1, 1000, formData.brandId, value, true);
        setSubCatDrop(response.data.subcategory);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false);
      }
    }

    if (fieldName === "subcategoryId" && value) {
      try {
        setLoading(true);
        const response = await fetchModelList("", 1, 1000, formData.brandId, formData.categoryId, value);
        console.log("Fetched Modellist:", response);
        setModelDrop(response.data.models);
      } catch (error) {
        console.error("Error fetching Modellist:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearchChange = async (fieldName, value) => {
    if (fieldName === "brandId" && !value) {
      setCatDropSearch([]);
      setSubCatDropSearch([]);
      setModelDropSearch([]);
      setSearchParams({ ...searchParams, brandId: "" });
    }

    if (fieldName === "categoryId" && !value) {
      setSubCatDropSearch([]);
      setModelDropSearch([]);
      setSearchParams({ ...searchParams, brandId: "", categoryId: "" });
    }

    if (fieldName === "subcategoryId" && !value) {
      setModelDropSearch([]);
      setSearchParams({
        ...searchParams,
        brandId: "",
        categoryId: "",
        subcategoryId: "",
      });
    }

    if (fieldName === "brandId" && value) {
      try {
        setLoading(true);
        const response = await fetchCategoryList(
          searchParams.brandId,
          "",
          1,
          100,
          true
        );
        setCatDropSearch(response.data.categories);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false);
      }
    }

    if (fieldName === "categoryId" && value) {
      try {
        setLoading(true);
        const response = await fetchSubCategoryListActive(
          "",
          1,
          1000,
          searchParams.brandId,
          searchParams.categoryId,
          true
        );
        setSubCatDropSearch(response.data.subcategory);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false);
      }
    }

    if (fieldName === "subcategoryId" && value) {
      try {
        setLoading(true);
        const response = await fetchModelList(
          "",
          1,
          1000,
          searchParams.brandId,
          searchParams.categoryId,
          searchParams.subcategoryId
        );
        console.log("Fetched Modellist:", response);
        setModelDropSearch(response.data.models);
      } catch (error) {
        console.error("Error fetching Modellist:", error);
      } finally {
        setLoading(false);
      }
    }

    setSearchParams({ ...searchParams, [fieldName]: value });
  };

  const handleShowAll = () => {
    setFlag(!flag);
    setPage(1);
    setSearchParams({
      name: "",
      brandId: "",
      categoryId: "",
      subcategoryId: "",
      page: 1,
      pageSize: 10,
    });

    setCatDropSearch([]);
    setSubCatDropSearch([]);
  };
  const getBrandList = async () => {
    try {
      setLoading(true);
      const response = await fetchBrandList();

      const filteredActiveBrands = response.data.brandList.filter(
        (brand) => brand.active === true
      );
      // Set the active brands
      setActiveBrandList(filteredActiveBrands);
      setActiveBrandListSearch(filteredActiveBrands);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchAMC = async () => {
    setLoading(true);

    let body = {
      ...searchParams,
      name: searchParams.name || "",
      brandId: searchParams.brandId || "",
      categoryId: searchParams.categoryId || "",
      subcategoryId: searchParams.subcategoryId || "",
    };

    try {
      let res = await fetchAmcMaster(body);
      setAmcs(res.data.amcs);
      setTotalRecords(res.data.totalAmcs);
      console.log(res.data.amcs);
    } catch (error) {
      toast.error(error.response.data.message);
      setTotalRecords(0);
      setAmcs([]);
      console.log(`Error fetching AMC master: ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (id) => {
    let body = {
      amcId: id,
    };
    setLoading(true);
    try {
      let res = await amcStatusUpdate(body);
      toast.success(res.message);
      setFlag(!flag);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      brandId: "",
      categoryId: "",
      subcategoryId: "",
      modelId: "",
      noOfServices: "",
      costOfService: "",
      duration: "",
      description: "",
    };

    // Validate AMC Name
    if (!formData.name.trim()) {
      errors.name = "AMC Name is required";
      isValid = false;
    }

    // Validate Brand
    if (!formData.brandId) {
      errors.brandId = "Brand is required";
      isValid = false;
    }

    // Validate Category
    if (!formData.categoryId) {
      errors.categoryId = "Category is required";
      isValid = false;
    }

    // Validate Sub Category
    if (!formData.subcategoryId) {
      errors.subcategoryId = "Sub Category is required";
      isValid = false;
    }

    // Validate Model
    if (!formData.modelId) {
      errors.modelId = "Model is required";
      isValid = false;
    }

    // Validate No. of Services
    if (!formData.noOfServices || formData.noOfServices <= 0) {
      errors.noOfServices = "Number of services must be greater than 0";
      isValid = false;
    }

    // Validate AMC Cost
    if (!formData.costOfService || formData.costOfService <= 0) {
      errors.costOfService = "AMC cost must be greater than 0";
      isValid = false;
    }

    // Validate Duration
    if (!formData.duration || formData.duration <= 0) {
      errors.duration = "Duration must be greater than 0";
      isValid = false;
    }

    // Validate Description
    if (!formData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      brandId: "",
      categoryId: "",
      subcategoryId: "",
      modelId: "",
      noOfServices: "",
      costOfService: "",
      duration: "",
      description: "",
    });
    setFormErrors({
      name: "",
      brandId: "",
      categoryId: "",
      subcategoryId: "",
      modelId: "",
      noOfServices: "",
      costOfService: "",
      duration: "",
      description: "",
    });
    setEditIndex(null);
    setAmcId(null);
    setCatDrop([]);
    setSubCatDrop([]);
    setModelDrop([]);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    console.log("FormData", formData);
    if (editindex != null) {
      let body = {
        ...formData,
        amcId: amcId,
      };
      try {
        let res = await updateAmc(body);
        toast.success(res.message);
        setFlag(!flag);
        resetForm();
      } catch (error) {
        toast.error("AMC Update Failed");
      }
    } else {
      try {
        let res = await addAmc(formData);
        toast.success(res.message);
        setFlag(!flag);
        resetForm();
      } catch (error) {
        toast.error("AMC Add Failed");
      }
    }
  };

  const handleSearch = () => {
    console.log("search", searchParams);
    setPage(1);
    setSearchParams((p) => ({
      ...p,
      page: 1,
      pageSize: 10,
    }));
    setFlag(!flag);
  };

  const handleClear = () => {
    resetForm();
  };

  const handleEdit = async (ind) => {
    const editData = amcs[ind];
    setEditIndex(ind);
    console.log(editData);
    setAmcId(editData._id);

    if (editData.brandId) {
      try {
        setLoading(true);
        const response = await fetchCategoryList(
          editData.brandId,
          "",
          1,
          100,
          true
        );
        setCatDrop(response.data.categories);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false);
      }
    }

    if (editData.categoryId) {
      try {
        setLoading(true);
        const response = await fetchSubCategoryListActive(
          "",
          1,
          1000,
          editData.brandId,
          editData.categoryId,
          true
        );
        setSubCatDrop(response.data.subcategory);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false);
      }
    }

    if (editData.subcategoryId) {
      try {
        setLoading(true);
        const response = await fetchModelList(
          "",
          1,
          1000,
          editData.brandId,
          editData.categoryId,
          editData.subcategoryId
        );
        console.log("Fetched Modellist:", response);
        setModelDrop(response.data.models);
      } catch (error) {
        console.error("Error fetching Modellist:", error);
      } finally {
        setLoading(false);
      }
    }

    setFormData({
      name: editData.name,
      brandId: editData.brandId,
      categoryId: editData.categoryId,
      subcategoryId: editData.subcategoryId,
      modelId: editData.modelId,
      noOfServices: editData.noOfServices,
      costOfService: editData.costOfService,
      duration: editData.duration,
      description: editData.description,
    });
  };

  return (
    <>
      <HeaderNavigation value={"AMC > AMC Master"} />
      {loading && <Loader />}
      <Toaster />
      <div className="firsttextbox-amc">
        <div className="line-Amc">
          <div className="textinput-Amc">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="AMC Name"
              variant="standard"
              value={formData.name}
              onChange={(e) => {
                handleChange("name", e.target.value);
              }}
              error={!!formErrors.name}
              helperText={formErrors.name}
              inputProps={{
                maxLength: 100
              }}
            />
          </div>

          <div className="textinput-Amc">
            <Autocomplete
              id="brand-autocomplete"
              closeOnSelect
              options={activeBrandList}
              value={
                activeBrandList.find(
                  (option) => option._id === formData.brandId
                ) || null
              }
              onChange={(event, val) => {
                handleChange("brandId", val?._id || "");
              }}
              getOptionLabel={(option) => option.brandName || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  variant="standard"
                  style={{ width: "10rem" }}
                  error={!!formErrors.brandId}
                  helperText={formErrors.brandId}
                />
              )}
            />
          </div>
          <div className="textinput-Amc">
            <Autocomplete
              id="category-autocomplete"
              closeOnSelect
              options={catDrop}
              value={
                catDrop.find((option) => option._id === formData.categoryId) ||
                null
              }
              onChange={(event, val) => {
                handleChange("categoryId", val?._id || "");
              }}
              getOptionLabel={(option) => option.categoryName || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="standard"
                  style={{ width: "10rem" }}
                  error={!!formErrors.categoryId}
                  helperText={formErrors.categoryId}
                />
              )}
            />
          </div>
          <div className="textinput-Amc">
            <Autocomplete
              id="subcategory-autocomplete"
              closeOnSelect
              options={subCatDrop}
              value={
                subCatDrop.find(
                  (option) => option._id === formData.subcategoryId
                ) || null
              }
              onChange={(event, val) => {
                handleChange("subcategoryId", val?._id || "");
              }}
              getOptionLabel={(option) => option.subcategoryName || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Sub Category"
                  variant="standard"
                  style={{ width: "10rem" }}
                  error={!!formErrors.subcategoryId}
                  helperText={formErrors.subcategoryId}
                />
              )}
            />
          </div>
        </div>

        <div className="line-Amc">
          <div className="textinput-Amc">
            <Autocomplete
              id="model-autocomplete"
              closeOnSelect
              options={modelDrop}
              value={
                modelDrop.find((option) => option._id === formData.modelId) ||
                null
              }
              onChange={(event, val) => {
                handleChange("modelId", val?._id || "");
              }}
              getOptionLabel={(option) => option.modelName || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Model"
                  variant="standard"
                  style={{ width: "10rem" }}
                  error={!!formErrors.modelId}
                  helperText={formErrors.modelId}
                />
              )}
            />
          </div>
          <div className="textinput-Amc">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="No. of Services"
              variant="standard"
              type="number"
              value={formData.noOfServices}
              onChange={(e) => {
                handleChange("noOfServices", e.target.value);
              }}
              error={!!formErrors.noOfServices}
              helperText={formErrors.noOfServices}
              inputProps={{
                min: 0,
                step: 1
              }}
            />
          </div>
          <div className="textinput-Amc">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="AMC Cost (INR)"
              variant="standard"
              type="number"
              value={formData.costOfService}
              onChange={(e) => {
                handleChange("costOfService", e.target.value);
              }}
              error={!!formErrors.costOfService}
              helperText={formErrors.costOfService}
              inputProps={{
                min: 0,
                step: "0.01"
              }}
            />
          </div>
          <div className="textinput-Amc">
            <TextField
              type="number"
              label="Duration (in Months)"
              variant="standard"
              value={formData.duration}
              onChange={(e) => {
                handleChange("duration", e.target.value);
              }}
              error={!!formErrors.duration}
              helperText={formErrors.duration}
              inputProps={{
                min: 0,
                step: 1
              }}
            />
          </div>
        </div>
        <div className="line-Amc">
          <div className="textinput-Amc">
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => {
                handleChange("description", e.target.value);
              }}
              error={!!formErrors.description}
              helperText={formErrors.description}
              sx={{ 
                width: "400px", 
                mb: 2, 
                backgroundColor: "#fff !important",
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: formErrors.description ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: formErrors.description ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: formErrors.description ? '#d32f2f' : '#1976d2',
                  },
                }
              }}
              inputProps={{
                maxLength: 500
              }}
            />
          </div>
        </div>

        <div className="buttons-Amc" style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px',marginBottom: "10px" }}>
          <Button
            onClick={handleSubmit}

            sx={{
              backgroundColor: "#33499F",
              color: "white",
              boxShadow: "4px 2px 4px rgb(110, 142, 237)",
              fontSize: "14px",
              minWidth: "100px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#33499F",
              },
            }}
            variant="contained"
          >
            {editindex == null ? "Create" : "Update"}
          </Button>

          <Button
            onClick={handleClear}
            sx={{
              backgroundColor: "#33499F",
              color: "white",
              boxShadow: "4px 2px 4px rgb(110, 142, 237)",
              fontSize: "14px",
              minWidth: "100px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#33499F",
              },
            }}
            variant="contained"
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="Secoundtextbox-amc" style={{ marginBottom: "20px" }}>
        <div className="line-Amc">
          <div className="textinput-Amc">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="AMC Name"
              variant="standard"
              value={searchParams.name}
              onChange={(e) => {
                handleSearchChange("name", e.target.value);
              }}
            />
          </div>

          <div className="textinput-Amc">
            <Autocomplete
              id="brand-autocomplete"
              closeOnSelect
              options={activeBrandListSearch}
              value={
                activeBrandListSearch.find(
                  (option) => option._id === searchParams.brandId
                ) || null
              }
              onChange={(event, val) => {
                handleSearchChange("brandId", val ? val._id : "");
              }}
              getOptionLabel={(option) => option.brandName || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </div>
          <div className="textinput-Amc">
            <Autocomplete
              id="brand-autocomplete"
              closeOnSelect
              options={catDropSearch}
              value={
                catDropSearch.find(
                  (option) => option._id === searchParams.categoryId
                ) || null
              }
              onChange={(event, val) => {
                handleSearchChange("categoryId", val._id);
              }}
              getOptionLabel={(option) => option.categoryName || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </div>
          <div className="textinput-Amc">
            <Autocomplete
              id="brand-autocomplete"
              closeOnSelect
              options={subCatDropSearch}
              value={
                subCatDropSearch.find(
                  (option) => option._id === searchParams.subcategoryId
                ) || ""
              }
              onChange={(event, val) => {
                handleSearchChange("subcategoryId", val._id);
              }}
              getOptionLabel={(option) => option.subcategoryName || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Sub Category"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </div>
        </div>

        <div className="buttons-Amc" style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
          <Button
            onClick={handleSearch}
            sx={{
              backgroundColor: "#33499F",
              color: "white",
              boxShadow: "4px 2px 4px rgb(110, 142, 237)",
              fontSize: "14px",
              minWidth: "100px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#33499F",
              },
            }}
            variant="contained"
          >
            Search
          </Button>
          <Button
            onClick={handleShowAll}
            sx={{
              backgroundColor: "#33499F",
              color: "white",
              boxShadow: "4px 2px 4px rgb(110, 142, 237)",
              fontSize: "14px",
              minWidth: "100px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#33499F",
              },
            }}
            variant="contained"
          >
            Show All
          </Button>
        </div>
        <div className="table-Amc">
          <div className="excelexport-Amc">
            <span className="buttons-Amc-span">
              <ExportToExcel
                name="Export to Excel"
                fileName="AMC_Data"
              />
            </span>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    S.No.
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left">
                    AMC Name
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Brand
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Category
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Model
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    AMC Cost (INR)
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Duration (in Months)
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {amcs && amcs.length > 0 ? (
                  amcs.map((elem, ind) => {
                    return (
                      <TableRow key={elem._id}>
                        <TableCell align="center">{ind + 1 + (page - 1) * pageSize}</TableCell>
                        <TableCell align="left">
                          {elem.name}
                        </TableCell>
                        <TableCell align="center">
                          {elem?.brandDetails?.[0]?.brandName || "--"}
                        </TableCell>
                        <TableCell align="center">
                          {elem?.categoryDetails?.[0]?.categoryName || "--"}
                        </TableCell>
                        <TableCell align="center">
                          {elem?.modelDetails?.[0]?.modelName || "--"}
                        </TableCell>
                        <TableCell align="center">
                          {elem.costOfService || "--"}
                        </TableCell>
                        <TableCell align="center">
                          {elem.duration || "--"}
                        </TableCell>
                        <TableCell
                          align=""
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                            }}
                          >
                            <img
                              onClick={() => handleStatusChange(elem._id)}
                              src={
                                elem.active === false
                                  ? inactiveIcon
                                  : activeIcon
                              }
                              alt="active"
                              height="20px"
                              width="20px"
                            />
                          </IconButton>

                          <IconButton
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                            }}
                          >
                            <img
                              onClick={() => handleEdit(ind)}
                              src={editIcon}
                              alt="Edit"
                              height={"20px"}
                              width={"20px"}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="pagination-container">
          <Paginate
            page={page}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            dataSize={dataSize}
          />
        </div>
      </div>
    </>
  );
};

export default Amc;
