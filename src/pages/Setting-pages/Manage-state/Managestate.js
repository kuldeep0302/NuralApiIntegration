import "./Managestate.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommonButton from "../../../Componants/Common/Button";
import {
  getCountryList,
  createState,
  updateState,
  getZoneList,
  getStateList,
  updateStateStatus,
  getfilteredZoneList,
  getCountryListActive,
  getStateList2,
  getStateListsearch,
} from "../../../API Service/apiService";
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
  TextField,
} from "@mui/material";

import Paginate from "../../../Componants/Common/Paginate";
import ExportToExcel from "../../../Componants/Common/ExportToExcel";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import activeIcon from "../../../Assests/activeIcon.svg";
import inactiveIcon from "../../../Assests/inactiveIcon.svg";
import editIcon from "../../../Assests/editIcon.svg";
import Subheader from "../../../Componants/Common/Subheader";
import config from "../../../Componants/Common/config";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../Componants/Loader/Loader";

const stateHeaders = [
  { label: "Country", key: "countryName" },
  { label: "Zone", key: "zoneName" || "" },
  { label: "State", key: "stateName" },
  { label: "Status", key: "active" },
];

// const calltype = [];

// const callsource = [{ title: "Afghanistan" }];

const Managestate = () => {
  const [page, setPage] = useState(1);
  const pageSize = config.pageSize;
 

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [filteredStates, setFilteredStates] = useState([]);
  const [editIndex, setEditIndex] = useState(false);
  const [searchActivated, setSearchActivated] = useState(false);
  const [searchStateName, setSearchStateName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [tableData, setTableData] = useState([]);
  const [stateName, setStateName] = useState(null);
  const [limit, setLimit] = useState(10);
  const [countryId, setCountryId] = useState(null);
  const [zoneId, setZoneId] = useState(null);
  const [zones, setZones] = useState([]);
  const [zoneName, setZoneName] = useState(null);
  const [flag, setFlag] = useState(false);
  const [filteredzones, setfilteredzones] = useState([]);
  // const totalItems = filteredStates.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const [dataSize, setDataSize] = useState(pageSize);
  const [selstateName, setselstateName] = useState(null);
  const [filStates, setFilStates] = useState([]);
  const [selZoneId, setselZoneId] = useState(null);
  const [countryId2, setCountryId2] = useState(null);
  const [filteredzones2, setfilteredzones2] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selCountry2, setselCountry2] = useState(null); // Selected country object for the second API
  const [selZoneId2, setselZoneId2] = useState(null); // Selected zone ID for the second API
  const [selZoneName2, setselZoneName2] = useState(null); // Selected zone object for the second API
  const [stateId2, setstateId2] = useState(null); // Selected state ID for the second API
  const [selstateName2, setselstateName2] = useState(null); // Selected state object for the second API
  const [filStates2, setFilStates2] = useState([]); // Filtered states for the second API

  const [countryError, setCountryError] = useState(false);
  const [zoneError, setZoneError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [status, setStatus] = useState(true);
  const [countriesActive, setCountriesActive] = useState([]);
  const [isSearching, setIsSearching] = useState(false);


  //---------------------common------------------------------------------//

  

  const fetchCountries2 = async () => {
    try {
      const response = await getCountryList();
      setCountries(response.data.countries);
      console.log("response.data", response.data);
      // setFilteredCountries(response.data.countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries2();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await getCountryListActive("", page, limit, status);
      setCountriesActive(response.data.countries);
      console.log("response.data", response.data);
      // setFilteredCountries(response.data.countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);
    
    const fetchState = async () => {
      try {
        if(!isSearching || flag){
        setLoading(true);
        const response = await getStateList("", page, limit, "", "");
        setStates(response.data.states);
        console.log("response.data", response.data);
        setTotalRecords(response.data.totalStates);
        setTableData(response.data.states);
     
        // setFilteredZones(response.data.zones);
        // setFilteredCountries(response.data.countries);
      } }catch (error) {
        console.error("Error fetching countries:", error);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchState();
    }, [page]);


    //------------------------------------------filter states-------------------------------------------------------------------//

  const fetchFilState = async () => {
    try {
      if(selZoneId){
      setLoading(true);
      const response = await getStateList("", page, limit, countryId, selZoneId);
      setFilStates(response.data.states || []);
      console.log("response.data", response.data);
      // setTotalRecords(response.data.totalStates);
      // setTableData(response.data.states);
      // setFilteredZones(response.data.zones);
      // setFilteredCountries(response.data.countries);
    }} catch (error) {
      console.error("Error fetching countries:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchFilState();
  }, [selZoneId]);


  const fetchFilState2 = async () => {
    try {
      if (selZoneId2) {
        setLoading(true);
        const response = await getStateListsearch(countryId2, selZoneId2);
        setFilStates2(response.data.states || []);
        console.log("Response for Zone ID 2:", response.data);
      }
    } catch (error) {
      console.error("Error fetching states for Zone ID 2:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilState2();
  }, [selZoneId2]);
  
    const fetchZones = async () => {
      try {
        if (countryId && !isEditing) { 
        setLoading(true);
        const response = await getfilteredZoneList(1,
          limit,
          countryId,
          status);
        setfilteredzones(response.data.zones);
        console.log("filtered zones", response.data.zones);
      }} catch (error) {
        console.error("Error fetching zones:", error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchZones();
    }, [countryId]);

  const fetchZones2 = async () => {
    try {
      if (countryId2) {
        setLoading(true);
        const response = await getfilteredZoneList(1,
          limit,
          countryId2);
        setfilteredzones2(response.data.zones);
        console.log("filtered zones", response.data.zones);
      }
    } catch (error) {
      console.error("Error fetching zones:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchZones2();
  }, [countryId2]);

    
  
  const dummyGetList = {
    stateName: "",
    page: page,
    limit: pageSize,
    countryId: countryId,
    zoneId: zoneId,
  };
  // const dummyGetList2 = {
  //   serialNo: "",
  //   countryName: "",
  //   zoneName: "",
  //   countryId: null, // Initialize as null
  //   page: 1,
  //   limit: 10,
  // };
  const [searchParams, setParams] = useState({
    ...dummyGetList,
  });
  // const [searchParams2, setParams2] = useState({
  //   ...dummyGetList2,
  // });
  // const [zoneAddDropdown, setZoneAddDropdown] = useState([]);
  const [totalRecords, setTotalRecords] = useState("");

  const handlePageChange = (newPage) => {
    setPage(newPage);

    setParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString(),
    }));
  };
  const cells = ["S.No", "Country", "Zone", "State", "Action"];

  const handleStatus = async (_id) => {
    try {
      setLoading(true);
      const response = await updateStateStatus({ id: _id });
      console.log(`status resposne : ${response.data.message}`);
      if (response.status === "success") {
        toast.success("Status Updated Successfully");
      }

    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
    } finally {
      if(!isSearching){
      fetchState();
      }
      else{
        // setselstateName2(stateName);
        handleSearch();
      }
      
      setLoading(false);
    }

  };

  const handlePostRequest = async () => {
    
    let isValid = true;
    if (!countryId) {
      setCountryError(true);
      isValid = false;
    } else {
      setCountryError(false);
    }

    if (!zoneId) {
      setZoneError(true);
      isValid = false;
    } else {
      setZoneError(false);
    }

    if (!stateName) {
      setStateError(true);
      isValid = false;
    } else {
      setStateError(false);
    }

    if (!isValid) {
      toast.error("Please fill all the fields");
      return;
    }

    else {
      try {
        setLoading(true);
        let response;
        if (editIndex) {
          const postData = {
            _id: editIndex,
            countryId: countryId,
            zoneId: zoneId,
            stateName: stateName,
          }
          response = await updateState(postData); // Call update API
          console.log("Update response:", postData);
          toast.success("State updated successfully!");
          setEditIndex(false); // Reset the `editIndex` after update
        } else {
          const postData = {
            countryId: countryId,
            zoneId: zoneId,
            stateName: stateName,
          }
          response = await createState(postData); // Call create API
          console.log("Create response:", postData);
          toast.success("State created successfully!");
        }
      } catch (error) {
        console.error("Error making POST request:", error);
        toast.error("Error making POST request. Please try again.");
      }
    }
    if(!isSearching){
    fetchState();
    }
    else{
      handleSearch();
    }
    handleCancel();
    setLoading(false);
  };

  const handleEdit = (_id, stateName, countryId, countryName, zoneId, zoneName) => {
    setIsEditing(true);
    setEditIndex(_id); // Set the `editIndex` to determine it's an update
    setStateName(stateName);
    setCountryId(countryId);
    setSelectedCountry(countryName);
    setZoneId(zoneId);
    setZoneName(zoneName);
  };

  const handleCancel = async () => {
    setSelectedCountry(null);
    setSelectedZone(null);
    setselstateName(null);
    setEditIndex(false);
    setZoneId(null);
    setCountryId(null);
    setZoneName(null);
    setStateName("");
    setEditIndex(false);
  }

   const handleSearch = async () => {
      try {
        setLoading(true);
        setPage(1);
        setIsSearching(true);
        const response = await getStateList(selstateName2, 1, limit, countryId2, selZoneId2);
        console.log("response.data", response.data);
        setTotalRecords(response.data.totalStates);
        setTableData(response.data.states);
        if (totalRecords > 10) {
          setFlag(true);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } 
        setLoading(false);
    };

  return (
    <div className="Managestate-container">
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      <HeaderNavigation value={"Location > State"} />
      <div className="autocompleteform-Managestate">
        <Subheader heading={"Add State"} />
        <div className="textbox-main-Managestate">
          <div className="line-Managestate">
          
            <div className="textinput-Managestate">
              {!editIndex && (
                <Autocomplete
                  id="country-autocomplete"
                  clearOnEscape
                  options={countriesActive}
                  getOptionLabel={(option) => option.countryName}
                  value={selectedCountry || null} // Controlled value
                  onChange={(event, value) => {
                    setIsEditing(false);
                    setCountryId(value?._id || null);
                    setSelectedCountry(value || null);
                    if (!value) {
                      setZoneId(null);
                      setZoneName(null);
                    }
                    setCountryError(false); // Clear error on valid selection
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="standard"
                      required
                      error={countryError}
                      helperText={countryError ? "Country is required." : null}
                    />
                  )}
                />
              )}
              {editIndex && (
                <TextField
                  disabled
                  id="outlined-basic"
                  label="Country"
                  variant="standard"
                  value={selectedCountry} // Display countryName if available
                />
              )}
            </div>

            <div className="textinput-Managestate">
              {!editIndex && (
                <Autocomplete
                  id="zone-autocomplete"
                  clearOnEscape
                  options={filteredzones}
                  getOptionLabel={(option) => option.zoneName || ""}
                  value={zoneName || null} // Controlled value
                  onChange={(event, value) => {
                    setZoneId(value?._id || null);
                    setZoneName(value || null);
                    setZoneError(false); // Clear error on valid selection
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Zone"
                      variant="standard"
                      required
                      error={zoneError}
                      helperText={zoneError ? "Zone is required." : null}
                    />
                  )}
                />
              )}
              {editIndex && (
                <TextField
                  disabled
                  id="outlined-basic"
                  label="Zone"
                  variant="standard"
                  value={zoneName } // Display zoneName if available
                />
              )}
            </div>

            <div className="textinput-Managestate">
              <TextField
                id="state-name"
                label="State Name"
                variant="standard"
                focused={!!stateName} // Focus if editIndex is not false
                value={stateName || ""}
                onChange={(e) => {
                  if (selZoneId2){
                  setselstateName2(e.target.value);
                  }
                  setStateName(e.target.value);
                  setStateError(false); // Clear error on input
                }}
                required
                error={stateError}
                helperText={stateError ? "State Name is required." : null}
              />
            </div>
          </div>

          <div className="button-Managestate">
            <span className="buttons-Managestate-span">
              <CommonButton
                name={editIndex ? "UPDATE" : "ADD"} // Check if `editIndex` is truthy
                handleOnClick={handlePostRequest}
              />
            </span>
            <span className="buttons-Managestate-span">
              <CommonButton name={"CANCEL"} handleOnClick={handleCancel} />
            </span>
          </div>
        </div>
      </div>
      <div className="autocompleteform-Managestate">
        {/* <h3>List View</h3> */}
        <Subheader heading={"List View"} />
        <div className="line-Managestate">

          <div className="textinput-Managestate">
            <Autocomplete
              id="country-autocomplete"
              clearOnEscape
              options={countries}
              getOptionLabel={(option) => option.countryName}
              value={selCountry2 || null} // Controlled value
              onChange={(event, value) => {
                // Update country-related states
                setCountryId2(value?._id || null);
                setselCountry2(value || null);

                // Reset dependent fields if Country is cleared
                if (!value) {
                  setselZoneId2(null);
                  setselZoneName2(null);
                  setstateId2(null);
                  setselstateName2(null);
                  setfilteredzones2([]); // Clear zones
                  setFilStates2([]); // Clear states
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Country" variant="standard" />
              )}
            />
          </div>

          <div className="textinput-Managestate">
            <Autocomplete
              id="zone2-Autocomplete"
              clearOnEscape
              options={filteredzones2} // Updated for second API
              getOptionLabel={(option) => option.zoneName || ""}
              value={selZoneName2 || null} // Controlled value for second API
              onChange={(event, value) => {
                // Update zone-related states for second API
                setselZoneId2(value?._id || null);
                setselZoneName2(value || null);

                // Reset dependent fields if Zone is cleared
                if (!value) {
                  setstateId2(null);
                  setselstateName2(null);
                  setFilStates2([]); // Clear states
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Zone"
                  variant="standard"
                  className="mt-1 app-input-width"
                />
              )}
            />
          </div>

          <div className="textinput-Managestate">
            <Autocomplete
              id="state2-autocomplete"
              clearOnEscape
              options={filStates2} // Using the states list from the second API
              getOptionLabel={(option) => option.stateName || ""} // Display the state name
              value={filStates2.find((state) => state.stateName === selstateName2) || null} // Ensure the value matches an option
              onChange={(event, value) => {
                // Update state-related states for the second API
                setstateId2(value?._id || null); // Set the selected state ID
                setselstateName2(value ? value.stateName : null); // Set the selected state name
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State Name"
                  variant="standard"
                  className="mt-1 app-input-width"
                />
              )}
            />

          </div>


          {/* {selstateName?.stateName} {page} {limit} {countryId} {selZoneId} */}
          <span className="buttons-Managestate-span">
            <CommonButton name="Search" handleOnClick={handleSearch} />
          </span>

        </div>
        <div className="table-Managestate">
          <div className="excelexport-Managestate">
            <span className="buttons-Managestate-span">
              <ExportToExcel
                name="Export to Excel"
                data={tableData}
                fileName="States_Data"
                headers={stateHeaders}
              />
            </span>
          </div>
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
                    <TableCell align="center">{row.countryName}</TableCell>
                    <TableCell align="center">{row.zoneName}</TableCell>
                    <TableCell align="center">{row.stateName}</TableCell>
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
                        onClick={() =>
                          handleEdit(
                            row._id,
                            row.stateName,
                            row.countryId,
                            row.countryName,
                            row.zoneId,
                            row.zoneName
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
        </div>
        <div className="pagination-container">
          <Paginate
            page={page}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            dataSize={dataSize}
          />
        </div>
        {/* <div>
          <h2>State List</h2>
          {loading ? (
            <p>Loading...</p> // Show loading message or spinner
          ) : states.length > 0 ? (
            <table border="1">
              <thead>
                <tr>
                  <th>State Name</th>
                  <th>Zone Name</th>
                  <th>Country Name</th>
                </tr>
              </thead>
              <tbody>
                {states.map((state) => (
                  <tr key={state._id}>
                    <td>{state.stateName}</td>
                    <td>{state.zoneName || "N/A"}</td>
                    <td>{state.countryName || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No states found.</p>
          )}
          <p>Total Records: {totalRecords}</p> {/* Show total records */}
        {/* </div> */} 
      </div>
    </div>
  );
};

export default Managestate;
