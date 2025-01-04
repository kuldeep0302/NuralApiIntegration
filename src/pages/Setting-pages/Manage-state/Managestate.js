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
];

// const calltype = [];

// const callsource = [{ title: "Afghanistan" }];

const Managestate = () => {
  const [page, setPage] = useState(1);
  const pageSize = config.pageSize;
  const dummyGetList = {
    serialNo: "",
    // countryName: "",
    // zoneName: "",
    countryId: "",
    zoneId: "",
    stateName: "",
    page: page,
    limit: pageSize,
  };
  
  const [zoneList, setZoneList] = useState([]);
  const [countries, setCountries] = useState([]);
  
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [filteredStates, setFilteredStates] = useState([]);
const [filteredCountries, setFilteredCountries] = useState([]);
const [filteredZones, setFilteredZones] = useState([])
  const [editIndex, setEditIndex] = useState(false);
  const [searchActivated, setSearchActivated] = useState(false);
  const [searchStateName, setSearchStateName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  // const totalItems = filteredStates.length;

  const startIndex = (currentPage - 1) * itemsPerPage;

  const [dataSize, setDataSize] = useState(pageSize);
  const [searchParams, setParams] = useState({
    ...dummyGetList,
  });
  const [zoneAddDropdown, setZoneAddDropdown] = useState([]);
  const [totalRecords, setTotalRecords] = useState(1);

  const handlePageChange = (newPage) => {
    setPage(newPage);

    setParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString(),
    }));
  };

  // Fetching data
  useEffect(() => {
    fetchCountries();
    fetchState();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await getCountryList();
      setCountries(response.data.countries);
      console.log("response.data", response.data);
      // setFilteredCountries(response.data.countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchState = async () => {
    try {
      setLoading(true);
      const response = await getStateList(searchParams);
      setStates(response.data.states);
      console.log("response.data", response.data);
      setTotalRecords(response.data.totalStates);
      setFilteredZones(response.data.zones);
      setFilteredCountries(response.data.countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
    setLoading(false);
  };

  const [postData, setPostData] = useState({
    countryId: "",
    zoneId: "",
    stateName: "",
    // displayOrder: "",
    // remarks: ""
  });

  const handleStatus = async (_id) => {
    try {
      setLoading(true);
      const response = await updateStateStatus({ id: _id });
      console.log(`status resposne : ${response.data.message}`);

      if (response.status === "success") {
        toast.success("Status Updated Successfully");
      }
      fetchState();
    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handlePostRequest = async () => {
    try {
      setLoading(true);
      let response;
      if (editIndex) {
        // Include `_id` in the `postData` for update
        const updateData = { ...postData, _id: editIndex };
        response = await updateState(updateData); // Call update API
        console.log("Update response:", response);
        alert("State updated successfully!");
        setEditIndex(false); // Reset the `editIndex` after update
        fetchState();
      } else {
        response = await createState(postData); // Call create API
        console.log("Create response:", response);
        alert("State created successfully!");
      }

      // Alert the response message
      alert(response.data.message);

      // Reset the form
      setPostData({
        countryId: "",
        zoneId: "",
        stateName: "",
        displayOrder: "",
        remarks: "",
      });

      // Refresh states after a successful post
      setFilteredStates((prev) => [...prev, response.data]); // Update the states list
    } catch (error) {
      console.error("Error making POST request:", error);
      alert("Error making POST request. Please try again.");
    }
    fetchState();
    setLoading(false);
    
  };


  const handleEdit = (_id, countryId, zoneId, zoneName, stateName) => {
    setEditIndex(_id); // Set the `editIndex` to determine it's an update
    setZoneAddDropdown([{ _id: zoneId, zoneName }]); // Set the zone dropdown with the selected zone
    setPostData({
      _id,
      countryId,  // Assign the `countryId`
      zoneId,     // Assign the `zoneId`
      stateName,  // Assign the `stateName`
    });
  };

  const handleCancel =async()=>{
    setPostData({
      countryId: "",
      zoneId: "",
      stateName: "",
    });
    setEditIndex(false);
  }
  
   const handleSearch = async () => {
      setSearchActivated(true);
  };


  const handleAddState = async (fieldName, value) => {
    console.log("running value", value);
    if (fieldName === "countryId" && !value) {
      setZoneAddDropdown([]);
      setPostData((prev) => ({
        ...prev,
        countryId: "",
        zoneId: "",
        stateName: "",
      }));
      return;
    }

    if (fieldName === "zoneId" && !value) {
      setPostData((prev) => ({
        ...prev,
        zoneId: "",
        stateName: "",
      }));
      return;
    }

    if (fieldName === "countryId" && value) {
      console.log("countryIdvalue", value);
      setPostData((p) => ({
        ...p,
        countryId: value,
        zoneId: "",
        stateName: "",
      }));
      // setLoading(true);
      try {
        const body = {
          countryId: value,
          search: "",
        };
        let res = await getZoneList(body);
        console.log("res.data.zones", res.data.zones);
        setZoneAddDropdown(res.data.zones);
      } catch (error) {
        console.log("Error fetching", error);
        // toast.error(MenuConstants.errorwhilegettinglist, "model list");
      } finally {
        // setLoading(false);
      }
    }

    if (fieldName === "zoneId" && value) {
      console.log("zoneId",value)
      setPostData((prev) => ({
        ...prev,
        zoneId: value,
        stateName: "",
      }));
      return;
    }
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
              <Autocomplete
                id="country-autocomplete"
                clearOnEscape
                options={countries}
                getOptionLabel={(option) => option.countryName}
                onChange={(event, value) => {
                  handleAddState("countryId", value ? value._id : 0);

                  // Update the subcategory value when selected
                }}
                value={
                  countries.find(
                    (option) => option._id === postData.countryId
                  ) || null
                }
                isOptionEqualToValue={(option, value) =>
                  option._id === value?._id
                }
                renderInput={(params) => (
                  <TextField {...params} label="Country" variant="standard" />
                )}
              />
            </div>

            <div className="textinput-Managestate">
            
              
                <Autocomplete
                  id="zone-Autocomplete"
                  options={zoneAddDropdown}
                  getOptionLabel={(option) => option.zoneName}
                  onChange={(event, value) => {
                    handleAddState("zoneId", value ? value._id : null); // Use null when no selection
                  }}
                  value={
                    zoneAddDropdown.find((option) => option._id === postData.zoneId) || null
                  }
                  isOptionEqualToValue={(option, value) => option._id === value?._id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="zone"
                      variant="standard"
                      className="mt-1 app-input-width"
                      InputLabelProps={{
                        style: { fontSize: "14px" }, // Optional styling
                      }}
                    />
                  )}
                />
              
            </div>

            <div className="textinput-Managestate">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="State"
                value={postData.stateName}
                variant="standard"
                onChange={(e) => {
                  setPostData({ ...postData, stateName: e.target.value });
                }}
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
              options={countries
                .filter((country) =>
                  states.some((state) => state.countryName === country.countryName)
                )
                .map((country) => ({
                  value: country.id,
                  label: country.countryName,
                }))}
              onChange={(e, newValue) => {
                setSelectedCountry(newValue);
                setSelectedZone(null); // Reset the selected zone
              }}
              renderInput={(params) => (
                <TextField {...params} label="Country" variant="standard" />
              )}
            />
          </div>

          <div className="textinput-Managestate">
            <Autocomplete
              id="zone-autocomplete"
              options={
                selectedCountry
                  ? states
                    .filter(
                      (state) => state.countryName === selectedCountry.label
                    )
                    .map((state) => ({
                      value: state.zoneName,
                      label: state.zoneName,
                    }))
                    .filter(
                      (zone, index, self) =>
                        index ===
                        self.findIndex((z) => z.label === (zone.label||"")) // Remove duplicates
                    )
                  : []
              }
              onChange={(e, newValue) => setSelectedZone(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Zone" variant="standard" />
              )}
            />
          </div>

          <div className="textinput-Managestate">
            <Autocomplete
              id="state-autocomplete"
              options={
                selectedCountry && selectedZone
                  ? states
                    .filter(
                      (state) =>
                        state.countryName === selectedCountry.label && // Filter by selected country
                        state.zoneName === selectedZone.label // Filter by selected zone
                    )
                    .map((state) => ({
                      value: state.id, // Unique state ID
                      label: state.stateName, // State name to display
                    }))
                  : [] // No options if country or zone is not selected
              }
              value={
                searchStateName
                  ? { label: searchStateName, value: searchStateName } // Show selected state
                  : null // Default to null if no state is selected
              }
              onChange={(e, newValue) =>
                setSearchStateName(newValue ? newValue.label : "") // Update state selection
              }
              renderInput={(params) => (
                <TextField {...params} label="State" variant="standard" />
              )}
            />
          </div>
          <span className="buttons-Managestate-span">
            <CommonButton name="Search" handleOnClick={handleSearch} />
          </span>

        </div>
        <div className="table-Managestate">
          <div className="excelexport-Managestate">
            <span className="buttons-Managestate-span">
              <ExportToExcel
                name="Export to Excel"
                data={states}
                fileName="States_Data"
                headers={stateHeaders}
              />
            </span>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }} align="left">
                    S. No.
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Country
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Zone
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    State
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="right">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {states.length > 0 ? (
                  states
                    .filter((state) => {
                      if (!searchActivated) {
                        return true; // Show all rows if search is not activated
                      }
                      return (
                        (!searchStateName || state.stateName === searchStateName) && // Match stateName if provided
                        (!selectedCountry || state.countryName === selectedCountry.label) && // Match countryName if provided
                        (!selectedZone || state.zoneName === selectedZone.label) // Match zoneName if provided
                      );
                    })
                    .slice((page - 1) * dataSize, page * dataSize) // Slicing the states array for pagination
                    .map((state, index) => (
                      <TableRow key={state._id}>
                        <TableCell align="left">
                          {(page - 1) * dataSize + index +1} {/* Adjust index for pagination */}
                        </TableCell>
                        <TableCell align="center">{state.countryName}</TableCell>
                        <TableCell align="center">{state.zoneName}</TableCell>
                        <TableCell align="center">{state.stateName}</TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton
                            onClick={() => handleStatus(state._id)}
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                            }}
                          >
                            <img
                              src={state.active === false ? inactiveIcon : activeIcon}
                              alt="active"
                              height="20px"
                              width="20px"
                            />
                          </IconButton>

                          <IconButton
                            onClick={() => handleEdit(state._id, state.countryId, state.zoneId, state.zoneName, state.stateName)}
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
                    ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={5}>
                      No data available
                    </TableCell>
                  </TableRow>
                )}
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
    </div>
  );
};

export default Managestate;
