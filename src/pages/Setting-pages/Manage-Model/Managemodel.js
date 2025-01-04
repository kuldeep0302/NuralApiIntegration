import React from "react";

import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { createModel, fetchBrandList, fetchCategoryList, fetchSubCategoryList, fetchModelList, updateModelStatus, updateModel } from "../../../API Service/apiService";
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
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../Componants/Loader/Loader";

const cells = ["Brand", "Category", "Sub Category", "Model Name", "Serialized", "Action"];
const serials = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];


const ManageModel = () => {
  const [loading, setLoading] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [modelName, setModelName] = useState("");
  const [modelCode, setModelCode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [isSerialized, setIsSerialized] = useState(true);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [modelList, setModelList] = useState([]);
  const [editIndex, setEditIndex] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [searchActivated, setSearchActivated] = useState(false);
  const [page, setPage] = useState(1);
  const [dataSize, setDataSize] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brandName, setBrandName] = useState("");
  const handleSearch = () => {
    setSearchActivated(true);
  };
  const handleBrandChange = (event, value) => {
    setSelectedBrand(value?.brandName || null);
    setBrandId(value?._id || null);
    const selectedBrandId = value?._id || null; // Assuming `brandList` has `_id` for unique identification
    if (selectedBrandId) {
      const filtered = categoryList.filter(
        (category) => category.brandId === selectedBrandId
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([]);
    }
    setCategoryId(null); // Reset category and subcategory selection
    setFilteredSubCategories([]);
  };

  const handleCategoryChange = (event, value) => {
    const selectedCategoryId = value?._id || null;
    setCategoryId(selectedCategoryId);
    setSelectedCategoryName(value?.categoryName || null);

    if (selectedCategoryId) {
      const filtered = subCategoryList.filter(
        (subCategory) => subCategory.categoryId === selectedCategoryId
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
    setSubCategoryId(null); // Reset subcategory selection
  };

  const handleStatus = async (modelId) => {

    try {
      setLoading(true);
      console.log(`model id is ${modelId}`);
      const response = await updateModelStatus({ modelId: modelId });
      console.log(`status resposne : ${response.data.message}`);
      if (response.status === "success") {
        toast.success("Status Updated Successfully");
      }
      fetchModelList();
    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const getBrandList = async () => {
    try {
      setLoading(true);
      const response = await fetchBrandList();
      //  setTableData(response.data.brandList);
      setBrandList(response.data.brandList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchCategoryList(); // API call
      console.log("Fetched Categories:", response);

      // Set categories from API response
      setCategoryList(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await fetchSubCategoryList(); // API call to fetch subcategories
      console.log("Fetched SubCategories:", response);

      // Set the subcategory list
      setSubCategoryList(response.data.subcategory || []);
    } catch (error) {
      console.error("Error fetching Subcategories:", error);
    }
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



  // Fetch categories when the component loads
  useEffect(() => {
    getModelList();
    fetchSubCategories();
    fetchCategories();
    getBrandList();
  }, []);


  const handleCancel = async () => {
    setBrandId("");
    setCategoryId("");
    setSubCategoryId("");
    setModelName("");
    setModelCode("");
    setHsnCode("");
    setIsSerialized(true);
    setEditIndex(false);

  }
  const handleSave = async () => {
    const requestData = {
      brandId: brandId,
      categoryId: categoryId,
      subcategoryId: subCategoryId,
      modelName: modelName,
      modelCode: modelCode,
      hsnCode: hsnCode,
      isSerialized: isSerialized,
    };




    console.log("Data to post/update:", requestData);
    console.log("Edit Index:", editIndex);
    try {
      if (!editIndex) {
        // Save new model
        const response = await createModel(requestData); // API call to create new model
        console.log("Model saved successfully:", response.data);
        alert("Model saved successfully!");
      } else {
        // Update existing model
        const updateData = { _id: editIndex, active: true, ...requestData };
        console.log("Data to update:", updateData);

        const response = await updateModel(updateData); // API call to update model
        console.log("Model updated successfully:", response.data);
        alert("Model updated successfully!");
        setEditIndex(false); // Reset edit index after updating
      }
    } catch (error) {
      console.error("Error saving/updating model:", error);
      alert("Failed to save or update the model. Please try again.");
    }
    setBrandId("");
    setCategoryId("");
    setSubCategoryId("");
    setModelName("");
    setModelCode("");
    setHsnCode("");
    setIsSerialized(true);
    fetchModelList();
  };

  const handleEdit = (modelId, brandId, brandName, categoryId, categoryName, subcategoryId, subcategoryName, modelName, modelCode, hsnCode, isSerialized) => {
    setBrandName(brandName);
    setSelectedCategoryName(categoryName);
    setSubcategoryName(subcategoryName);
    setEditIndex(modelId);
    setBrandId(brandId);
    setCategoryId(categoryId);
    setSubCategoryId(subcategoryId);
    setModelName(modelName);
    setModelCode(modelCode);
    setHsnCode(hsnCode);
    setIsSerialized(isSerialized);
  };

  return (
    <Grid container>
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      <HeaderNavigation value={"Product > Model"} />
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
        <Grid item container>
          <ProductTabs selectedTab='four' />
        </Grid>

        <Grid container gap={5}>
          <Grid item>
            {!editIndex && (
              <Autocomplete
                id="brand-autocomplete"
                options={brandList}
                getOptionLabel={(option) => option.brandName}
                value={brandList.find((brand) => brand._id === brandId) || null} // Bind value
                onChange={handleBrandChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Brand"
                    variant="standard"
                    style={{ width: "10rem" }}
                  />
                )}
              />
            )}
            {editIndex && (
              <TextField
                disabled
                style={{ width: "90%" }}
                id="standard-basic"
                label="Brand"
                variant="standard"
                value={brandName} // Bind value
              />
            )}
          </Grid>
          <Grid item>
            {!editIndex && (
              <Autocomplete
                id="category-autocomplete"
                options={filteredCategories}
                getOptionLabel={(option) => option.categoryName || ""}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                value={filteredCategories.find((category) => category._id === categoryId) || null} // Bind value
                onChange={handleCategoryChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    variant="standard"
                    style={{ width: "10rem" }}
                  />
                )}
              />
            )}
            {editIndex && (
              <TextField
                disabled
                style={{ width: "90%" }}
                id="standard-basic"
                label="Brand"
                variant="standard"
                value={selectedCategoryName} // Bind value
              />
            )}
          </Grid>
          <Grid item>
            {!editIndex && (
              <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={filteredSubCategories}
                getOptionLabel={(option) => option.subcategoryName}
                value={filteredSubCategories.find((subcat) => subcat._id === subCategoryId) || null} // Bind value
                onChange={(e, val) => {
                  setSubCategoryId(val?._id); // Update state on change
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Sub Category"
                    variant="standard"
                    style={{ width: "11rem" }}
                  />
                )}
              />)}
            {editIndex && (
              <TextField
                disabled
                style={{ width: "90%" }}
                id="standard-basic"
                label="Brand"
                variant="standard"
                value={subcategoryName} // Bind value
              />
            )}
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "90%" }}
              id="standard-basic"
              label="Model Name"
              variant="standard"
              value={modelName} // Bind value
              onChange={(e) => {
                setModelName(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "90%" }}
              id="standard-basic"
              label="Model Code"
              variant="standard"
              value={modelCode} // Bind value
              onChange={(e) => {
                setModelCode(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="HSN Code"
              variant="standard"
              value={hsnCode} // Bind value
              onChange={(e) => {
                setHsnCode(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              CloseOnSelect
              options={serials}
              getOptionLabel={(option) => option.label}
              value={serials.find((option) => option.label === (isSerialized ? "Yes" : "No")) || null} // Bind value
              onChange={(e, val) => {
                setIsSerialized(val?.label === "Yes");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Is Serialized"
                  variant="standard"
                  style={{ width: "11rem" }}
                />
              )}
            />
          </Grid>

        </Grid>
        <Grid container gap={2} spacing={5} sx={{ marginTop: "1rem" }}>
          <Grid item>
            <CommonButton name={"Cancel"} handleOnClick={handleCancel} />
          </Grid>
          <Grid item>
            <CommonButton
              name={editIndex === false ? "Save" : "Update"}
              handleOnClick={handleSave}
            />
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
              id="brand-autocomplete"
              options={brandList}
              getOptionLabel={(option) => option.brandName}
              onChange={handleBrandChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="category-autocomplete"
              options={filteredCategories}
              getOptionLabel={(option) => option.categoryName || ""}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              value={filteredCategories.find((category) => category._id === categoryId) || null} // Bind value
              onChange={handleCategoryChange}

              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={filteredSubCategories}
              getOptionLabel={(option) => option.subcategoryName}
              onChange={(e, val) => {
                setSubCategoryId(val?._id);
                setSubcategoryName(val?.subcategoryName)  // Using val to access the selected option
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Sub Category"
                  variant="standard"
                  style={{ width: "11rem" }}
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
                {modelList.length > 0 ? (
                  modelList
                    .filter((subcategory) => {
                      if (!searchActivated) {
                        return true; // Show all rows if search is not activated
                      }
                      return (

                        (!subcategoryName || subcategory.subcategoryName === subcategoryName) && // Match subcategoryName if provided
                        (!selectedCategory || subcategory.categoryName === selectedCategory) && // Match categoryName if provided
                        (!brandName || subcategory.brandName === brandName)  // Match stateName if provided
                      );
                    })
                    .slice((page - 1) * dataSize, page * dataSize)
                    .map((row, index) => (
                      <TableRow key={row._id}>
                        <TableCell align="center">{row.brandName}</TableCell>
                        <TableCell align="center">{row.categoryName}</TableCell>
                        <TableCell align="center">{row.subcategoryName}</TableCell>
                        <TableCell align="center">{row.modelName}</TableCell>
                        <TableCell align="center">{row.isSerialized ? 'Yes' : 'No'}</TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton
                            onClick={() => handleStatus(row._id)}
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                            }}
                          >
                            <img
                              src={row.active === false ? inactiveIcon : activeIcon}
                              alt="active"
                              height="20px"
                              width="20px"
                            />
                          </IconButton>

                          <IconButton
                            onClick={() => handleEdit(row._id, row.brandId, row.brandName, row.categoryId, row.categoryName, row.subcategoryId, row.subcategoryName, row.modelName, row.modelCode, row.hsnCode, row.isSerialized, row.active)}
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                            }}
                          >
                            <img
                              src={editIcon}
                              alt="Edit"
                              height={"20px"}
                              width={"20px"}
                            />
                          </IconButton>
                          <IconButton
                            // onClick={() => handleStatus(index)}
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                            }}
                          >
                            <img
                              src={deleteIcon}
                              alt="active"
                              height={"20px"}
                              width={"20px"}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ManageModel;
