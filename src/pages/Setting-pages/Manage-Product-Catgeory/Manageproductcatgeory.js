import React from "react";

import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { createCategory, deleteCategory, fetchBrandList, fetchCategoryList, updateCategory, updateCategoryStatus } from "../../../API Service/apiService";
import ProductTabs from "../../../Componants/Common/product tabs/ProductTabs";

import config from "../../../Componants/Common/config";
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


const callsource = [];


const cells = ["S.No","Brand", "Category", "Description", "Action"];



const Manageproductcatgeory = () => {
  
  const [brandName, setBrandName] = useState("");
  const [brandParams, setBrandParams] = useState("");
  const [brandlist, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [description, setDescription] = useState("");
  const [categorydescription, setCategoryDescription] = useState("");
  
  const [loading, setLoading] = useState(false);
  
  const [editIndex, setEditIndex] = useState(false);
  const pageSize = config.pageSize;
  const [page, setPage] = useState(1);
  const [dataSize, setDataSize] = useState(100);
  const [searchActivated, setSearchActivated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const dummyGetList = {
    serialNo: "",
    brandName: "",
    categoryName: "",
    description: "",
  };
  const [searchParams, setParams] = useState({
    ...dummyGetList
  });
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
      setLoading(true);
      const response = await fetchCategoryList(); // API call
      console.log("Fetched Categories:", response);

      // Set categories from API response
      setCategoryList(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    finally {
      setLoading(false);
    }
  };

  // Fetch categories when the component loads




  useEffect(() => {
    fetchCategories();
    getBrandList();
  }, []);
  const handleEdit = (brandId, brandName, _id, categoryName, description) => {
    setEditIndex(_id);
    setSelectedBrand({ _id: brandId, brandName }); // Fallback for custom values
    setBrandParams(brandId); // Set brand ID
    setCategoryDescription(categoryName); // Set category description
    setDescription(description); // Set description
  };

  const handlecancel = () => {
    setBrandName("");
    setBrandParams("");
    setDescription("");
    setCategoryDescription("");
    setEditIndex(false);
    setSelectedBrand(null);
  };

  const handleSave = async () => {
    const requestData = {
      brandId: brandParams, // Assuming this is the selected brand's ID
      categoryName: categorydescription, // Use category description as category name
      description: description, // Category description
    };
    try {
      setLoading(true);

      if (!editIndex) {
        const response = await createCategory(requestData);
        toast.success(response.message);
        console.log("response is ", response.message);
      } else {
        const dataToUpdate = {
          _id: editIndex,
          brandId: brandParams,
          categoryName: categorydescription,
          description: description,
        };
        console.log("data to update is ", dataToUpdate);
        const response = await updateCategory(dataToUpdate);
        toast.success(response.message);
        console.log("response is ", response.message);
        setEditIndex(false);
        fetchCategories();
      }
     
    } catch (error) {
      console.log(`Error saving Brand ${error}`);
    } finally {
      
    }
    setLoading(false);
    setBrandName("");
    setBrandParams("");
    setDescription("");
    setCategoryDescription("");
    getBrandList();
    fetchCategories();
  };

  function handleClick() {
    const saveButton = document.getElementById("save-button");
    saveButton.textContent = "Saved";
    saveButton.classList.add("saved");
    alert("Data saved successfully!");
  }
  const handleSearch = () => {
    setSearchActivated(true);
  };
  
  const handleStatus = async (index,categoryId) => {
    
    try {
      setLoading();
      console.log(`category id is ${categoryId}`);
      const response = await updateCategoryStatus({ _id: categoryId });
      console.log(`status resposne : ${response.data.message}`);
      if (response.status === "success") {
        toast.success("Status Updated Successfully");
        fetchCategories();
      }
      fetchCategories();
    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async ( categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      console.log("response is ", response.message);
      alert("Category deleted successfully!");
      // Refresh the brand list directly from the backend after deletion
      getBrandList();
    } catch (error) {
      console.log(`Error deleting category ${error}`);
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", handleClick);
  });

  return (

    <Grid container>
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      <HeaderNavigation value={"Product > Category"} />
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
          <ProductTabs selectedTab="two" />
        </Grid>

        <Grid container spacing={10}>
          <Grid item>
            
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={brandlist}
              getOptionLabel={(option) => option.brandName}
              value={brandlist.find((option) => option._id === selectedBrand?._id) || null} // Dynamically set value
              onChange={(event, value) => {
                setBrandParams(value ? value._id : ""); // Update brand ID
                setBrandName(value ? value.brandName : ""); // Update brand name
                setSelectedBrand(value); // Update the selected brand object
              }}
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
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Category"
              variant="standard"
              value={categorydescription}
              onChange={(e, val) => {
                setCategoryDescription(e.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Description"
              variant="standard"
              value={description}
              onChange={(e, val) => {
                setDescription(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container gap={2} spacing={5} sx={{ marginTop: "1rem" }}>
          <Grid item>
            <CommonButton name={"Cancel"} handleOnClick={handlecancel} />
          </Grid>
          <Grid item>
            <CommonButton
              name={editIndex === false ? "Save" : "Update"}
              handleOnClick={handleSave}
            />
          </Grid>
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
              id="disable-close-on-select"
              disableCloseOnSelect
              options={brandlist}
              getOptionLabel={(option) => option.brandName}
              onChange={(event, newValue) => {
                // Update the selected brand name
                setBrandName(newValue ? newValue.brandName : "");
                // Update the selected brand's ID to filter categories
                setSelectedBrand(newValue ? newValue._id : null);
              }}
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
              disableCloseOnSelect
              options={
                selectedBrand
                  ? categoryList.filter((category) => category.brandId === selectedBrand)
                  : [] // Filter categories based on the selected brand's ID
              }
              getOptionLabel={(option) => option.categoryName || ""} // Display categoryName
              isOptionEqualToValue={(option, value) => option._id === value._id} // Match by unique _id
              onChange={(event, newValue) => {
                setSelectedCategory(newValue ? newValue.categoryName : "");
              }}
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
            <CommonButton name={"Search"} handleOnClick={handleSearch}/>
          </Grid>
        </Grid>

        <Grid container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
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
                {categoryList.length > 0 ? (
                  categoryList
                    .filter((category) => {
                      if (!searchActivated) {
                        return true; // Show all rows if search is not activated
                      }
                      return (
                        (!selectedCategory || category.categoryName === selectedCategory) && // Match categoryName if provided
                        (!brandName || category.brandName === brandName)  // Match stateName if provided
                      );
                    })
                    .slice((page - 1) * dataSize, page * dataSize)
                    .map((category, index) => (
                      <TableRow key={category._id}>
                        <TableCell align="center">
                          {(page - 1) * dataSize + index + 1} {/* Index adjusted for pagination */}
                        </TableCell>
                    <TableCell align="center">{category.brandName}</TableCell>
                    <TableCell align="center">{category.categoryName}</TableCell>
                    <TableCell align="center">{category.description}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        onClick={() => handleStatus(index,category._id)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={category.active === false ? inactiveIcon : activeIcon}
                          alt="active"
                          height="20px"
                          width="20px"
                        />
                      </IconButton>

                      <IconButton
                        onClick={() => handleEdit( category.brandId,category.brandName, category._id, category.categoryName, category.description)}
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
                        onClick={() => handleDelete( category._id)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img src={deleteIcon} alt="active" height={"20px"} width={"20px"} />
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

export default Manageproductcatgeory;
