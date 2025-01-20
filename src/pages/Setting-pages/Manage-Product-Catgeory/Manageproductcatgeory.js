import React from "react";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import { createCategory, deleteCategory, fetchAllCategoryList, fetchBrandList, fetchCategoryList, fetchCategoryList2, updateCategory, updateCategoryStatus } from "../../../API Service/apiService";
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
import Paginate from "../../../Componants/Common/Paginate";
import ExportToExcel from "../../../Componants/Common/ExportToExcel";

const cells = ["S.No", "Brand", "Category", "Description", "Action"];
const categoryheader = [
  { label: "Brand", key: "brandName" },
  { label: "Category", key: "categoryName" },
  { label: "Description", key: "description" },
  { label: "Status", key: "active" },
];

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dataSize, setDataSize] = useState(pageSize);
  const [tableData, setTableData] = useState([]);
  const [filteredCat, setfilteredCat] = useState([]);
  const [searchBrand, setSearchBrand] = useState("");
  const [selectedCategory2, setselectedCategory2] = useState("")
  const [categoryList2, setCategoryList2] = useState([]);
  const [BrandName2, setBrandName2] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchBrand2, setSearchBrand2] = useState(null);
  const [activeBrandList, setActiveBrandList] = useState([]);
  const [brandError, setBrandError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [flag, setFlag] = useState(false);
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

  const fetchCategories = async () => {
    try {
      if (!isSearching || flag) {
      setLoading(true);
      const response = await fetchAllCategoryList(page, limit); // API call
      console.log("Fetched Categories:", response);
      setTableData(response.data.categories);
      setCategoryList(response.data.categories || []);
      setTotalRecords(response.data.totalCategories);
    }} catch (error) {
      console.error("Error fetching categories:", error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [page]);




  const fetchCategories2 = async () => {
    try {
      if (searchBrand2){
      setLoading(true);
      const response = await fetchCategoryList2(searchBrand2,"","",""); // API call
      console.log("Fetched Categories:", response);
      // setTableData(response.data.categories);
      setCategoryList2(response.data.categories);
      // setTotalRecords(response.data.totalCategories);
    } }catch (error) {
      console.error("Error fetching categories:", error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories2();
  }, [searchBrand2]);
  // Fetch categories when the component loads

  

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleEdit = (brandId,brandName, _id, categoryName, description) => {
    setEditIndex(_id);
    setBrandName(brandName)
    setBrandParams(brandId); // Set brand ID
    setCategoryDescription(categoryName); // Set category description
    setDescription(description); // Set description
  };
  const handlecancel = () => {
    setBrandName("");
    setBrandParams("");
    setDescription("");
    setBrandName("")
    setCategoryDescription("");
    setEditIndex(false);
    setSelectedBrand(null);
  };

  const handlePageChange = (newPage) => {
    setIsSearching(false);
    setPage(newPage);
    setParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString()
    }));
  };


  const handleSave = async () => {
    let isValid = true;

    if (!brandParams) {
      setBrandError(true);
      isValid = false;
    } else {
      setBrandError(false);
    }

    if (!categorydescription.trim()) {
      setCategoryError(true);
      isValid = false;
    } else {
      setCategoryError(false);
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
        }

      } catch (error) {
        console.log(`Error updating status ${error}`);
        toast.error(`Failed to update status`);
        throw error;
      } finally {
        if (!isSearching) {
          fetchCategories();
        }
        else {
          // setselstateName2(stateName);
          handleSearch();
        }
      }
      setLoading(false);
      setBrandName("");
      setBrandParams("");
      setDescription("");
      setCategoryDescription("");
      handlecancel();
    }
  };


  const handleSearch = async () => {
    try {
      setLoading(true);
      setPage(1);
      setIsSearching(true);
      const response = await fetchCategoryList(searchBrand2, selectedCategory2, 1, limit);
      setTableData(response.data.categories);
      setTotalRecords(response.data.totalCategories);
      if (totalRecords > 10) {
        setFlag(true);
      }
      // console.log(`response table  is `, response.data.brandList);

    } catch (error) {
      console.log(`Error in filter List`);
    }
    setLoading(false);
  };




  const handleStatus = async (index, categoryId) => {
    try {
      
      setLoading(true);
      console.log(`category id is ${categoryId}`);
      const response = await updateCategoryStatus({ _id: categoryId });
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
        fetchCategories();
      }
      else {
        // setselstateName2(stateName);
        handleSearch();
      }

      setLoading(false);
    }
  };


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
            {!editIndex && (
              <Autocomplete
                id="disable-close-on-select"
                options={activeBrandList}
                getOptionLabel={(option) => option.brandName}
                value={
                  activeBrandList.find((option) => option._id === selectedBrand?._id) ||
                  null
                } // Dynamically set value
                onChange={(event, value) => {
                  setBrandParams(value ? value._id : ""); // Update brand ID
                  setBrandName(value ? value.brandName : ""); // Update brand name
                  setSelectedBrand(value); // Update the selected brand object
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

          <Grid item >
            <TextField
              style={{ width: "100%" }}
              id="category"
              label="Category"
              variant="standard"
              value={categorydescription}
              onChange={(e) => {
                setselectedCategory2(e.target.value)
                setCategoryDescription(e.target.value);
                setCategoryError(false); // Clear error on typing
              }}
              required
              error={categoryError}
              helperText={categoryError ? "Category is required." : ""}
            />
          </Grid>

          <Grid item >
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
              required
              error={descriptionError}
              helperText={descriptionError ? "Description is required." : ""}
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
    id="disable-close-on-select-brand"
    disableCloseOnSelect
    options={brandlist} // Array of brands
    getOptionLabel={(option) => option.brandName || ""}
    onChange={(event, newValue) => {
      // Update the selected brand name
      setBrandName2(newValue ? newValue.brandName : "");
      // Update the selected brand's ID to filter categories
      setSearchBrand2(newValue ? newValue._id : null);

      // Clear the category selection and reset filteredCat when brand is cleared
      if (!newValue) {
        setSelectedCategory(""); // Clear selected category
        setCategoryList2([]); // Optionally reset the category list if needed
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
    id="disable-close-on-select-category"
    disableCloseOnSelect
    options={categoryList2} // Handle null/empty filteredCat gracefully
    getOptionLabel={(option) => option.categoryName || ""}
    value={categoryList2.find((item)=> item.categoryName === selectedCategory2)|| null}
    onChange={(event, newValue) => {
      // If category is cleared, reset the selected category
      if (!newValue) {
        setselectedCategory2(""); // Clear selected category
      } else {
        setselectedCategory2(newValue ? newValue.categoryName : "");
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
            <CommonButton name={"Search"} handleOnClick={handleSearch} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid container justifyContent="flex-end">
          <ExportToExcel
            name="Export to Excel"
            data={tableData}
            // data={formattedData}
            fileName="Category_Data"
            headers={categoryheader}
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
                      {(page - 1) * dataSize + index + 1}
                    </TableCell>
                    <TableCell align="center">{truncateText(row.brandName, 50)}</TableCell>
                    <TableCell align="center">{truncateText(row.categoryName, 50)}</TableCell>
                    <TableCell align="center">{truncateText(row.description,50)}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        onClick={() => handleStatus(index, row._id)}
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
                        onClick={() =>
                          handleEdit(
                            row.brandId,
                            row.brandName,
                            row._id,
                            row.categoryName,
                            row.description,
                          )
                        }
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
                      {/* <IconButton
                        // onClick={() => handleDelete(index, row._id)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={}
                          alt="active"
                          height={"20px"}
                          width={"20px"}
                        />
                      </IconButton> */}
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

export default Manageproductcatgeory;
