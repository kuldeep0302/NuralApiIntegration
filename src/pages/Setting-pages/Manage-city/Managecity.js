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
  { label: "City", key: "cityName" }
];

const Managecity = () => {
  const pageSize = config.pageSize;
  const dummyGetList = {
    serialNo: "",
    countryName: "",
    zoneName: "",
    stateName:"",
    cityName:"",
    pageSize: pageSize
  };
 

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);

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
  const [searchParams, setParams] = useState({
    ...dummyGetList
  });

  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);

  const handlePageChange = (newPage) => {
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
   const fetchState = async () => {
      try {
        const response = await getStateList(searchParams);
        setStates(response.data.states);
        console.log("response.data", response.data);
        // setTotalRecords(response.data.totalStates);
        // setFilteredZones(response.data.zones);
        // setFilteredCountries(response.data.countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
  const fetchCities= async () => {
    try {
      setLoading(true);
      const response = await getCityList(searchParams);
      setCities(response.data.cities);
      console.log("response.data", response.data);
      setTotalRecords(response.data.totalCities);
      setLoading(false);
      // setFilteredZones(response.data.zones);
      // setFilteredCountries(response.data.countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  useEffect(() => {
    fetchCountries();
    fetchState();
    fetchCities();
   
  }, []);
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
      fetchCities();
    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPostData({
      countryId: "",
      zoneId: "",
      stateId: "",
      cityName: "",
      displayOrder: "",
      remarks: ""
    });
    setEditIndex(null);
  }

  const handlePostRequest = async () => {
    console.log("Post Data is:", postData);
    try {
      setLoading(true);
      const isStateExists = states.some((state) => {
        return (
          state.stateName === postData.stateName &&
          state.zoneId === postData.zoneId
        );
      });

      if (isStateExists) {
        alert("This state name is already taken for the selected zone.");
        return;
      }

      let response;

      if (editIndex) {
        // Update city using PUT
        const updateData = { ...postData, _id: editIndex };
        response = await updateCity(updateData); // Call update API
        console.log("Update response:", response);
        alert("City updated successfully!");
        setEditIndex(false); // Reset the `editIndex` after update
      } else {
        response = await createCity(postData);
      }
      // Reset the postData
      setPostData({
        countryId: "",
        zoneId: "",
        stateId: "",
        cityName: "",
        displayOrder: "",
        remarks: "",
      });

      // Refresh cities list
      setFilteredCities((prev) => [...prev, response.data]);
    } catch (error) {
      // Handle 409 Conflict error
      if (error.response?.status === 409) {
        alert("City is already present for the same zone.");
      } else {
        console.error("Error making POST request:", error);
        alert("Error making POST request: " + (error.response?.data?.message || error.message));
      }
    }
    fetchCities();
    setLoading(false);
  };


  const handleEdit = (_id, countryId, zoneId, zoneName, stateId, cityName) => {
    setZoneAddDropdown([{ _id: zoneId, zoneName }]); 
    setEditIndex(_id);
    setPostData({
      _id,
      countryId,
      zoneId,
      stateId,
      cityName,
    });
    };

  const handleSearch = () => { 
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
    if (fieldName === "stateId" && value) {
      setPostData((prev) => ({
        ...prev,
        stateId: value,
      }));
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
    <div className="Managecity-container">
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      <HeaderNavigation value={"Location > City"} />
      <div className="autocompleteform-Managecity">
        <Subheader heading={"Add City"} />
        <div className="textbox-main-Managecity">
          <div className="line-Managecity">
            <div className="textinput-Managecity">
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
            <div className="textinput-Managecity">
              <Autocomplete
                id="zone-Autocomplete"
                // sx={{mt:2}}
                options={zoneAddDropdown}
                getOptionLabel={(option) => option.zoneName}
                onChange={(event, value) => {
                  handleAddState("zoneId", value ? value._id : 0);
                  // Update the subcategory value when selected
                }}
                value={
                  zoneAddDropdown.find(
                    (option) => option._id === postData.zoneId
                  ) || null
                }
                isOptionEqualToValue={(option, value) =>
                  option._id === value?._id
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="zone"
                    variant="standard"
                    className="mt-1 app-input-width"
                  />
                )}
              />
            </div>
            <div className="textinput-Managecity">
              <Autocomplete
                id="state-autocomplete"
                options={
                  postData.zoneId
                    ? states.filter((state) => state.zoneId === postData.zoneId) // Filter states based on selected zoneId
                    : [] // No options if no zone is selected
                }
                getOptionLabel={(option) => option.stateName}
                onChange={(event, value) => {
                  handleAddState("stateId", value ? value._id : 0); // Update postData with stateId
                }}
                value={
                  states.find((option) => option._id === postData.stateId) || null
                } // Preselect the correct state based on postData.stateId
                isOptionEqualToValue={(option, value) =>
                  option._id === value?._id
                } // Ensure selected state matches the option
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


            <TextField
              id="standard-basic"
              label="City"
              variant="standard"
              value={postData.cityName} // Bind the input value to postData.cityName
              onChange={(e) => {
                setPostData({ ...postData, cityName: e.target.value });
              }}
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
              options={cities
                .filter((city) => countries.some((country) => country.countryName === city.countryName))
                .map((city) => ({
                  value: city.countryName,
                  label: city.countryName,
                }))
                .filter(
                  (country, index, self) =>
                    index === self.findIndex((c) => c.label === country.label) // Remove duplicates
                )}
              onChange={(e, newValue) => {
                setSelectedCountry(newValue);
                setSelectedZone(null); // Reset zone when country changes
                setSelectedState(null); // Reset state when country changes
                setSelectedCity(null); // Reset city when country changes
              }}
              renderInput={(params) => (
                <TextField {...params} label="Country" variant="standard" />
              )}
            />
          </div>

          <div className="textinput-Managecity">
            <Autocomplete
              id="zone-autocomplete"
              options={
                selectedCountry
                  ? cities
                    .filter((city) => city.countryName === selectedCountry.label)
                    .map((city) => ({
                      value: city.zoneName,
                      label: city.zoneName,
                    }))
                    .filter(
                      (zone, index, self) =>
                        index === self.findIndex((z) => z.label === zone.label) // Remove duplicates
                    )
                  : []
              }
              onChange={(e, newValue) => {
                setSelectedZone(newValue);
                setSelectedState(null); // Reset state when zone changes
                setSelectedCity(null); // Reset city when zone changes
              }}
              renderInput={(params) => (
                <TextField {...params} label="Zone Name" variant="standard" />
              )}
            />
          </div>

          <div className="textinput-Managecity">
            <Autocomplete
              id="state-autocomplete"
              options={
                selectedCountry && selectedZone
                  ? cities
                    .filter(
                      (city) =>
                        city.countryName === selectedCountry.label &&
                        city.zoneName === selectedZone.label
                    )
                    .map((city) => ({
                      value: city.stateName,
                      label: city.stateName,
                    }))
                    .filter(
                      (state, index, self) =>
                        index === self.findIndex((s) => s.label === state.label) // Remove duplicates
                    )
                  : []
              }
              onChange={(e, newValue) => {
                setSelectedState(newValue);
                setSelectedCity(null); // Reset city when state changes
              }}
              renderInput={(params) => (
                <TextField {...params} label="State" variant="standard" />
              )}
            />
          </div>

          <div className="textinput-Managecity">
            <Autocomplete
              id="city-autocomplete"
              options={
                selectedCountry && selectedZone && selectedState
                  ? cities
                    .filter(
                      (city) =>
                        city.countryName === selectedCountry.label &&
                        city.zoneName === selectedZone.label &&
                        city.stateName === selectedState.label
                    )
                    .map((city) => ({
                      value: city.cityName,
                      label: city.cityName,
                    }))
                  : []
              }
              value={selectedCity}
              onChange={(e, newValue) => setSelectedCity(newValue)}
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
                data={cities}
                fileName="Cities_Data"
                headers={cityHeaders}
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
                  <TableCell sx={{ color: "#fff" }} align="center">
                    City
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="right">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cities.length > 0 ? (
                  cities
                    .filter((city) => {
                      if (!searchActivated) {
                        return true; // Show all rows if search is not activated
                      }
                      return (
                        (!selectedCity || city.cityName===selectedCity.label) && // Match cityName if provided
                        (!selectedState || city.stateName === selectedState.label || "") && // Match stateName if provided
                        (!selectedCountry || city.countryName === selectedCountry.label || "") && // Match countryName if provided
                        (!selectedZone || city.zoneName === selectedZone.label || "") // Match zoneName if provided
                      );
                    })
                  .slice((page - 1) * dataSize, page * dataSize) 
                  .map((city, index) => (
                    <TableRow key={city._id}>
                      <TableCell align="left">
                        {(page - 1) * dataSize + index + 1} {/* Index adjusted for pagination */}
                      </TableCell>
                      <TableCell align="center">{city.countryName}</TableCell>
                      <TableCell align="center">{city.zoneName}</TableCell>
                      <TableCell align="center">{city.stateName}</TableCell>
                      <TableCell align="center">{city.cityName}</TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        >
                        <IconButton
                          onClick={() => handleStatus(city._id)}
                          sx={{
                            outline: "none",
                            "&:focus": { outline: "none" },
                          }}
                        >
                          <img
                            src={city.active === false ? inactiveIcon : activeIcon}
                            alt="active"
                            height="20px"
                            width="20px"
                          />
                        </IconButton>

                        <IconButton
                          onClick={() => handleEdit(city._id, city.countryId, city.zoneId, city.zoneName, city.stateId, city.cityName)}
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
                    <TableCell align="center" colSpan={6}>
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

export default Managecity;
