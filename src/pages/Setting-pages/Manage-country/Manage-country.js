import React, { useState, useEffect } from "react";
import "./Managecountry.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { createCountry,getCountryList,updateCountryStatus,updateCountry } from "../../../API Service/apiService";
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
import Paginate from "../../../Componants/Common/Paginate";
import ExportToExcel from "../../../Componants/Common/ExportToExcel";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import activeIcon from "../../../Assests/activeIcon.svg";
import inactiveIcon from "../../../Assests/inactiveIcon.svg";
import editIcon from "../../../Assests/editIcon.svg";
import Subheader from "../../../Componants/Common/Subheader";
import config from "../../../Componants/Common/config";
import toast, { Toaster } from "react-hot-toast";
import { library } from "@fortawesome/fontawesome-svg-core";

const countryHeaders = [
  { label: "S. No.", key: "serialNumber" },
  { label: "Country", key: "countryName" },
];


const Managecountry = ({ isSidebarCollapsed }) => {
  const [sidebarClass, setSidebarClass] = useState(
    isSidebarCollapsed ? "collapsed" : "expanded"
  );

  useEffect(() => {
    setSidebarClass(isSidebarCollapsed ? "collapsed" : "expanded");
  }, [isSidebarCollapsed]);
  const [page, setPage] = useState(1);
  const pageSize = config.pageSize;
  const dummyGetList = {
    serialNo: "",
    countryName: "",
    page: page,
    limit:pageSize
  };
  const [value, setValue] = React.useState([]);
  const [countries, setCountries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const [postData, setPostData] = useState({
   
    countryCode: "",
    countryName: "",
    Status: "",
   
  });

  const [selectedCountry, setSelectedCountry] = useState(null); // State to hold the selected country
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalItems = filteredCountries.length;

  const startIndex = (currentPage - 1) * itemsPerPage;

  // const paginatedCountries = filteredCountries.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );

  const [dataSize, setDataSize] = useState(pageSize);
  const [searchParams, setParams] = useState({
    ...dummyGetList,
  });
  // const[flag,setFlag] = useState(false)

 
  const [totalRecords, setTotalRecords] = useState(1);
  const [countryId,setcountryId]=useState("")

  const handlePageChange = (newPage) => {
    setPage(newPage);

    setParams((prevParams) => ({
      ...prevParams,
      page: newPage.toString(),
    }));
  };

  const handleSearch = () => {
    if (selectedCountry) {
      const filtered = countries.filter(
        (country) => country._id === selectedCountry.value
      );
      console.log("filtered",filtered)
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries); // Reset to all countries if no selection
    }
  };

  const handlePostRequest = async () => {
    try {
      if (editIndex !== null) {
        // If editIndex is not null, it means we are editing an existing country
        const editedCountry = countries[editIndex];
        const isNameDuplicate = countries.some(
          (country, index) =>
            index !== editIndex &&
            country.countryName.toUpperCase() ===
              postData.countryName.toUpperCase()
        );
        const isCodeDuplicate = countries.some(
          (country, index) =>
            index !== editIndex &&
            country.countryCode.toUpperCase() ===
              postData.countryCode.toUpperCase()
        );

        if (isNameDuplicate && isCodeDuplicate) {
          alert("Country with the same name and code already exists");
          return; // Prevent the PUT request
        } else if (isNameDuplicate) {
          alert("Country with the same name already exists");
          return; // Prevent the PUT request
        } else if (isCodeDuplicate) {
          alert("Country with the same code already exists");
          return; // Prevent the PUT request
        }
        const editBody={
          countryId,
          ...postData
        }
        const response = await updateCountry(editBody)
        console.log("Server response:", response.data);
        alert(response.data.message);
        fetchCountries(); // Refresh country list
      } else {
        // If editIndex is null, it means we are creating a new country

        // const isNameExists = countries.some(
        //   (country) =>
        //     country.countryName.toUpperCase() ===
        //     postData.countryName.toUpperCase()
        // );
        // console.log("Running","create")
        const response = await createCountry(postData)
        console.log("Server response:", response);
        alert("Tax added successfully!");
        // const response = await axios.post(
        //   "http://localhost:8090/api/v1/country",
        //   postData
        // );
        
        // alert(response.data);
        fetchCountries(); // Refresh country list
      }

      // Clear text fields after saving data
      setPostData({
        // displayOrder: "",
        countryCode: "",
        countryName: "",
        Status: "",
        // currency: ""
      });
      setEditIndex(null);
    } catch (error) {
      alert(`Message:${ error.response.data.message}`)
    }
  };

  useEffect(() => {
    // Fetch data from API
    fetchCountries();

    // axios
    //   .get("http://localhost:8090/api/v1/countries")
    //   .then((res) => {
    //     setCountries(res.data.data);
    //     const updatedCallSource = res.data.data.map((item) => {
    //       return { value: item.id, label: item.countryName };
    //     });

    //     setValue(updatedCallSource);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching countries data:", error);
    //   });
  }, [page]);

  const fetchCountries = async () => {
    try {
      const response = await getCountryList(searchParams);
      setCountries(response.data.countries);
      console.log("response.data",response.data)
      setFilteredCountries(response.data.countries);
      setTotalRecords(response.data.totalCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleEdit = (index) => {
    const countryToEdit = filteredCountries[index];
    console.log("countryToEdit",countryToEdit)
    // setPostData({ ...countryToEdit });
    setcountryId(countryToEdit._id)
    setPostData((p)=>({
      ...p,
      
      countryCode: countryToEdit.countryCode,
      countryName: countryToEdit.countryName,
      Status: countryToEdit.active,
      
     }))
    setEditIndex(index);
  };

  const handleStatus = async (index, countryId) => {
    try {
      const response = await updateCountryStatus({ countryId: countryId });
      console.log(`status resposne : ${response.status}`)

      if (response.status === "success") {
        toast.success("Status Updated Successfully");
      }
      if(selectedCountry!=null)
     { setFilteredCountries([response.data])}
      else{
      fetchCountries()
     }
      // setFlag(!flag)
    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const startingSerialNumber = (page - 1) * pageSize + 1;

  useEffect(() => {
    console.log("postData after update:", postData);
  }, [postData]);

  // const formattedCountries = paginatedCountries.map((country, index) => ({
  //   serialNumber: index + 1,
  //   countryName:
  //     countries.find(
  //       (matchingCountry) => matchingCountry.id === country.countryId
  //     )?.countryName || "",
  // }));

  return (
    // <div
    //   className={`managecountry-container ${
    //     isSidebarExpanded ? "expanded" : "collapsed"
    //   }`}
    // >
    <div className={`managecountry-container ${sidebarClass}`}>
      <HeaderNavigation value={"Location > Country"} />

      <div className="autocompleteform-managecountry">
        <div className="line-managecountry">
          <div className="textinput-managecountry">
            <div className="textinput2-managecountry">
              <Subheader heading={"Add Country"} />
            </div>

            <TextField
               style={{ width: "100%" }}
               id="countryName"
               label="Country"
               variant="standard"
               value={postData.countryName}
                onChange={(e) => {
                       const value = e.target.value.toUpperCase(); // Convert to uppercase
                      setPostData({
                                ...postData,
                                countryName: value,
                                countryCode: value, // Set countryCode same as countryName
                                 });
                               }}
                         />

          </div>
        </div>

        <div className="button-managecountry">
          <span className="buttons-managecountry-span">
            <CommonButton
              name={editIndex !== null ? "UPDATE" : "ADD"}
              handleOnClick={handlePostRequest}
            />
          </span>
          <span className="buttons-managecountry-span">
            <CommonButton  name={"CANCEL"}handleOnClick={() => {setPostData({ countryCode: "", countryName: "",Status: "",});
            }}
             />
          </span>
        </div>
      </div>

      <div className="autocompleteform-managecountry">
        <div className="line-managecountry">
          <div className="textinput2-managecountry">
            <Subheader heading={"List View"} />
            
          </div>
        </div>

        <div className="line-managecountry">
          <div className="textinput-managecountry">
            <Autocomplete
              id="country-autocomplete"
              options={countries.map((country) => ({
                value: country._id,
                label: country.countryName,
              }))}
              onChange={(e, newValue) => setSelectedCountry(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Country" variant="standard" />
              )}
            />
          </div>

          <div className="textinput-managecountry">
            <CommonButton name="Search" handleOnClick={handleSearch} />
          </div>
          <div className="textinput-managecountry"></div>
          <div className="textinput-managecountry"></div>
        </div>

        <div className="table-managecountry">
          <div className="excelexport-Managecity">
            <span className="buttons-Managecity-span">
              <ExportToExcel
                name="Export to Excel"
                data={countries}
                fileName="Countries_Data"
                headers={countryHeaders}
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
                  <TableCell sx={{ color: "#fff" }} align="right">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {filteredCountries.map((country, index) => ( */}
                {filteredCountries.map((country, index) => (
                  <TableRow
                    key={country.id}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{startingSerialNumber + index} </TableCell>
                    <TableCell align="center">{country.countryName}</TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        onClick={() => handleStatus(index,country._id)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                           src={country.active === false ? inactiveIcon : activeIcon}
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

export default Managecountry;
