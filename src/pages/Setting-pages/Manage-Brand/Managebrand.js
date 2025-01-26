// @collaps
import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
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
import ExportToExcel from "../../../Componants/Common/ExportToExcel";
import {
  createBrand,
  deleteBrand,
  fetchAllBrandList,
  fetchBrandList,
  fetchLimitedBrandList,
  updateBrand,
  updateBrandStatus,
} from "../../../API Service/apiService";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../Componants/Loader/Loader";
import Paginate from "../../../Componants/Common/Paginate";
import { width } from "@mui/system";
// import { fetchBrandList } from "../../../API Service/apiService";

const cells = ["S.No","Brand", "Description", "Action"];


const Managebrand = () => {
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const pageSize = config.pageSize;
  const [dataSize, setDataSize] = useState(pageSize);
  const [brandName, setBrandName] = useState("");
  const [brandParams, setBrandParams] = useState("");
  const [brandlist, setBrandList] = useState([]);
  const [allBrandList, setAllBrandList] = useState([]);
  const [description, setDescription] = useState("");
  const [tableData, setTableData] = useState([]);
  const [postData, setPostData] = useState({ brandName: "", description: "" });
  const [editIndex, setEditIndex] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [params, setParams] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const [search, setSearch] = useState(""); // Search term
  const [brandError, setBrandError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [searchCall, setSearchCall] = useState(false);
  const [activeBrandList, setActiveBrandList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [flag, setFlag] = useState(false);
  const brandheader = [    
    
    { label: "Brand", key: "brandName" },
    { label: "Description", key: "description" },
    { label: "Status", key: "active" },
  ];
 
  const handleCancel = () => {
    console.log(`this is cancel`);
    setBrandName("");
    setDescription("");
    setEditIndex(false);
  };
  //API for search api list
  
  const getBrandList = async () => {
    try {
      setLoading(true);
      const response = await fetchBrandList(page, limit, search); // Fetch data from API
      setBrandList(response.data.brandList);
      setTableData(response.data.brandList); 
      setTotalRecords(response.data.totalRecords); // Update total records
      setBrandList(response.data.brandList);
      const activeBrandList = response.data.brandList.filter((brand) => brand.isActive);
    } catch (error) {
      console.error("Error fetching brand list:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const getAllBrandList = async () => {
    try {
      if (!isSearching || flag) {
      setLoading(true);
        const response = await fetchAllBrandList(); // Fetch data from API
      setAllBrandList(response.data.brandList);
    } }catch (error) {
      console.error("Error fetching brand list:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const [isActiveFlag, setIsActiveFlag] = useState(false)
  // Trigger fetch when search, page, or limit changes
  useEffect(() => {
    getBrandList();
  }, [page]); 

  useEffect(() => {
    getAllBrandList();
  }, [page, isActiveFlag]); 


  const handlePageChange = (newPage) => {
    setIsSearching(false);
    setPage(newPage);
    setParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString()
    }));
  };

  const handlePostRequest = async () => {
    let isValid = true;

    if (!brandName.trim()) {
      setBrandError(true);
      isValid = false;
    } else {
      setBrandError(false);
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

    else{
    try {
      setLoading(true);
      postData.brandName = brandName;
      postData.description = description;

      if (!editIndex) {
        const response = await createBrand(postData);
        toast.success(response.message);
        console.log("response is ", response.message);
      } else {
        const dataToUpdate = {
          brandId: editIndex,
          brandName: brandName,
          description: description,
        };
        console.log("data to update is ", dataToUpdate);
        const response = await updateBrand(dataToUpdate);
        toast.success(response.message);
        console.log("response is ", response.message);
        setEditIndex(false);
      }
      setBrandName("");
      setDescription("");
    } catch (error) {
      console.log(`Error saving Brand ${error}`);
    } finally {
      if (!isSearching) {
        getBrandList();
      }
      else {
        // setselstateName2(stateName);
        handleSearch();
      }
    }
      toggleIsActive();
      handleCancel();
      setLoading(false);  
  }
  };


  function toggleIsActive() {
    if(isActiveFlag)
    {
      setIsActiveFlag(false);
    }
    else{
      setIsActiveFlag(true);
    }
    
  }


  const handleEdit = (brandId, brandName, description) => {
    setEditIndex(brandId);
    setBrandName(brandName);
    setDescription(description);
  };

  
    // useEffect(() => {   
    //   const fetchBrands = async () => {
    //     try {
    //       const response = await fetchLimitedBrandList(page, limit, ""); // Pass page, limit, search
    //       setBrands(response.data.brandList); // Set the returned brands
    //       setTotalRecords(response.data.totalRecords); // Set the total number of records
    //       setTableData(response.data.brandList);
    //     } catch (err) {
    //       console.error("Failed to fetch brands:", err.message);
    //     }
    //   };

    //   fetchBrands();
    // }, [page, limit]); //


  // API call for toggle status
  const handleStatus = async (index, brandId) => {
    try {
      setLoading(true);
      
      console.log(`brand id is ${brandId}, ${index}`);
      const response = await updateBrandStatus({ brandId: brandId });
      console.log(`status resposne : ${response.data.message}`);

      if (response.status === "success") {
        toast.success("Status Updated Successfully");
      }
      // getBrandList();
    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
    } finally {
      if (!isSearching) {
        getBrandList();
      }
      else {
        // setselstateName2(stateName);
        handleSearch();
      }

      setLoading(false);
    }
    
  };
  // API call for delete
  const handleDelete = async (index, brandId) => {
    try {
      const response = await deleteBrand(brandId);
      console.log("response is ", response.message);

      // Refresh the brand list directly from the backend after deletion
      // getBrandList();
    } catch (error) {
      console.log(`Error deleting Brand ${error}`);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setPage(1);
      setIsSearching(true);
      const response = await fetchBrandList(1,limit,brandParams);
      setTableData(response.data.brandList);
      setTotalRecords(response.data.totalRecords);
      if (totalRecords > 10) {
        setFlag(true);
      }
      console.log(`response table  is `, response.data.brandList);
    } catch (error) {
      console.log(`Error in filter List`);
      toast.error("Failed to Update List");
    }
    setLoading(false);
  };
  useEffect(() => {
    // getBrandList();
  }, []);

  return (
    <Grid container>
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      <HeaderNavigation value={"Product > Brand"} />
      {/* create Brand */}
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
          <ProductTabs selectedTab="one" />
        </Grid>

        <Grid container spacing={10}>
          <Grid item >
            <TextField
              style={{ width: "100%" }}
              id="brand-name"
              label="Brand Name"
              variant="standard"
              value={brandName}
              onChange={(e) => {
                setBrandParams(e.target.value);
                setBrandName(e.target.value);
                setBrandError(false); // Clear error when typing
              }}
              required
              error={brandError}
              helperText={brandError ? "Brand Name is required." : ""}
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
                setDescriptionError(false); // Clear error when typing
              }}
              required
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
              handleOnClick={handlePostRequest}
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
              id="disable-close-on-select"
              disableCloseOnSelect
              options={allBrandList}
              getOptionLabel={(option) => option.brandName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  variant="standard"
                  style={{ width: "10rem" }}
                  onChange={(e) => setBrandParams(e.target.value)}
                />
              )}
              onInputChange={(event, newInputValue) => {
                setBrandParams(newInputValue); // Update brandParams here
              }}
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
              fileName="Brand_Data"
              headers={brandheader}
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
                            row._id,
                            row.brandName,
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* <div>
          <h1>Brand List</h1>
          <ul>
            {brandlist.map((brand, index) => (
              <li key={brand._id}>{brand.brandName}</li> // Use unique _id for the key
            ))}
          </ul>
          <div>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Previous
            </button>
            <button onClick={() => setPage((prev) => (brands.length < limit ? prev : prev + 1))} disabled={brands.length < limit}>
              Next
            </button>
          </div>
          <p>Total Records: {totalRecords}</p>
          <p>Current Page: {page}</p>
        </div> */}
        <div className="pagination-container">
          <Paginate
            page={page}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            dataSize={dataSize}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Managebrand;
