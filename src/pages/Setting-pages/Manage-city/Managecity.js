import "./Managecity.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCountryList,
  getZoneList,
  getStateList,
  createCity,
  getCityList,
  updateCityStatus,
  updateCity,
  getfilteredZoneList,
  getCountryListActive,
  getStateListsearch,

} from "../../../API Service/apiService";
import CommonButton from "../../../Componants/Common/Button";
import {
  Autocomplete,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import ExportToExcel from "../../../Componants/Common/ExportToExcel";
import Paginate from "../../../Componants/Common/Paginate";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import activeIcon from "../../../Assests/activeIcon.svg";
import inactiveIcon from "../../../Assests/inactiveIcon.svg";
import editIcon from "../../../Assests/editIcon.svg";
import Subheader from "../../../Componants/Common/Subheader";
import config from "../../../Componants/Common/config";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../Componants/Loader/Loader";

const cityHeaders = [
  { label: "S. No.", key: "serialNumber" },
  { label: "Country", key: "countryName" },
  { label: "Zone", key: "zoneName" },
  { label: "State", key: "stateName" },
  { label: "City", key: "cityName" },
  { label: "Status", key: "active" },
];

const Managecity = () => {
  const pageSize = config.pageSize;
  const dummyGetList = {
    serialNo: "",
    countryName: "",
    zoneName: "",
    stateName: "",
    cityName: "",
    pageSize: pageSize
  };


  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const [filteredCities, setFilteredCities] = useState([]);

  const [editIndex, setEditIndex] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [searchActivated, setSearchActivated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const itemsPerPage = 10;

  // const totalItems = filteredCities.length;

  // Calculate the current items to display
  const startIndex = (currentPage - 1) * itemsPerPage;

  // const paginatedCities = filteredCities.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );

  const [dataSize, setDataSize] = useState(pageSize);
  const [zoneAddDropdown, setZoneAddDropdown] = useState([]);
  const [zoneId, setZoneId] = useState(null);
  const [searchParams, setParams] = useState({
    ...dummyGetList
  });

  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [tableData, setTableData] = useState([]);
  const cells = ["S.No", "Country", "Zone", "State", "city", "Action"];
  const [limit, setLimit] = useState(10);
  const [countryId, setCountryId] = useState(null);
  const [cityName, setcityName] = useState(null);
  const [stateName, setstateName] = useState(null);
  const [zoneName, setZoneName] = useState(null);
  const [stateId, setstateId] = useState(null);
  const [filteredzones, setfilteredzones] = useState([]);
  const [selstateName, setselstateName] = useState(null);
  const [selZoneName, setselZoneName] = useState(null);
  const [selCountry, setselCountry] = useState(null);
  const [countryId2, setCountryId2] = useState(null);
  const [filteredzones2, setfilteredzones2] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selCountry2, setselCountry2] = useState(null); // Selected country object for the second API
  // Zone-related states
  const [selZoneId2, setselZoneId2] = useState(null); // Selected zone ID for the second API
  const [selZoneName2, setselZoneName2] = useState(null); // Selected zone object for the second API
  const [stateId2, setstateId2] = useState(null); // Selected state ID for the second API
  const [selstateName2, setselstateName2] = useState(null); // Selected state object for the second API
  const [filStates2, setFilStates2] = useState([]); // Filtered states for the second API
  const [FilteredCityList, setFilteredCityList] = useState([]);
  const [countryError, setCountryError] = useState(false);
  const [zoneError, setZoneError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [status, setStatus] = useState(true);
  const [countriesActive, setCountriesActive] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
const [flag, setFlag] = useState(false);
  const handlePageChange = (newPage) => {
    setIsSearching(false);
    setPage(newPage);
    setParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString()
    }));
  };
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
  

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries2 = async () => {
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
    fetchCountries2();
  }, []);
  
  const fetchState = async () => {
    try {
      if (zoneId && !isEditing){
      setLoading(true);
      const response = await getStateList(stateName, 1, limit, countryId, zoneId, status);
      setStates(response.data.states);
      console.log("response.data", response.data);
      // setTotalRecords(response.data.totalStates);
      // setTableData(response.data.totalStates);
      // setFilteredZones(response.data.zones);
      // setFilteredCountries(response.data.countries);
    } }catch (error) {
      console.error("Error fetching countries:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchState();
  }, [zoneId]);

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

  const fetchFilState2 = async () => {
    try {
      if (selZoneId2) {
        setLoading(true);
        const response = await getStateListsearch( countryId2, selZoneId2);
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



  const fetchCities = async () => {
    try {
      if (!isSearching || flag) {
      setLoading(true);
      const response = await getCityList("", "", "", page, limit, "");
      setCities(response.data.cities);
      console.log("response.data", response.data);
      setTotalRecords(response.data.totalCities);
      setTableData(response.data.cities);
      setLoading(false);
      // setFilteredZones(response.data.zones);
      // setFilteredCountries(response.data.countries);
    } }catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [page]);

  const fetchFiltereCities = async () => {
    try {
      if (stateId && !isEditing){
      setLoading(true);
      const response = await getCityList( countryId, zoneId, stateId,  1, limit);
      setFilteredCities(response.data.cities);
      console.log("response.data", response.data);
      // setTotalRecords(response.data.totalCities);
      // setTableData(response.data.cities);
      setLoading(false);
      // setFilteredZones(response.data.zones);
      // setFilteredCountries(response.data.countries);
    }} catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchFiltereCities();
  }, []);
  

  const fetchFilteredCitiesByState = async () => {
    try {
      if (stateId2 ) {
        setLoading(true);
        const response = await getCityList(countryId2, selZoneId2, stateId2, 1, limit);
        setFilteredCityList(response.data.cities);
        console.log("Fetched cities data:", response.data);
        // Additional updates can go here
        // setTotalRecords(response.data.totalCities);
        // setTableData(response.data.cities);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchFilteredCitiesByState();
  }, [stateId2]);

 
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
      }
    } catch (error) {
      console.error("Error fetching zones:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchZones();
  }, [countryId]);

  const [postData, setPostData] = useState({
    countryId: "",
    zoneId: "",
    stateId: "",
    cityName: "",
    displayOrder: "",
    remarks: ""
  });

  const handleStatus = async (_id) => {
    try {
      
      setLoading(true);
      const response = await updateCityStatus({ id: _id });
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
        fetchCities();
      }
      else {
        // setselstateName2(stateName);
        handleSearch();
      }

      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCountryId(null);
    setZoneId(null);
    setSelectedCountry(null);
    setZoneName(null);
    setstateName(null);
    setstateId(null);
    setcityName(null);
    setEditIndex(null);
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

    if (!stateId) {
      setStateError(true);
      isValid = false;
    } else {
      setStateError(false);
    }

    if (!cityName) {
      setCityError(true);
      isValid = false;
    } else {
      setCityError(false);
    }

    if (!isValid) {
      toast.error("Please fill all the fields");
      return;
    }

    else {
      console.log("Post Data is:", postData);
      try {
        setLoading(true);
        let response;
        const postData = {
          countryId: countryId,
          zoneId: zoneId,
          stateId: stateId,
          cityName: cityName,
        }
        if (editIndex) {
          const postData = {
            _id: editIndex,
            countryId: countryId,
            zoneId: zoneId,
            stateId: stateId,
            cityName: cityName,
          }
          // Update city using PUT
          response = await updateCity(postData); // Call update API
          console.log("data is", postData);
          console.log(postData)
          toast.success("City updated successfully!");
          setEditIndex(false); // Reset the `editIndex` after update
        } else {
          response = await createCity(postData);
          console.log("data is",postData);
          toast.success("City Added Successfully");
        }
        // Reset the postData
           
      } catch (error) {
        console.log(`Error updating status ${error}`);
        toast.error(`Failed to update status`);
        throw error;
      } finally {
        if (!isSearching) {
          fetchCities();
        }
        else {
          // setselstateName2(stateName);
          handleSearch();
        }
      }
    setCountryId(null);
    setZoneId(null);
    setSelectedCountry(null);
    setZoneName(null);
    setstateName(null);
    setstateId(null);
    setcityName(null);
    setEditIndex(null);     
    setIsEditing(null);
    setLoading(false);
    }
  };

 
  const handleEdit = (_id, countryId, zoneId, countryName, zoneName, stateName, stateId, cityName) => {
    setIsEditing(true);
    setEditIndex(_id);
    setCountryId(countryId);
    setZoneId(zoneId);
    setSelectedCountry(countryName);
    setZoneName(zoneName);
    setstateName(stateName);
    setstateId(stateId);
    setcityName(cityName);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setPage(1);
      setIsSearching(true);
      // Fetch data based on the selected values
      const response = await getCityList(countryId2, selZoneId2, stateId2, 1, limit, selectedCity);
      setFilteredCities(response.data.cities);
      console.log("response.data", response.data);
      setTotalRecords(response.data.totalCities);
      setTableData(response.data.cities);
      if (totalRecords > 10) {
        setFlag(true);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };
 



  return (
    <div className="Managecity-container">
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      <HeaderNavigation value={"Location > City"} />
      <div className="autocompleteform-Managecity">
        {/* {countryId} {zoneId} {stateId} {page} {limit}{selectedCity} */}
        <Subheader heading={"Add City"} />
        <div className="textbox-main-Managecity">
          <div className="line-Managecity">
            <div className="textinput-Managecity">
        {!editIndex && (
          <Autocomplete
            id="country-autocomplete"
            clearOnEscape
            options={countriesActive}
            getOptionLabel={(option) => option.countryName}
            value={selectedCountry || null} // Controlled value
            onChange={(event, value) => {
              setCountryId(value?._id || null);
              setSelectedCountry(value || null);
              if (!value) {
                setZoneId(null);
                setZoneName(null);
                setstateId(null);
                setstateName(null);
                setfilteredzones([]);
                setStates([]);
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
            value={selectedCountry}
          />
        )}
      </div>

      <div className="textinput-Managecity">
        {!editIndex && (
          <Autocomplete
            id="zone-autocomplete"
            clearOnEscape
            options={filteredzones}
            value={zoneName || null} // Controlled value
            getOptionLabel={(option) => option.zoneName || ""}
            onChange={(event, value) => {
              setZoneId(value?._id || null);
              setZoneName(value || null);
              if (!value) {
                setstateId(null);
                setstateName(null);
                setStates([]);
              }
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
            value={zoneName}
          />
        )}
      </div>

      <div className="textinput-Managecity">
        {!editIndex && (
          <Autocomplete
            clearOnEscape
            id="state-autocomplete"
            options={states}
            value={stateName || null} // Controlled value
            getOptionLabel={(option) => option.stateName || ""}
            onChange={(event, value) => {
              setstateId(value?._id || null);
              setstateName(value || null);
              setStateError(false); // Clear error on valid selection
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State Name"
                variant="standard"
                required
                error={stateError}
                helperText={stateError ? "State is required." : null}
              />
            )}
          />
        )}
        {editIndex && (
          <TextField
            disabled
            id="outlined-basic"
            label="State Name"
            variant="standard"
            value={stateName}
          />
        )}
      </div>

            <TextField
              id="standard-basic"
              label="City"
              variant="standard"
              focused={!!cityName} // Focus only if cityName is not null or empty
              value={cityName || ""} // Default to an empty string if cityName is null
              onChange={(e) => {
                if (selZoneId2 && stateId2){
                setSelectedCity(e.target.value);
                }
                setcityName(e.target.value); // Update cityName state
                setCityError(false); // Clear error on input
              }}
              required
              error={cityError}
              helperText={cityError ? "City is required." : null}
            />
          </div>

          <div className="button-Managecity">
            <span className="buttons-Managecity-span">
              <CommonButton
                name={editIndex !== null ? "UPDATE" : "ADD"}
                handleOnClick={handlePostRequest}
              />
            </span>
            <span className="buttons-Managecity-span">
              <CommonButton name={"CANCEL"} handleOnClick={handleCancel} />
            </span>
          </div>
        </div>
      </div>

      <div className="autocompleteform-Managecity">
        <Subheader heading={"List View"} />
        <div className="line-Managecity">
          <div className="textinput-Managecity">
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
                  setSelectedCity(null);
                  setFilteredCityList([]);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Country" variant="standard" />
              )}
            />
          </div>

          <div className="textinput-Managecity">
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
                  setSelectedCity(null);
                  setFilStates2([]); // Clear states
                  setFilteredCityList([]);
                  setSelectedCity(null);
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

          <div className="textinput-Managecity">
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
                if(!value){
                  setSelectedCity(null);
                  setFilteredCityList([]);
                }

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

          <div className="textinput-Managecity">
            <Autocomplete
              id="city-autocomplete"
              options={FilteredCityList}
              getOptionLabel={(option) => option.cityName}
              value={FilteredCityList.find((city)=> city.cityName ===selectedCity) || null }
              // value={filStates2.find((state) => state.stateName === selstateName2) || null} // Ensure the value matches an option
              onChange={(event, newValue) => {
                // Update city-related states
                setSelectedCity(newValue ? newValue.cityName : null);
              }}
              renderInput={(params) => (
                <TextField {...params} label="City" variant="standard" />
              )}
            />
          </div>

          <span className="buttons-Managecity-span">
            <CommonButton name="Search" handleOnClick={handleSearch} />
          </span>
        </div>

        <div className="table-Managecity">
          <div className="excelexport-Managecity">
            <span className="buttons-Managecity-span">
              <ExportToExcel
                name="Export to Excel"
                data={tableData}
                fileName="Cities_Data"
                headers={cityHeaders}
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
                    <TableCell align="center">{row.cityName}</TableCell>
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
                            row.countryId,
                            row.zoneId,  // Corrected order
                            row.countryName,
                            row.zoneName,
                            row.stateName,
                            row.stateId,
                            row.cityName
                          )}
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
      </div>
    </div>
  );
};

export default Managecity;
