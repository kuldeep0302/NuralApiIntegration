import React, { useState, useEffect } from "react";
import "./Managezone.css";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
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
} from "@mui/material";
import CommonButton from "../../../Componants/Common/Button";
import ExportToExcel from "../../../Componants/Common/ExportToExcel";
import Paginate from "../../../Componants/Common/Paginate";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import activeIcon from "../../../Assests/activeIcon.svg";
import inactiveIcon from "../../../Assests/inactiveIcon.svg";
import editIcon from "../../../Assests/editIcon.svg";
import Subheader from "../../../Componants/Common/Subheader";
import config from "../../../Componants/Common/config";
import {
  getCountryList,
  getZoneList,
  createZone,
  updateZoneStatus,
  updateZone
} from "../../../API Service/apiService";
import { Try } from "@mui/icons-material";

const zoneHeaders = [
  { label: "S. No.", key: "serialNumber" },
  { label: "Country", key: "countryName" },
  { label: "Zone", key: "zoneName" },
];

const Managezone = () => {
  const pageSize = config.pageSize;

  const [page, setPage] = useState(1);
  const [value, setValue] = useState([]);
  const [zones, setZones] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);
  const [countries, setCountries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchZoneName, setSearchZoneName] = useState("");
  const [stateName, setStateName] = useState("")
  const [limit, setLimit] = useState(10);
  const [countryId, setCountryId] = useState("")
  const [zoneId, setZoneId] = useState("")
  const [postData, setPostData] = useState({
    countryId: "",
    zoneName: "",
    displayOrder: "",
    remarks: "",
    // page: page,
    // limit:10
  });
  const dummyGetList = {
    serialNo: "",
    countryName: "",
    zoneName: "",
    // zoneId:"",
    countryId: "",
    page: page,
    limit: 10
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // const totalItems = filteredZones.length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const [dataSize, setDataSize] = useState(pageSize);

  const [searchParams, setParams] = useState({
    ...dummyGetList,
  });


  const [totalRecords, setTotalRecords] = useState(1);
  const [flag, setFlag] = useState(false);
  const [zoneDropdown, setzoneDropdown] = useState([])

  const handlePageChange = (newPage) => {
    console.log("newPage", newPage)
    setPage(newPage);

    setParams((prevParams) => ({
      ...prevParams,
      page: newPage.toString(),
    }));
  };

  // Fetching data
  useEffect(() => {
    // Fetch zones data from API
    fetchCountries();
    fetchZone();
  }, [flag, page]);

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

  const fetchZone = async () => {
    try {
      const response = await getZoneList(searchParams);

      setZones(response.data.zones);
      console.log("response.data", response.data);
      setTotalRecords(response.data.totalZones);
      // setFilteredZones(response.data.zones);
      // setFilteredCountries(response.data.countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handlePostRequest = async () => {
    try {
      const isZoneExists = zones.some((zone) => {
        return (
          zone.zoneName === postData.zoneName &&
          zone.countryId === postData.countryId
        );
      });

      if (isZoneExists) {
        alert("This zone name is already taken for the selected country.");
        return;
      }

      // let response;

      if (editIndex !== null) {
        // response = await axios.put(
        //   `http://localhost:8090/api/v1/zone/${zones[editIndex].id}`,
        //   postData
        // );
        const response = await updateZone(postData);
        console.log("response", response);
        alert("zone update successfully!");
        setFlag(!flag);
      } else {
        try {
          const response = await createZone(postData);
          console.log("response", response);
          alert("zone added successfully!");
          setFlag(!flag);
          // setPostData({
          //   countryId: "",
          //   zoneName: "",
          //   displayOrder: "",
          //   remarks: "",
          // });
        } catch (error) {
          alert("something went wrong");
        }
      }

      // alert(response.data.message);
      setPostData({
        countryId: "",
        zoneName: "",
        displayOrder: "",
        remarks: "",
      });
      setEditIndex(null);
      // Refresh zones after a successful post
      // setFilteredZones((prev) => [...prev, response.data]);
    } catch (error) {
      alert("Error making POST request:", error);
    }
  };

  const handleEdit = (index) => {
    const zoneToEdit = zones[index];
    setPostData({ ...zoneToEdit });
    setEditIndex(index);
  };

  const handleSearch = async () => {
    try {
      const response = await getZoneList(searchParams);

      setZones(response.data.zones);
      setPage(1)
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleSearchChange = async (fieldName, value) => {

    if (fieldName === "countryId" && !value) {
      setzoneDropdown([]);
      setParams((prev) => ({
        ...prev,
        countryId: "",
        zoneName: "",
      }));
      return;
    }

    if (fieldName === "countryId" && value) {
      console.log("value", value)
      setParams((p) => ({
        ...p,
        countryId: value,
        zoneName: "",
      }));
      // setLoading(true);
      try {
        const body = {
          countryId: value,
          search: "",
        };
        let res = await getZoneList(body);
        console.log("res.data.zones", res.data.zones)
        setzoneDropdown(res.data.zones);
      } catch (error) {
        console.log("Error fetching", error);
        // toast.error(MenuConstants.errorwhilegettinglist, "model list");
      } finally {
        // setLoading(false);
      }
    }

    if (fieldName === "zoneName" && value) {
      console.log("value", value)
      setParams((p) => ({
        ...p,
        // zoneId: value,
        zoneName: value,
      }));
      // setLoading(true);
    }


  }

  const handleStatus = async (index, zoneId) => {
    try {
      const response = await updateZoneStatus({ id: zoneId });
      console.log(`status resposne : ${response.status}`)

      if (response.status === "success") {
        // toast.success("Status Updated Successfully");
        // console.log("success")
        // fetchZone()
        if (searchParams.countryId == "") {
          const response = await getZoneList();

          setZones(response.data.zones);
        }

        else {
          console.log("else running")
          const response = await getZoneList(searchParams);

          setZones(response.data.zones);

        }
      }
      // setFlag(!flag)
    } catch (error) {
      console.log(`Error updating status ${error}`);
      // toast.error(`Failed to update status`);
      throw error;
    } finally {
      // setLoading(false);
    }
  };

  const startingSerialNumber = (page - 1) * pageSize + 1;


  // const formattedZones = paginatedZones.map((zone, index) => ({
  //   serialNumber: index + 1,
  //   countryName:
  //     countries.find((country) => country.id === zone.countryId)?.countryName ||
  //     "",
  //   zoneName: zones.find((zone) => zone.id === zone.zoneId)?.zoneName || ""
  // }));

  return (
    <div className="managezone-container">
      <HeaderNavigation value={"Location > Zone"} />

      <div className="autocompleteform-managezone">
        <Subheader heading={"Add Zone"} />
        <div className="textbox-main-Managezone">
          <div className="line-managezone">
            <div className="textinput-managezone">
              <Autocomplete
                id="country-autocomplete"
                clearOnEscape
                options={countries.map((country) => ({
                  countryId: country._id,
                  label: country.countryName,
                }))}
                getOptionLabel={(option) => option.label || ""}
                onChange={(e, newValue) =>
                  setPostData({
                    ...postData,
                    countryId: newValue?.countryId || postData.countryId, // Persist value if not explicitly removed
                  })
                }
                value={
                  countries
                    .map((country) => ({
                      countryId: country._id,
                      label: country.countryName,
                    }))
                    .find(
                      (option) => option.countryId === postData.countryId
                    ) || null
                }
                isOptionEqualToValue={(option, value) =>
                  option.countryId === value?.countryId
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country Name"
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      ...params.InputProps,
                      style: {
                        background: "#EFF3FE",
                        borderBottom: "1px solid #ccc",
                      },
                    }}
                  />
                )}
              />
            </div>

            <div className="textinput-managezone">
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Zone"
                variant="standard"
                value={postData.zoneName}
                onChange={(e) => {
                  setPostData({ ...postData, zoneName: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="button-managezone">
            <span className="buttons-managezone-span">
              <CommonButton
                name={editIndex !== null ? "UPDATE" : "ADD"}
                handleOnClick={handlePostRequest}
              />
            </span>
            <span className="buttons-managezone-span">
              <CommonButton name={"CANCEL"} />
            </span>
          </div>
        </div>
      </div>

      <div className="autocompleteform-managezone">
        <Subheader heading={"List View"} />
        <div className="line-managezone">
          <div className="textinput-managezone">
            <Autocomplete
              id="country-autocomplete"

              options={countries}
              getOptionLabel={(option) => option.countryName}
              onChange={(event, value) => {
                handleSearchChange(
                  "countryId",
                  value ? value._id : 0
                );

                // Update the subcategory value when selected
              }}
              value={
                countries.find(
                  (option) => option._id === searchParams.countryId
                ) || null
              }
              isOptionEqualToValue={(option, value) =>
                option._id === value?.modelID
              }
              renderInput={(params) => (
                <TextField {...params} label="Country" variant="standard" />
              )}
            />
          </div>

          <div className="textinput-managezone">
            {/* <TextField
              id="standard-basic"
              label="Zone"
              variant="standard"
              value={searchZoneName}
              onChange={(e) => setSearchZoneName(e.target.value)}
            /> */}
            <Autocomplete
              id="zone-Autocomplete"
              // sx={{mt:2}}
              options={zoneDropdown}
              getOptionLabel={(option) => option.zoneName}
              onChange={(event, value) => {
                handleSearchChange("zoneName", value ? value.zoneName : 0);
                // Update the subcategory value when selected
              }}
              value={
                zoneDropdown.find(
                  (option) => option.zoneName === searchParams.zoneName
                ) || null
              }
              isOptionEqualToValue={(option, value) =>
                option.zoneName === value?.zoneName
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

          <div className="textinput-managecountry">
            <span className="buttons-managecountry-span">
              <CommonButton name="Search" handleOnClick={handleSearch} />
            </span>{" "}
          </div>
        </div>
        <div className="table-Managezone">
          <div className="excelexport-Managecity">
            <span className="buttons-Managecity-span">
              <ExportToExcel
                name="Export to Excel"
                // data={formattedZones}
                fileName="Zones_Data"
                headers={zoneHeaders}
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
                  <TableCell sx={{ color: "#fff" }} align="right">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {filteredZones.map((zone, index) => ( */}
                {zones.map((zone, index) => (
                  <TableRow
                    key={zone.id}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{startingSerialNumber + index} </TableCell>
                    <TableCell align="center">{zone.countryName}</TableCell>
                    <TableCell align="center">{zone.zoneName}</TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >

                      <IconButton
                        onClick={() => handleStatus(index, zone._id)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={zone.active === false ? inactiveIcon : activeIcon}
                          alt="active"
                          height={"20px"}
                          width={"20px"}
                        />
                      </IconButton>

                      <IconButton
                        onClick={() => handleEdit(index)}
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

export default Managezone;
