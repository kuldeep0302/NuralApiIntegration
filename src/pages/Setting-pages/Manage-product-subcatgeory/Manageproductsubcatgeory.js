import React from "react";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { fetchBrandList, fetchCategoryList, createSubCategory, fetchSubCategoryList, updateSubCategoryStatus, updateSubCategory } from "../../../API Service/apiService";
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
import Paginate from "../../../Componants/Common/Paginate";
const cells = ["S.No", "Brand", "Category", "Sub Category", "Description", "Action"];


const Manageproductsubcatgeory = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [brandName, setBrandName] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [editIndex, setEditIndex] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [dataSize, setDataSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(null);
  const [categoryName, setcategoryName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [filteredCat, setfilteredCat] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [filteredSubCat, setfilteredSubCat] = useState([]);
  const [selectedCategory2, setselectedCategory2] = useState(null);
  const [selectedBrandId2, setselectedBrandId2] = useState(null);
  const [filteredCat2, setfilteredCat2] = useState([]);
  const [brandName2, setBrandName2] = useState(null);
  const [categoryId2, setCategoryId2] = useState(null);
  const [subcategoryName2, setSubcategoryName2] = useState(null);
  const [filteredSubCat2, setfilteredSubCat2] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeBrandList, setActiveBrandList] = useState([]);
  const [brandError, setBrandError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [activeFilteredCat, setActiveFilteredCat] = useState([]);
  const [status, setStatus] = useState("true")
  const dummyGetList = {
    serialNo: "",
    brandName: "",
    categoryName: "",
    description: "",
  };
  const [searchParams, setParams] = useState({
    ...dummyGetList
  });


  const handlePageChange = (newPage) => {
    setPage(newPage);
    setParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString()
    }));
  };
  // When a brand is selected, filter categories

  const handleSearch = async () => {
    try {
      setLoading(true)
      const response = await fetchSubCategoryList(subcategoryName2, 1, limit, selectedBrandId2, categoryId2);
      setTableData(response.data.subcategory);
      setTotalRecords(response.data.totalSubcategories);
      // console.log(`response table  is `, response.data.brandList);

    } catch (error) {
      console.log(`Error in filter List`);
    }
    setLoading(false);
  };


  const getBrandList = async () => {
    try {
      setLoading(true);
      const response = await fetchBrandList();
      //  setTableData(response.data.brandList);
      setBrandList(response.data.brandList);
      setBrandList(response.data.brandList);
      const filteredActiveBrands = response.data.brandList.filter(
        (brand) => brand.active === true
      );
      // Set the active brands
      setActiveBrandList(filteredActiveBrands);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrandList();
  }, []);

  const handleFetchCategories = async () => {
    if (selectedBrandId && !isEditing) { // Only proceed if selectedBrand has a value
      try {
        setLoading(true);
        const response = await fetchCategoryList(selectedBrandId, selectedCategory, 1, limit, status);
        setfilteredCat(response.data.categories);
        const activeCategories = response.data.categories.filter((category) => category.active);

        // Update the filtered category list
        setActiveFilteredCat(activeCategories);
        // console.log(`response table is`, response.data.brandList);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false); // Ensure loading is stopped in all cases
      }
    } else {
      console.log('Selected brand is not set. Skipping fetch.');
    }
  };
  useEffect(() => {
    handleFetchCategories();
  }, [selectedBrandId]);


  const handleFetchCategories2 = async () => {
    if (selectedBrandId2) {
      try {
        console.log('Fetching categories with:', { selectedBrandId2, selectedCategory2 });
        setLoading(true);
        const response = await fetchCategoryList(selectedBrandId2, selectedCategory2, 1, limit);
        if (response.data && response.data.categories) {
          setfilteredCat2(response.data.categories);
        } else {
          console.warn('No categories found');
          setfilteredCat2([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Selected brand is not set. Skipping fetch.');
    }
  };
  useEffect(() => {
    handleFetchCategories2();
  }, [selectedBrandId2]);



  // const handleFetchSubCategories = async () => {
  //   if (categoryId) { // Only proceed if selectedBrand has a value
  //     try {
  //       setLoading(true);
  //       const response = await fetchSubCategoryList(subcategoryName, 1, limit, selectedBrandId, categoryId);
  //       setfilteredSubCat(response.data.subcategory);
  //       // console.log(`response table is`, response.data.brandList);
  //     } catch (error) {
  //       console.error(`Error in filter list`, error);
  //     } finally {
  //       setLoading(false); // Ensure loading is stopped in all cases
  //     }
  //   } else {
  //     console.log('Selected brand is not set. Skipping fetch.');
  //   }
  // };
  // useEffect(() => {
  //   handleFetchSubCategories();
  // }, [categoryId]);


  const handleFetchSubCategories2 = async () => {
    if (categoryId2) {
      try {
        console.log('Fetching subcategories with:', { categoryId2, subcategoryName, selectedBrandId2 });
        setLoading(true);
        const response = await fetchSubCategoryList(subcategoryName, 1, limit, selectedBrandId2, categoryId2);
        if (response.data && response.data.subcategory) {
          setfilteredSubCat2(response.data.subcategory);
        } else {
          console.warn('No subcategories found');
          setfilteredSubCat2([]);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Category ID is not set. Skipping fetch.');
    }
  };

  useEffect(() => {
    handleFetchSubCategories2();
  }, [categoryId2]);


  const handleStatus = async (subcategoryId) => {
    try {
      setLoading(true);
      console.log(`subcategoryId id is ${subcategoryId}`);
      const response = await updateSubCategoryStatus({ subcategoryId: subcategoryId });
      console.log(`status resposne : ${response.data.message}`);
      toast.success("Status Updated Successfully");
    } catch (error) {
      console.log(`Error updating status ${error}`)
      toast.error(`Failed to update status`);
    }
    handleSearch();
    setLoading(false);
  };

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const response = await fetchSubCategoryList(subcategoryName, page, limit); // API call to fetch subcategories
      console.log("Fetched SubCategories:", response);
      setSubCategoryList(response.data.subcategory || []);
      setTableData(response.data.subcategory);
      setTotalRecords(response.data.totalSubcategories);
    } catch (error) {
      console.error("Error fetching Subcategories:", error);
    }
    setLoading(false);
  };


  useEffect(() => {
    fetchSubCategories();
  }, [page]);



  const handleEdit = (_id, brandId, brandName, categoryId, categoryName, subcategoryName, description) => {
    setIsEditing(true);
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
    let isValid = true;

    if (!selectedBrandId) {
      setBrandError(true);
      isValid = false;
    } else {
      setBrandError(false);
    }

    if (!categoryId) {
      setCategoryError(true);
      isValid = false;
    } else {
      setCategoryError(false);
    }

    if (!subCategory.trim()) {
      setSubCategoryError(true);
      isValid = false;
    } else {
      setSubCategoryError(false);
    }

    if (!description.trim()) {
      setDescriptionError(true);
      isValid = false;
    } else {
      setDescriptionError(false);
    }

    if (!isValid) {
      toast.error("Please fill all the fields");
      return;
    }
    else {
      const requestData = {
        brandId: selectedBrandId, // Selected brand's ID
        categoryId: categoryId,   // Selected category's ID
        subcategoryName: subCategory,
        description: description, // Subcategory description
        active: true,             // Set subcategory as active by default
      };

      console.log("Request Data:", requestData);

      try {
        setLoading(true);
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
      fetchSubCategories(); // Fetch the updated subcategory list
    }
    setIsEditing(false);
    setLoading(false);
  };

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
                closeOnSelect
                options={activeBrandList}
                getOptionLabel={(option) => option.brandName}
                value={brandName ? { brandName } : null} // Controlled value for Brand
                onChange={(event, value) => {
                  const brandId = value?._id || null;
                  const brandName = value ? value.brandName : "";

                  // Update brand-related states
                  setBrandName(brandName);
                  setSelectedBrandId(brandId);

                  // Clear dependent fields if Brand is cleared
                  if (!value) {
                    setSelectedCategory("");
                    setCategoryId("");
                  }
                  setBrandError(false); // Clear error on selection
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Brand"
                    variant="standard"
                    style={{ width: "10rem" }}
                    error={brandError}
                    helperText={brandError ? "Brand is required." : ""}
                  />
                )}
              />
            )}
            {editIndex && (
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
                options={filteredCat}
                getOptionLabel={(option) => option.categoryName || ""}
                value={selectedCategory ? { categoryName: selectedCategory } : null} // Controlled value for Category
                onChange={(event, newValue) => {
                  const categoryName = newValue ? newValue.categoryName : "";
                  const categoryId = newValue ? newValue._id : "";

                  // Update Category-related states
                  setSelectedCategory(categoryName);
                  setCategoryId(categoryId);

                  // Clear Sub-Category if Category is cleared
                  if (!newValue) {
                    setSubCategory("");
                  }
                  setCategoryError(false); // Clear error on selection
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    variant="standard"
                    style={{ width: "10rem" }}
                    error={categoryError}
                    helperText={categoryError ? "Category is required." : ""}
                  />
                )}
              />
            )}
            {editIndex && (
              <TextField
                disabled
                value={selectedCategory}
                label="Category"
                variant="standard"
                style={{ width: "10rem" }}
              />
            )}
          </Grid>

          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="sub-category"
              label="Sub-Category"
              variant="standard"
              value={subCategory}
              onChange={(e) => {
                setSubCategory(e.target.value);
                setSubCategoryError(false); // Clear error on typing
              }}
              error={subCategoryError}
              helperText={subCategoryError ? "Sub-Category is required." : ""}
            />
          </Grid>

          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="description"
              label="Description"
              variant="standard"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionError(false); // Clear error on typing
              }}
              error={descriptionError}
              helperText={descriptionError ? "Description is required." : ""}
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
              closeOnSelect
              options={brandList}
              getOptionLabel={(option) => option.brandName}
              value={brandName2 ? { brandName:brandName2 } : null} // Controlled value for Brand
              onChange={(event, value) => {
                const brandId = value?._id || null;
                const brandName = value ? value.brandName : "";

                // Update brand-related states
                setBrandName2(brandName);
                setselectedBrandId2(brandId);

                // Clear dependent fields if Brand is cleared
                if (!value) {
                  setselectedCategory2("");
                  setselectedBrandId2("")
                  setCategoryId2("");
                  setSubcategoryName2("");
                }
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
              options={filteredCat2}
              getOptionLabel={(option) => option.categoryName || ""}
              value={selectedCategory2 ? { categoryName: selectedCategory2 } : null} // Controlled value for Category
              onChange={(event, newValue) => {
                const categoryName = newValue ? newValue.categoryName : "";
                const categoryId = newValue ? newValue._id : "";

                // Update Category-related states
                setselectedCategory2(categoryName);
                setCategoryId2(categoryId);

                // Clear Sub-Category if Category is cleared
                if (!newValue) {
                  setSubcategoryName2("");
                }
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
              options={filteredSubCat2}
              getOptionLabel={(option) => option.subcategoryName || ""} // Display the subcategory name
              value={
                filteredSubCat2.find((item) => item.subcategoryName === subcategoryName2) || null
              } // Ensure the value matches an object from options
              onChange={(event, newValue) => {
                // Update Sub-Category-related state
                const selectedSubcategoryName = newValue ? newValue.subcategoryName : "";
                setSubcategoryName2(selectedSubcategoryName); // Use the setter function to update the state
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Subcategory"
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
                      sx={{
                        color: "white",
                        textAlign:
                          index === cells.length - 1 ? "right" : "center",
                        paddingRight: index === cells.length - 1 ? "4rem" : "",
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {(page - 1) * dataSize + index + 1} {/* Index adjusted for pagination */}
                    </TableCell>
                    <TableCell align="center">{row.brandName}</TableCell>
                    <TableCell align="center">{row.categoryName}</TableCell>
                    <TableCell align="center">{row.subcategoryName}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
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
                        onClick={() => handleEdit(row._id, row.brandId, row.brandName, row.categoryId, row.categoryName, row.subcategoryName, row.description)}
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
                        // onClick={() => handleDelete(index, row._id)}
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Paginate
          page={page}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
          dataSize={dataSize}
        />
      </Grid>
    </Grid>
  );
};

export default Manageproductsubcatgeory;
