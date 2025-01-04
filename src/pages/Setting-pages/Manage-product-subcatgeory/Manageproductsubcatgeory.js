import React from "react";

import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import{useEffect, useState} from "react";
import { fetchBrandList, fetchCategoryList , createSubCategory, fetchSubCategoryList, updateSubCategoryStatus, updateSubCategory} from "../../../API Service/apiService";

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
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../Componants/Loader/Loader";
const callsource = [];

const cells = ["S.No","Brand", "Category","Sub Category", "Description", "Action"];

const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];
const rows = [
    {
      id: 1,
      brandName: "Nike",
      description: "Leading global brand known for sports footwear and apparel.",
      category: "Sports",
      subCategory: "Footwear", // Added subcategory
    },
    {
      id: 2,
      brandName: "Adidas",
      description: "Innovative sports brand focused on performance and style.",
      category: "Sports",
      subCategory: "Apparel", // Added subcategory
    },
    {
      id: 3,
      brandName: "Apple",
      description: "Technology giant known for its innovative electronics and software.",
      category: "Technology",
      subCategory: "Electronics", // Added subcategory
    },
    {
      id: 4,
      brandName: "Coca-Cola",
      description: "World's largest beverage company, famous for its soft drinks.",
      category: "Beverage",
      subCategory: "Soft Drinks", // Added subcategory
    },
    {
      id: 5,
      brandName: "Samsung",
      description: "Leading manufacturer of electronics, including smartphones and TVs.",
      category: "Technology",
      subCategory: "Consumer Electronics", // Added subcategory
    },
  ];
  
