import React from "react";

import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { createModel, fetchBrandList, fetchCategoryList, fetchSubCategoryList, fetchModelList, updateModelStatus, updateModel, fetchSubCategoryListActive, filterHsnCode } from "../../../API Service/apiService";
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
import ExportToExcel from "../../../Componants/Common/ExportToExcel";

const cells = ["S.No", "Brand", "Category", "Sub Category", "Model Name", "Serialized", "Action"];
const serials = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];
const modelheader = [
  { label: "Brand", key: "brandName" },
  { label: "Category", key: "categoryName" },
  { label: "Sub Category", key: "subcategoryName" },
  { label: "Model Name", key: "modelName" },
  { label: "Serialized", key: "isSerialized" },
  { label: "Status", key: "active" },
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
  const [subcategoryId, setSubCategoryId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [modelList, setModelList] = useState([]);
  const [editIndex, setEditIndex] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [searchActivated, setSearchActivated] = useState(false);
  const [page, setPage] = useState(1);
  const [dataSize, setDataSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const [limit, setLimit] = useState(10);
  const [brandName, setBrandName] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [filteredCat, setfilteredCat] = useState([]);
  const [filteredSubCat, setfilteredSubCat] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [filteredMod, setFilteredMod] = useState([]);
  const [selectedCategory2, setselectedCategory2] = useState(null);
  const [selectedBrandId2, setselectedBrandId2] = useState(null);
  const [filteredCat2, setfilteredCat2] = useState([]);
  const [brandName2, setBrandName2] = useState(null);
  const [categoryId2, setCategoryId2] = useState(null);
  const [subcategoryName2, setSubcategoryName2] = useState(null);
  const [filteredSubCat2, setfilteredSubCat2] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [subcategoryId2, setSubcategoryId2] = useState(null);
  const [modelName2, setModelName2] = useState(null);
  const [activeBrandList, setActiveBrandList] = useState([]);
  const [brandError, setBrandError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState(false);
  const [modelNameError, setModelNameError] = useState(false);
  const [modelCodeError, setModelCodeError] = useState(false);
  const [hsnCodeError, setHsnCodeError] = useState(false);
  const [activeFilteredCat, setActiveFilteredCat] = useState([]);
  const [activeFilteredSubCat, setActiveFilteredSubCat] = useState([]);
  const [status, setStatus] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(null);
  const [hsnCodes, setHsnCodes] = useState([]);
  const dummyGetList = {
    serialNo: "",
    brandName: "",
    categoryName: "",
    description: "",
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const [searchParams, setParams] = useState({
    ...dummyGetList
  });
  const handlePageChange = (newPage) => {
    setIsSearching(false);
    setPage(newPage);
    setParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString()
    }));
  };

  const getBrandList = async () => {
    try {
      setLoading(true);
      const response = await fetchBrandList();
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


  const fetchHsnCodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await filterHsnCode(); // Call the API
      setHsnCodes(data.taxes); // Use `data.taxes` from API response
      console.log(data.taxes);
    } catch (err) {
      setError("Failed to fetch HSN codes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHsnCodes();
  }, []);

  const handleFetchCategories = async () => {
    if (selectedBrandId && !isEditing) { // Only proceed if selectedBrand has a value
      try {
        setLoading(true);
        const response = await fetchCategoryList(selectedBrandId, selectedCategory, 1, limit, status);
        setfilteredCat(response.data.categories);
        // const activeCategories = response.data.categories.filter((category) => category.active);
        // // Update the filtered category list
        // setActiveFilteredCat(activeCategories);
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
        const response = await fetchCategoryList(selectedBrandId2, "", 1, limit);
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


  const handleFetchSubCategories = async () => {
    if (categoryId && !isEditing) { // Only proceed if selectedBrand has a value
      try {
        setLoading(true);
        const response = await fetchSubCategoryListActive(subcategoryName, 1, limit, selectedBrandId, categoryId, status);
        setfilteredSubCat(response.data.subcategory);
        
        // const activeSubCategories = filteredSubCat.filter((subcat) => subcat.active);
        // setActiveFilteredSubCat(activeSubCategories);

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
    handleFetchSubCategories();
  }, [categoryId]);

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
  

  const handleSearch = async () => {
    try {
      setLoading(true);
      setPage(1);
      setIsSearching(true);
      const response = await fetchModelList(modelName2, 1, limit, selectedBrandId2, categoryId2, subcategoryId2);
      setTableData(response.data.models);
      setTotalRecords(response.data.totalModels);
      if (totalRecords > 10) {
        setFlag(true);
      }
      // console.log(`response table  is `, response.data.brandList);

    } catch (error) {
      console.log(`Error in filter List`);
    }
    setLoading(false);
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
      
    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
    } finally {
      if (!isSearching) {
        getAllModelList();
      }
      else {
        // setselstateName2(stateName);
        handleSearch();
      }

      setLoading(false);
    }
  };

  const getAllModelList = async () => {
    try {
      if (!isSearching || flag) {
      setLoading(true);
      const response = await fetchModelList("", page, limit); // API call to fetch subcategories
      console.log("Fetched Modellist:", response);
      setModelList(response.data.models || []);
      setTotalRecords(response.data.totalModels);
      setTableData(response.data.models);
    }}
    catch (error) {
      console.error("Error fetching Modellist:", error);
    }
    setLoading(false);
  };

  const handlemodelfetch = async () => {
    try {
      if (subcategoryId2)
      { 
      setLoading(true);
      const response = await fetchModelList(modelName, 1, limit, selectedBrandId2, categoryId2, subcategoryId2); // API call to fetch subcategories
      console.log("Fetched Modellist:", response);
      setFilteredMod(response.data.models || []);
      console.log("filtered models are", filteredMod)
      if (modelName) {
      setTotalRecords(response.data.totalModels);
      setTableData(response.data.models);}
      }}
    catch (error) {
      console.error("Error fetching Modellist:", error);
    }
    setLoading(false);
  };


  useEffect(() => {
    handlemodelfetch();
  }, [subcategoryId2]);

  // Fetch categories when the component loads


  useEffect(() => {
    getAllModelList();
  }, [page]);


  const handleCancel = async () => {
    setBrandId(null);
    setBrandName("");
    setSubcategoryName("")
    setSelectedBrandId("")
    setSelectedCategory(null);
    setCategoryId("");
    setSelectedBrand(null);
    setSubCategoryId(null);
    setModelName("");
    setModelCode("");
    setHsnCode("");
    setIsSerialized(true);
    setEditIndex(false);

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

    if (!subcategoryId) {
      setSubCategoryError(true);
      isValid = false;
    } else {
      setSubCategoryError(false);
    }

    if (!modelName) {
      setModelNameError(true);
      isValid = false;
    } else {
      setModelNameError(false);
    }

    if (!modelCode) {
      setModelCodeError(true);
      isValid = false;
    } else {
      setModelCodeError(false);
    }

    if (!hsnCode) {
      setHsnCodeError(true);
      isValid = false;
    } else {
      setHsnCodeError(false);
    }

    if (!isValid) {
      toast.error("Please fill all the fields");
      return;
    }
    else {
      const requestData = {
        brandId: selectedBrandId,
        categoryId: categoryId,
        subcategoryId: subcategoryId,
        modelName: modelName,
        modelCode: modelCode,
        hsnCode: hsnCode.hsnCode,
        isSerialized: isSerialized,
      };
      console.log("Data to post/update:", requestData);
      console.log("Edit Index:", editIndex);
      try {
        setLoading(true);
        if (!editIndex) {
          // Save new model
          const response = await createModel(requestData); // API call to create new model
          console.log("Model saved successfully:", response.data);
          toast.success("Model saved successfully!");
        } else {
          // Update existing model
          const updateData = { _id: editIndex, active: true, ...requestData };
          console.log("Data to update:", updateData);

          const response = await updateModel(updateData); // API call to update model
          console.log("Model updated successfully:", response.data);
          toast.success("Model saved successfully!");
          setEditIndex(false); // Reset edit index after updating
        }
      } catch (error) {
        console.log(`Error updating status ${error}`);
        toast.error(`Failed to update status`);
        throw error;
      } finally {
        if (!isSearching) {
          getAllModelList();
        }
        else {
          // setselstateName2(stateName);
          handleSearch();
        }
      }
    handleCancel();
    setIsEditing(false);
    setLoading(false);
    }
  };

  const handleEdit = (modelId, brandId, brandName, categoryId, categoryName, subcategoryId, subcategoryName, modelName, modelCode, hsnCode, isSerialized) => {
    setIsEditing(true);
    setBrandName(brandName);
    setSelectedCategoryName(categoryName);
    setSubcategoryName(subcategoryName);
    setEditIndex(modelId);
    setSelectedBrandId(brandId);
    setCategoryId(categoryId);
    setSubCategoryId(subcategoryId);
    setModelName(modelName);
    setModelCode(modelCode);
    const selectedHsnObject = hsnCodes.find((code) => code.hsnCode === hsnCode);
    setHsnCode(selectedHsnObject || null); // Set the entire object or null if not found
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
        {/* {brandId}{categoryId}{subcategoryId} {modelName} {modelCode} {hsnCode.hsncode} {isSerialized? "true" :"false"} */}
        <Grid container gap={5}>
          <Grid item>
            {!editIndex && (
              <Autocomplete
                id="brand-autocomplete"
                closeOnSelect
                options={activeBrandList}
                value={selectedBrand} // Controlled value
                getOptionLabel={(option) => option.brandName || ""}
                onChange={(event, value) => {
                  const brandId = value?._id || null;
                  setSelectedBrand(value); // Update selected brand state
                  setBrandName(value ? value.brandName : "");
                  setSelectedBrandId(brandId);
                  setBrandError(false); // Clear error on selection
                  setIsEditing(false);
                  if (!value) {
                    setSelectedCategory("");
                    setCategoryId("");
                    setSubcategoryName("");
                    setSubCategoryId("");
                    setfilteredSubCat([]);
                    setfilteredCat([]);
                  }
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
                options={filteredCat}
                value={selectedCategory} // Controlled value
                getOptionLabel={(option) => option.categoryName || ""}
                onChange={(event, newValue) => {
                  setSelectedCategory(newValue); // Update selected category state
                  setSelectedCategoryName(newValue ? newValue.categoryName: "")
                  setCategoryId(newValue ? newValue._id : "");
                  setCategoryError(false); // Clear error on selection

                  if (!newValue) {
                    setSubcategoryName("");
                    setSubCategoryId("");
                    setfilteredSubCat([]);
                  }
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
                style={{ width: "90%" }}
                id="standard-basic"
                label="Category"
                variant="standard"
                value={selectedCategoryName} // Bind value
              />
            )}
          </Grid>

          <Grid item>
            {!editIndex && (
              <Autocomplete
                options={filteredSubCat}
                value={subcategoryName} // Controlled value
                getOptionLabel={(option) => option.subcategoryName || ""}
                onChange={(event, newValue) => {
                  setSubcategoryName(newValue );
                  setSubCategoryId(newValue ? newValue._id : "");
                  setSubCategoryError(false); // Clear error on selection
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="SubCategory"
                    variant="standard"
                    style={{ width: "10rem" }}
                    error={subCategoryError}
                    helperText={subCategoryError ? "SubCategory is required." : ""}
                  />
                )}
              />
            )}
            {editIndex && (
              <TextField
                disabled
                style={{ width: "90%" }}
                id="standard-basic"
                label="SubCategory"
                variant="standard"
                value={subcategoryName} // Bind value
              />
            )}
          </Grid>

          <Grid item>
            <TextField
              style={{ width: "90%" }}
              id="model-name"
              label="Model Name"
              variant="standard"
              value={modelName}
              focused={!!editIndex}
              onChange={(e) => {
                if(categoryId2 && subcategoryId2){
                setModelName2(e.target.value);}
                setModelName(e.target.value);
                setModelNameError(false); // Clear error on input
              }}
              error={modelNameError}
              helperText={modelNameError ? "Model Name is required." : ""}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "90%" }}
              id="model-code"
              label="Model Code"
              variant="standard"
              value={modelCode}
              onChange={(e) => {
                setModelCode(e.target.value);
                setModelCodeError(false); // Clear error on input
              }}
              error={modelCodeError}
              helperText={modelCodeError ? "Model Code is required." : ""}
            />
          </Grid>
          <Grid item>
            
            <Autocomplete
              options={hsnCodes}
              getOptionLabel={(option) => option.hsnCode || ""} // Display the HSN Code in the dropdown
              value={hsnCodes.find((code) => code.hsnCode === hsnCode?.hsnCode) || null} // Match the object
              onChange={(event, value) => {
                setHsnCode(value); // Set the full object
                setHsnCodeError(false); // Clear error if any
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ width: "11rem" }}
                  label="HSN Code"
                  variant="standard"
                  error={hsnCodeError}
                  helperText={hsnCodeError ? "HSN Code is required." : ""}
                />
              )}
            />
          
           
            
          </Grid>
          {/* {hsnCode ? hsnCode.hsnCode : "No HSN Code selected"} */}

       

          {/* <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="hsn-code"
              label="HSN Code"
              variant="standard"
              value={hsnCode}
              onChange={(e) => {
                setHsnCode(e.target.value);
                setHsnCodeError(false); // Clear error on input
              }}
              error={hsnCodeError}
              helperText={hsnCodeError ? "HSN Code is required." : ""}
            />
          </Grid> */}
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
                            setSubcategoryId2(null);
                            setSubcategoryName2(null);
                            setModelName2(null);
                            setfilteredSubCat2([]);
                            setfilteredCat2([]);
                            setFilteredMod([]);
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
                            setSubcategoryId2(null);
                            setSubcategoryName2(null);
                            setModelName2(null);
                            setfilteredCat2([])
                            setfilteredSubCat2([]);
                            setFilteredMod([]);
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
                          const selectedSubcategoryId = newValue ? newValue._id : "";
                          setSubcategoryName2(selectedSubcategoryName); // Use the setter function to update the state
                          setSubcategoryId2(selectedSubcategoryId);

                          if(!newValue)
                          {
                            setfilteredSubCat2([]);
                            setModelName2(null);
                            setFilteredMod([]);
                          }
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
            <Autocomplete
              options={filteredMod}
              getOptionLabel={(option) => option.modelName || ""}
              value={filteredMod.find((mod) => mod.modelName === modelName2) || null} // Set the value correctly
              onChange={(event, newValue) => {
                setModelName2(newValue ? newValue.modelName : "");
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
          <Grid item>
            <CommonButton name={"Search"} handleOnClick={handleSearch} />
          </Grid>
        </Grid>

        <Grid container>
          <Grid container justifyContent="flex-end">
            <ExportToExcel
              name="Export to Excel"
              data={tableData}
              // data={formattedData}
              fileName="Model_Data"
              headers={modelheader}
            />
          </Grid>
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
                    <TableCell align="center">{truncateText(row.brandName, 50)}</TableCell>
                    <TableCell align="center">{truncateText(row.categoryName, 50)}</TableCell>
                    <TableCell align="center">{truncateText(row.subcategoryName, 50)}</TableCell>
                    <TableCell align="center">{truncateText(row.modelName, 50)}</TableCell>
                    <TableCell align="center">{row.isSerialized ? 'Yes' : 'No'}</TableCell>
                    <TableCell
                      align=""
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

export default ManageModel;
