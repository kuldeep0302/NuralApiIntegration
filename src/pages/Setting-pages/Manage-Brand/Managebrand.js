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
  fetchBrandList,
  updateBrand,
  updateBrandStatus,
} from "../../../API Service/apiService";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../Componants/Loader/Loader";
// import { fetchBrandList } from "../../../API Service/apiService";

const cells = ["S.No","Brand", "Description", "Action"];


const Managebrand = () => {
  
  const [page, setPage] = useState(1);
  const pageSize = config.pageSize;
  const [dataSize, setDataSize] = useState(pageSize);
  const [brandName, setBrandName] = useState("");
  const [brandParams, setBrandParams] = useState("");
  const [brandlist, setBrandList] = useState([]);
  const [description, setDescription] = useState("");
  const [tableData, setTableData] = useState([]);
  const [postData, setPostData] = useState({ brandName: "", description: "" });
  const [editIndex, setEditIndex] = useState(false);
  const [loading, setLoading] = useState(false);
  const brandheader = [    
    
    { label: "Brand", key: "brandName" },
    { label: "Description", key: "description" },
  ];
  
  const handleCancel = () => {
    console.log(`this is cancel`);
    setBrandName("");
    setDescription("");
  };
  //API for search api list
  const getBrandList = async () => {
    try {
      setLoading(true);
      const response = await fetchBrandList();
      setTableData(response.data.brandList);
      setBrandList(response.data.brandList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  



  const handlePostRequest = async () => {
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
      getBrandList();
    } catch (error) {
      console.log(`Error saving Brand ${error}`);
      setLoading(false);
    } finally {
      
    }
  };

  const handleEdit = (brandId, brandName, description) => {
    setEditIndex(brandId);
    setBrandName(brandName);
    setDescription(description);
  };

  // API call for toggle status
  const handleStatus = async (index, brandId) => {
    try {
      setLoading();
      console.log(`brand id is ${brandId}, ${index}`);
      const response = await updateBrandStatus({ brandId: brandId });
      console.log(`status resposne : ${response.data.message}`);

      if (response.status === "success") {
        toast.success("Status Updated Successfully");
      }
      getBrandList();
    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // API call for delete
  const handleDelete = async (index, brandId) => {
    try {
      const response = await deleteBrand(brandId);
      console.log("response is ", response.message);

      // Refresh the brand list directly from the backend after deletion
      getBrandList();
    } catch (error) {
      console.log(`Error deleting Brand ${error}`);
    }
  };

  const handleSearch = async () => {
    try {
      const filter = {
        search: brandParams, // Ensure brandParams is correctly passed
        page: 1,
        limit: 10,
      };
      const response = await fetchBrandList(filter);

      setTableData(response.data.brandList);
      console.log(`response table  is `, response.data.brandList);
      toast.success("List updated successfully.");
    } catch (error) {
      console.log(`Error in filter List`);
      toast.error("Failed to Update List");
    }
  };
  useEffect(() => {
    getBrandList();
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
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Brand Name"
              variant="standard"
              value={brandName}
              onChange={(e, val) => {
                setBrandName(e.target.value);
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
              options={brandlist}
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
              data={brandlist}
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
                    <TableCell align="center">{row.brandName}</TableCell>
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
                      <IconButton
                        onClick={() => handleDelete(index, row._id)}
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
      </Grid>
    </Grid>
  );
};

export default Managebrand;