const Manageproductsubcatgeory = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandParams, setBrandParams] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [brandName, setBrandName] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [editIndex, setEditIndex] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchActivated, setSearchActivated] = useState(false);
  const [page, setPage] = useState(1);
  const [dataSize, setDataSize] = useState(100);
  const [categoryName, setcategoryName] = useState("");

  // When a brand is selected, filter categories
  const handleBrandChange = (event, value) => {
    setBrandName(value ? value.brandName : "");
    const brandId = value?._id || null; // Get the selected brand's ID
    setSelectedBrandId(brandId);

    // Filter the categories based on the selected brandId
    const filtered = categoryList.filter((category) => category.brandId === brandId);
    setFilteredCategories(filtered);
  };

  // Fetch all categories on component load
  useEffect(() => {
    setFilteredCategories(categoryList); // Show all categories initially
  }, [categoryList]);
  function handleClick() {
    const saveButton = document.getElementById("save-button");
    
    saveButton.textContent = "Saved";
    saveButton.classList.add("saved");
    alert("Data saved successfully!");
  }
  const handleSearch = () => {
    setSearchActivated(true);
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

  const   handleStatus = async (subcategoryId) => {
    try {
      setLoading(true);
      console.log(`subcategoryId id is ${subcategoryId}`);
      const response = await updateSubCategoryStatus({ subcategoryId: subcategoryId });
      console.log(`status resposne : ${response.data.message}`);

      if (response.status === 200) {
        toast.success("Status Updated Successfully");
      } else {
        toast.error("Failed to update status. Please try again.");
      }
      fetchSubCategories();
    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
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

    
  
      // Fetch categories when the component loads
      useEffect(() => {
        fetchSubCategories();
        fetchCategories();
        getBrandList();
      }, []);

  document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", handleClick);
  });

  const handleEdit = (_id, brandId,brandName, categoryId, categoryName, subcategoryName, description) => {
    setEditIndex(_id)
    setBrandName(brandName)
    setcategoryName(categoryName)
    setSelectedBrandId(brandId)
    setCategoryId(categoryId)
    setSubCategory(subcategoryName)
    setDescription(description)
  }

  const handleCancel = () => {
    setEditIndex(false)
    setBrandName("")
    setcategoryName("")
    setSelectedBrandId("")
    setCategoryId("")
    setSubCategory("")
    setDescription("")
  }
  const handleSave = async () => {
    const requestData = {
      brandId: selectedBrandId, // Selected brand's ID
      categoryId: categoryId,   // Selected category's ID
      subcategoryName: subCategory,
      description: description, // Subcategory description
      active: true,             // Set subcategory as active by default
    };

    console.log("Request Data:", requestData);

    try {
      if (!editIndex) {
        // Save a new subcategory
        const response = await createSubCategory(requestData);
        console.log("Server Response (Save):", response); // Log full server response
        console.log("Sub-Category saved successfully:", response.data);
        alert("Sub-Category saved successfully!");
      } else {
        // Update an existing subcategory
        const updateData = { ...requestData, _id: editIndex };
        console.log("Data to update:", updateData);

        const response = await updateSubCategory(updateData); // Call update API
        console.log("Server Response (Update):", response); // Log full server response
        console.log("Sub-Category updated successfully:", response.data);
        alert("Sub-Category updated successfully!");
        setEditIndex(false);
        fetchSubCategories(); // Fetch the updated subcategory list
      }
    } catch (error) {
      console.error("Error saving/updating subcategory:", error);
      if (error.response) {
        // Print server response error if available
        console.error("Server Response (Error):", error.response);
        console.error("Server Response Data:", error.response.data);
        alert(`Failed to save or update subcategory: ${error.response.data.message || "Unknown error"}`);
      } else {
        alert("Failed to save or update subcategory. Please try again.");
      }
    }

    setLoading(false);
    setBrandName("");
    setDescription("");
    setSubCategory("");
    getBrandList();
    fetchCategories();
    fetchSubCategories(); // Fetch the updated subcategory list
  };

  

  const [value, setValue] = React.useState({});

  return (
    <Grid container>
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      <HeaderNavigation value={"Product > Sub Category"} />
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
          <ProductTabs selectedTab='three' />
        </Grid>

        <Grid container spacing={10}>
          
          <Grid item>
            {!editIndex && (
            <Autocomplete
              id="brand-autocomplete"
              CloseOnSelect
              options={brandList}
              getOptionLabel={(option) => option.brandName}
              onChange={handleBrandChange} // Handle brand selection
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
            {editIndex &&(
            <TextField
            disabled
              value={brandName}
              label="Brand"
              variant="standard"
              style={{ width: "10rem" }}
            />
            )}
          </Grid>
          <Grid item>
            {!editIndex && (
            <Autocomplete
              id="category-autocomplete"
              CloseOnSelect
              options={filteredCategories} // Use the filtered category list
              getOptionLabel={(option) => option.categoryName || ""}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(event, value) => {
                const selectedCategoryId = value?._id || null; // Get the selected category's ID
                console.log("Selected Category ID:", selectedCategoryId); // Log the ID
                setCategoryId(selectedCategoryId); // Set the ID to state
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
            )}
            {editIndex &&(
            <TextField
            disabled
              value={categoryName}
              label="Category"
              variant="standard"
              style={{ width: "10rem" }}
            />
            )}
            
          </Grid>
         <Grid item>
                     <TextField
                       style={{ width: "100%" }}
                       id="standard-basic"
                       label="Sub-Category"
                       variant="standard"
                       value={subCategory}
                       onChange={(e, val) => {
                         setSubCategory(e.target.value);
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
            <CommonButton name={"Cancel"}  handleOnClick={handleCancel}/>
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
            {/* <Autocomplete
              id="disable-close-on-select"
              CloseOnSelect
              options={brandList}
              getOptionLabel={(option) => option.brandName}
              onChange={(event, newValue) => {
                // Update the selected brand name
                setBrandName(newValue ? newValue.brandName : "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            /> */}
            <Autocomplete
              id="brand-autocomplete"
              CloseOnSelect
              options={brandList}
              getOptionLabel={(option) => option.brandName}
              onChange={handleBrandChange} // Handle brand selection
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
            {/* <Autocomplete
              id="disable-close-on-select"
              CloseOnSelect
              options={categoryList}
              getOptionLabel={(option) => option.categoryName}
              onChange={(event, newValue) => {
                setSelectedCategory(newValue ? newValue.categoryName : "");
              }
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            /> */}
            
              <Autocomplete
                id="category-autocomplete"
                options={filteredCategories} // Use the filtered category list
                getOptionLabel={(option) => option.categoryName || ""}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                onChange={(event, value) => {
                  const selectedCategoryId = value?._id || null; // Get the selected category's ID
                  console.log("Selected Category ID:", selectedCategoryId); // Log the ID
                  setCategoryId(selectedCategoryId); // Set the ID to state
                  setSelectedCategory(selectedCategoryId ? value.categoryName : "");
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
              <Autocomplete
                id="subcategory-autocomplete"
                options={
                  categoryId // Only filter if a category is selected
                    ? subCategoryList.filter((subCategory) => subCategory.categoryId === categoryId)
                    : [] // Show an empty list if no category is selected
                }
                getOptionLabel={(option) => option.subcategoryName || ""} // Display `subcategoryName`
                isOptionEqualToValue={(option, value) => option._id === value._id}
                onChange={(event, newValue) => {
                  setSelectedSubCategory(newValue ? newValue.subcategoryName : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sub Category"
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
               {subCategoryList.length > 0 ? (
                                 subCategoryList
                                   .filter((subcategory) => {
                                     if (!searchActivated) {
                                       return true; // Show all rows if search is not activated
                                     }
                                     return (
                                      
                                        (!selectedSubCategory || subcategory.subcategoryName === selectedSubCategory) && // Match subcategoryName if provided
                                       (!selectedCategory || subcategory.categoryName === selectedCategory) && // Match categoryName if provided
                                       (!brandName || subcategory.brandName === brandName)  // Match stateName if provided
                                     );
                                   })
                                   .slice((page - 1) * dataSize, page * dataSize)
                                   .map((subcategory, index) => (
                                     <TableRow key={subcategory._id}>
                                       <TableCell align="center">
                                         {(page - 1) * dataSize + index + 1} {/* Index adjusted for pagination */}
                                       </TableCell>
                    <TableCell align="center">{subcategory.brandName}</TableCell>
                    <TableCell align="center">{subcategory.categoryName}</TableCell>
                    <TableCell align="center">{subcategory.subcategoryName}</TableCell>
                    <TableCell align="center">{subcategory.description}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        onClick={() => handleStatus(subcategory._id)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={subcategory.active === false ? inactiveIcon : activeIcon}
                          alt="active"
                          height="20px"
                          width="20px"
                        />
                      </IconButton>

                      <IconButton
                                           onClick={() => handleEdit(subcategory._id, subcategory.brandId, subcategory.brandName, subcategory.categoryId, subcategory.categoryName, subcategory.subcategoryName, subcategory.description)}
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

export default Manageproductsubcatgeory;
