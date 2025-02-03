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
    modelId: "", // Example model ID
    noOfServices: 0,
    costOfService: 0,
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
    if (fieldName === "brandId" && !value) {
      setCatDrop([]);
      setSubCatDrop([]);
      setModelDrop([]);
      setFormData((p) => ({
        ...p,
        fieldName: null,
      }));
    }

    if (fieldName === "categoryId" && !value) {
      setSubCatDrop([]);
      setModelDrop([]);
      setFormData((p) => ({
        ...p,
        fieldName: null,
      }));
    }

    if (fieldName === "subcategoryId" && !value) {
      setModelDrop([]);
      setFormData((p) => ({
        ...p,
        fieldName: null,
      }));
    }

    if (fieldName === "brandId" && value) {
      try {
        setLoading(true);
        const response = await fetchCategoryList(
          formData.brandId,
          "",
          1,
          100,
          true
        );
        setCatDrop(response.data.categories);
        // const activeCategories = response.data.categories.filter((category) => category.active);
        // // Update the filtered category list
        // setActiveFilteredCat(activeCategories);
        // console.log(`response table is`, response.data.brandList);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false); // Ensure loading is stopped in all cases
      }
    }

    if (fieldName === "categoryId" && value) {
      try {
        setLoading(true);
        const response = await fetchSubCategoryListActive(
          "",
          1,
          1000,
          formData.brandId,
          formData.categoryId,
          true
        );
        setSubCatDrop(response.data.subcategory);

        // const activeSubCategories = filteredSubCat.filter((subcat) => subcat.active);
        // setActiveFilteredSubCat(activeSubCategories);

        // console.log(`response table is`, response.data.brandList);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false); // Ensure loading is stopped in all cases
      }
    }

    if (fieldName === "subcategoryId" && value) {
      try {
        setLoading(true);
        const response = await fetchModelList(
          "",
          1,
          1000,
          formData.brandId,
          formData.categoryId,
          formData.subcategoryId
        ); // API call to fetch subcategories
        console.log("Fetched Modellist:", response);
        setModelDrop(response.data.models);
      } catch (error) {
        console.error("Error fetching Modellist:", error);
      } finally {
        setLoading(false);
      }
    }

    setFormData({ ...formData, [fieldName]: value });
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
        // const activeCategories = response.data.categories.filter((category) => category.active);
        // // Update the filtered category list
        // setActiveFilteredCat(activeCategories);
        // console.log(`response table is`, response.data.brandList);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false); // Ensure loading is stopped in all cases
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

        // const activeSubCategories = filteredSubCat.filter((subcat) => subcat.active);
        // setActiveFilteredSubCat(activeSubCategories);

        // console.log(`response table is`, response.data.brandList);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false); // Ensure loading is stopped in all cases
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
        ); // API call to fetch subcategories
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

  const handleSubmit = async () => {
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
        setFormData({
          name: "",
          brandId: "",
          categoryId: "",
          subcategoryId: "",
          modelId: "",
          noOfServices: 0,
          costOfService: 0,
          duration: "",
          description: "",
        });
        setAmcId(null);
        setEditIndex(null);
      } catch (error) {
        toast("Amc Add Failed");
      }
    } else {
      try {
        let res = await addAmc(formData);
        toast.success(res.message);
        setFlag(!flag);
        setFormData({
          name: "",
          brandId: "",
          categoryId: "",
          subcategoryId: "",
          modelId: "",
          noOfServices: 0,
          costOfService: 0,
          duration: "",
          description: "",
        });
      } catch (error) {
        toast("Amc Add Failed");
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
    setEditIndex(null);
    setFormData({
      name: "",
      brandId: "",
      categoryId: "",
      subcategoryId: "",
      modelId: "", // Example model ID
      noOfServices: 0,
      costOfService: 0,
      duration: "",
      description: "",
    });
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
        // const activeCategories = response.data.categories.filter((category) => category.active);
        // // Update the filtered category list
        // setActiveFilteredCat(activeCategories);
        // console.log(`response table is`, response.data.brandList);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false); // Ensure loading is stopped in all cases
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

        // const activeSubCategories = filteredSubCat.filter((subcat) => subcat.active);
        // setActiveFilteredSubCat(activeSubCategories);

        // console.log(`response table is`, response.data.brandList);
      } catch (error) {
        console.error(`Error in filter list`, error);
      } finally {
        setLoading(false); // Ensure loading is stopped in all cases
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
        ); // API call to fetch subcategories
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
      modelId: editData.modelId, // Example model ID
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
                ) || ""
              } // Controlled value
              onChange={(event, val) => {
                handleChange("brandId", val._id || "");
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
              options={catDrop}
              value={
                catDrop.find((option) => option._id === formData.categoryId) ||
                ""
              } // Controlled value
              onChange={(event, val) => {
                handleChange("categoryId", val._id || "");
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
              options={subCatDrop}
              value={
                subCatDrop.find(
                  (option) => option._id === formData.subcategoryId
                ) || ""
              } // Controlled value
              onChange={(event, val) => {
                handleChange("subcategoryId", val._id || "");
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

        <div className="line-Amc">
          <div className="textinput-Amc">
            <Autocomplete
              id="brand-autocomplete"
              closeOnSelect
              options={modelDrop}
              value={
                modelDrop.find((option) => option._id === formData.modelId) ||
                ""
              } // Controlled value
              onChange={(event, val) => {
                handleChange("modelId", val._id || "");
              }}
              getOptionLabel={(option) => option.modelName || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Model"
                  variant="standard"
                  style={{ width: "10rem" }}
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
              value={formData.noOfServices}
              onChange={(e) => {
                handleChange("noOfServices", e.target.value);
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
            />
          </div>
          <div className="textinput-Amc">
            <TextField
              type="text"
              label="Duration (in Months)"
              variant="standard"
              value={formData.duration}
              onChange={(e) => {
                handleChange("duration", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="line-Amc">
          <div className="textinput-Amc">
            {/* <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              // defaultValue="Default Value"
            /> */}
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => {
                handleChange("description", e.target.value);
              }}
              sx={{ width: "400px", mb: 2, backgroundColor: "#fff !important" }}
            />
          </div>
        </div>

        <div className="buttons-Amc">
          <span className="buttons-Amc-span">
            <Button
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: "14px",
                minWidth: "100px",
                // width: "auto",
                // height: "38px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#33499F",
                },
                display: "flex",
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
                boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: "14px",
                minWidth: "100px",
                // width: "auto",
                // height: "38px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#33499F",
                },
                display: "flex",
              }}
              variant="contained"
            >
              Clear
            </Button>
          </span>
        </div>
      </div>

      <div className="Secoundtextbox-amc">
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
              } // Controlled value
              onChange={(event, val) => {
                handleSearchChange("brandId", val ? val._id : ""); // Set brandId to empty string if no selection
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
              } // Controlled value
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
              } // Controlled value
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

        {/* <div className="line-Amc"></div> */}

        <div className="buttons-Amc">
          <span className="buttons-Amc-span">
            <Button
              onClick={handleSearch}
              sx={{
                backgroundColor: "#33499F",
                color: "white",
                boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: "14px",
                minWidth: "100px",
                // width: "auto",
                // height: "38px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#33499F",
                },
                display: "flex",
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
                boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: "14px",
                minWidth: "100px",
                // width: "auto",
                // height: "38px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#33499F",
                },
                display: "flex",
              }}
              variant="contained"
            >
              Show All
            </Button>
          </span>
        </div>
        <div className="table-Amc">
          <div className="excelexport-Amc">
            <span className="buttons-Amc-span">
              <ExportToExcel
                name="Export to Excel"
                // data={formattedAMC}
                fileName="AMC_Data"
                // headers={amcHeaders}
              />
            </span>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
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
                {amcs &&
                  amcs.length > 0 &&
                  amcs.map((elem, ind) => {
                    return (
                      <TableRow>
                        <TableCell align="left">
                          {elem.name}
                          {/* {amc.amcName} */}
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
                  })}

                {/* ))} */}
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
