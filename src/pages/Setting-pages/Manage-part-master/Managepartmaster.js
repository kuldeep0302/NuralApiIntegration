import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
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
import {
  createSparePart,
  fetchSparePartList,
  fetchSparePartList2,
  filterHsnCode,
  updateSparePart,
  updateSparePartStatus,
} from "../../../API Service/apiService";
import Loader from "../../../Componants/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import Paginate from "../../../Componants/Common/Paginate";
import config from "../../../Componants/Common/config";

const cells = ["S.No", "Spare Part Name", "Spare Part Code", "HSN ", "Action"];

const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];
const serials = [
  { key: true, label: "Yes" },
  { key: false, label: "No" },
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
    description:
      "Technology giant known for its innovative electronics and software.",
    category: "Technology",
    subCategory: "Electronics", // Added subcategory
  },
  {
    id: 4,
    brandName: "Coca-Cola",
    description:
      "World's largest beverage company, famous for its soft drinks.",
    category: "Beverage",
    subCategory: "Soft Drinks", // Added subcategory
  },
  {
    id: 5,
    brandName: "Samsung",
    description:
      "Leading manufacturer of electronics, including smartphones and TVs.",
    category: "Technology",
    subCategory: "Consumer Electronics", // Added subcategory
  },
];

const SparePartCreation = () => {
  const [sparePartList, setSparePartList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hsnCodes, setHsnCodes] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState(""); // For HSN code input search
  const [selectedHsn, setSelectedHsn] = useState("");
  const [isSerialized, setIsSerialized] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const pageSize = config.pageSize;
  const [tableDate, setTableDate] = useState([]);
  const [sparePartList2, setSparePartList2] = useState([]);
  const dummyGetList = {
    serialNo: "",
    countryName: "",
    zoneName: "",
    stateName: "",
    cityName: "",
    pageSize: pageSize,
  };
  const [searchParams, setParams] = useState({
    ...dummyGetList,
  });
  const [dataSize, setDataSize] = useState(pageSize);
  const [totalRecords, setTotalRecords] = useState(1);
  const [selectedSparePartName2, setSelectedSparePartName2] = useState([]);
  const [selectedCode2, setSelectedCode2] = useState([]);
  const [value, setValue] = useState({});
  const [sparePartName, setSparePartName] = useState("");
  const [sparePartCode, setSparePartCode] = useState("");
  const [selectedSparePartName, setSelectedSparePartName] = useState(null);
  const [selectedSparePartId, setSelectedSparePartId] = useState(null);
  const [relatedCodes, setRelatedCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [filteredData, setFilteredData] = useState(sparePartList);
  const [filteredSpareParts, setFilteredSpareParts] = useState(sparePartList);
  const [errors, setErrors] = useState({
    sparePartName: "",
    sparePartCode: "",
    hsnCode: "",
    isSerialized: ""
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString(),
    }));
  };

  const handleSearchCancel = async () => {
    try {
      setLoading(true);
      setSelectedSparePartName2("");
      setSelectedCode2("");
      setPage(1);

      const response = await fetchSparePartList("", "", 1, pageSize);
      
      if (response.data) {
        setSparePartList(response.data.spareParts || []);
        setTableDate(response.data.spareParts || []);
        setTotalRecords(response.data.totalRecords || 0);
      } else {
        setSparePartList([]);
        setTableDate([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.log("Error in fetching spare part list", error);
      toast.error("Failed to reset search");
      setSparePartList([]);
      setTableDate([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpareParts = async () => {
    try {
      setLoading(true);
      const response = await fetchSparePartList(
        selectedSparePartName2 || "",
        selectedCode2 || "",
        page,
        pageSize
      );
      
      if (response.data) {
        setSparePartList(response.data.spareParts || []);
        setTableDate(response.data.spareParts || []);
        setTotalRecords(response.data.totalRecords || 0);
        
        // Reset to page 1 if current page is beyond total pages
        const totalPages = Math.ceil((response.data.totalRecords || 0) / pageSize);
        if (page > totalPages) {
          setPage(1);
        }
      } else {
        setSparePartList([]);
        setTableDate([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.log("Error in fetching spare part list", error);
      toast.error("Failed to fetch spare parts");
      setSparePartList([]);
      setTableDate([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpareParts();
  }, [page]);

  const fetchSpareParts2 = async () => {
    // API call to fetch spare part list
    try {
      setLoading(true);
      const response = await fetchSparePartList2();
      setSparePartList2(response.data.spareParts);
      console.log("fdfds", response.data.spareParts);
      // setTableDate(response.data.spareParts);
      // setTotalRecords(response.data.totalRecords)
      setLoading(false);
    } catch (error) {
      console.log("Error in fetching spare part list", error);
    }
  };
  useEffect(() => {
    fetchSpareParts2();
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

  const handleStatus = async (_id) => {
    try {
      setLoading(true);
      const response = await updateSparePartStatus({ sparePartId: _id });
      console.log(`status resposne : ${response.data.message}`);

      if (response.status === "success") {
        toast.success("Status Updated Successfully");
      }
    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
    }
    // handleSearch();
    handleSearch();
    setLoading(false);
  };

  const handleEdit = (
    _id,
    sparePartName,
    sparePartCode,
    hsnCode,
    isSerialized
  ) => {
    if (hsnCode) {
      fetchHsnCodes();
    }
    setEditIndex(_id);
    setSparePartName(sparePartName);
    setSparePartCode(sparePartCode);

    // Find the object from `hsnCodes` that matches the provided `hsnCode`
    console.log("=>>>>>", hsnCode);

    setSelectedHsn(hsnCode); // Set the entire object or null if not found

    setIsSerialized(isSerialized);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setPage(1); // Reset to first page when searching
      
      const response = await fetchSparePartList(
        selectedSparePartName2 || "",
        selectedCode2 || "",
        1, // Start from first page
        pageSize
      );
      
      if (response.data) {
        setSparePartList(response.data.spareParts || []);
        setTableDate(response.data.spareParts || []);
        setTotalRecords(response.data.totalRecords || 0);
      } else {
        setSparePartList([]);
        setTableDate([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.log("Error in fetching spare part list", error);
      toast.error("Failed to fetch search results");
      setSparePartList([]);
      setTableDate([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  };

  // Add validation function
  const validateFields = () => {
    let tempErrors = {
      sparePartName: "",
      sparePartCode: "",
      hsnCode: "",
      isSerialized: ""
    };
    let isValid = true;

    if (!sparePartName.trim()) {
      tempErrors.sparePartName = "Spare Part Name is required";
      isValid = false;
    }

    if (!sparePartCode.trim()) {
      tempErrors.sparePartCode = "Spare Part Code is required";
      isValid = false;
    }

    if (!selectedHsn) {
      tempErrors.hsnCode = "HSN Code is required";
      isValid = false;
    }

    if (isSerialized === null) {
      tempErrors.isSerialized = "Serialization status is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Update handleSubmit with validation and better error handling
  const handleSubmit = async () => {

    const data = {
      sparePartName,
      sparePartCode,
      hsnCode: selectedHsn,
      isSerialized: isSerialized !== null ? isSerialized : false,
    }

    try {
      setLoading(true);

      if (editIndex === null) {
        const response = await createSparePart(data);
        if (response.status === "success") {
          toast.success("Spare Part Created Successfully!");
          handleCancel();
          fetchSpareParts();
        } else {
          toast.error(response.message || "Failed to create spare part");
        }
      } else {
        const updateData = { sparePartId: editIndex, ...data };
        const response = await updateSparePart(updateData);
        if (response.status === "success") {
          toast.success("Spare Part Updated Successfully!");
          handleCancel();
          fetchSpareParts();
        } else {
          toast.error(response.message || "Failed to update spare part");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Update handleCancel to also clear errors
  const handleCancel = () => {
    setSparePartName("");
    setSparePartCode("");
    setSelectedHsn(null);
    setIsSerialized(null);
    setEditIndex(null);
    setErrors({
      sparePartName: "",
      sparePartCode: "",
      hsnCode: "",
      isSerialized: ""
    });
  };

  // const handleSparePartNameChange = (event, newValue) => {
  //   setSelectedSparePartName(newValue);

  //   // Update related codes dynamically
  //   if (newValue) {
  //     const codes = sparePartList2
  //       .filter((item) => item.sparePartName === newValue.label)
  //       .map((item) => ({ label: item.sparePartCode, id: item._id }));
  //     setRelatedCodes(codes);
  //   } else {
  //     setRelatedCodes([]);
  //   }
  //   setSelectedCode(null); // Reset the selected code
  // };

  return (
    <Grid container>
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      <HeaderNavigation value={"Spare Part Creation"} />
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
        <Grid container spacing={10}>
          <Grid item>
            <TextField
              fullWidth
              label="Spare Part Name"
              variant="standard"
              value={sparePartName}
              onChange={(e) => {
                setSparePartName(e.target.value);
                setErrors(prev => ({ ...prev, sparePartName: "" }));
              }}
              error={!!errors.sparePartName}
              helperText={errors.sparePartName}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Spare Part Code"
              variant="standard"
              value={sparePartCode}
              onChange={(e) => {
                setSparePartCode(e.target.value);
                setErrors(prev => ({ ...prev, sparePartCode: "" }));
              }}
              error={!!errors.sparePartCode}
              helperText={errors.sparePartCode}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              options={hsnCodes}
              getOptionLabel={(option) => option.hsnCode || ""}
              value={hsnCodes.find((code) => code.hsnCode === selectedHsn) || null}
              onChange={(event, value) => {
                setSelectedHsn(value?.hsnCode || null);
                setErrors(prev => ({ ...prev, hsnCode: "" }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ width: "11rem" }}
                  label="HSN Code"
                  variant="standard"
                  error={!!errors.hsnCode}
                  helperText={errors.hsnCode}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Autocomplete
              id="is-serialized"
              disableCloseOnSelect
              options={serials}
              getOptionLabel={(option) => option.label}
              value={serials.find((serial) => serial.key === isSerialized) || null}
              onChange={(event, value) => {
                setIsSerialized(value ? value.key : false);
                setErrors(prev => ({ ...prev, isSerialized: "" }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ width: "11rem" }}
                  label="Is Serialized"
                  variant="standard"
                  error={!!errors.isSerialized}
                  helperText={errors.isSerialized}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container gap={2} spacing={5} sx={{ marginTop: "1rem" }}>
          <Grid item>
            <CommonButton handleOnClick={handleCancel} name={"Cancel"} />
          </Grid>
          <Grid item>
            <CommonButton
              name={editIndex !== null ? "UPDATE" : "Save"}
              handleOnClick={handleSubmit}
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
              CloseOnSelect
              options={sparePartList2}
              value={
                sparePartList2.find(
                  (option) => option.sparePartName === selectedSparePartName2
                ) || null
              }
              getOptionLabel={(option) => option.sparePartName}
              onChange={(event, newValue) => {
                setSelectedSparePartName2(
                  newValue ? newValue.sparePartName : ""
                );

                // Reset the code selection
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Spare Part Name"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Autocomplete
              id="spare-part-code"
              options={sparePartList2} // Dynamically filtered codes
              getOptionLabel={(option) => option.sparePartCode}
              value={
                sparePartList2.find(
                  (option) => option.sparePartCode === selectedCode2
                ) || null
              }
              onChange={(event, newValue) =>
                setSelectedCode2(newValue ? newValue.sparePartCode : "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Spare Part Code"
                  variant="standard"
                  style={{ width: "10rem" }}
                />
              )}
            />
          </Grid>
          <Grid>
            <CommonButton name={"Search"} handleOnClick={handleSearch} />
          </Grid>
          <Grid item>
            <CommonButton
              name={"Show All"}
              handleOnClick={handleSearchCancel}
            />
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
                {tableDate.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {(page - 1) * dataSize + index + 1}{" "}
                      {/* Index adjusted for pagination */}
                    </TableCell>
                    <TableCell align="center">{row.sparePartName}</TableCell>
                    <TableCell align="center">{row.sparePartCode}</TableCell>
                    <TableCell align="center">{row.hsnCode}</TableCell>
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
                          src={row.status === false ? inactiveIcon : activeIcon}
                          alt="active"
                          height="20px"
                          width="20px"
                        />
                      </IconButton>

                      <IconButton
                        onClick={() =>
                          handleEdit(
                            row._id,
                            row.sparePartName,
                            row.sparePartCode,
                            row.hsnCode,
                            row.isSerialized
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
          </TableContainer>{" "}
          <Paginate
            page={page}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            dataSize={dataSize}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SparePartCreation;
