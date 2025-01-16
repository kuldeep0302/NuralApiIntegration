import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Button from "@mui/material/Button";
import "./Customerservice.css";
import HeaderNavigation from "../../../../Componants/Common/header Navigation/HeaderNavigation";
import { Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import CommonButton from "../../../../Componants/Common/Button";
import InputFileUpload from "../../../../Componants/Common/Bulk Upload/InputFileUpload";
import { createCustomers, getCityList, getCountryList, getStateList } from "../../../../API Service/apiService";
import config from "../../../../Componants/Common/config";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../../Componants/Loader/Loader";
const calltype = [];
const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];
const Customerservice = () => {
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

  const [dataSize, setDataSize] = useState(pageSize);
  const [zoneAddDropdown, setZoneAddDropdown] = useState([]);
  const [searchParams, setParams] = useState({
    ...dummyGetList
  });

  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);



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
    
  const [value, setValue] = useState({
    customerCompanyName: "",
    contactPersonName: "",
    email: "",
    mobileNo: "",
  });

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };
  const handleCreate = async () => {
    const data = {
      customerName: value.customerName,
      mobileNumber: value.mobileNumber,
      email: value.email,
      address: value.address,
      city: value.city,
      state: value.state,
      country: value.country,
      pincode: value.pincode,
      gstNumber: value.gstNumber,
      landmark: value.landmark,
    };

    // Validate input fields
    const requiredFields = [
      "customerName",
      "mobileNumber",
      "email",
      "address",
      "city",
      "state",
      "country",
      "pincode",
      "gstNumber",
    ];

    for (let field of requiredFields) {
      if (!data[field]) {
        alert(`${field} is required.`);
        return;
      }
    }

    // Additional validation
    if (!/^\d{10}$/.test(data.mobileNumber)) {
      alert("Valid mobile number is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      alert("Valid email is required.");
      return;
    }
    if (!/^\d{6}$/.test(data.pincode)) {
      alert("Valid 6-digit pincode is required.");
      return;
    }

    try {
      setLoading(true);
      // Call API to create customer
      const response = await createCustomers(data);
      console.log("Customer added successfully:", response.data);
      alert("Customer created successfully!");
    } catch (error) {
      console.error("Error creating customer:", error);

      // Check if error has a response with a message from the backend
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setValue({
        customerName: "",
        mobileNumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        landmark: "",
        gstNumber: "",
      });
      setLoading(false);
    }
  };

  return (
    <Grid container>
      {loading && <Loader/>}
      <Toaster position="top-center" reverseOrder={false} />
      <HeaderNavigation value={"Create Customer"} />
      <Grid
        container
        gap={3}
        sx={{
          background: "#EFF3FE",
          margin: "4px 10px 0 10px",
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
          width: "100%",
          borderRadius: "5px",
          padding: "10px 10px 10px 10px",
          fontWeight: 600,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <h4>Customer Details</h4>
        </Box>
       
        <Grid container spacing={5}>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Customer Name"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, customerName: e.target.value });
              }}
            />
          </Grid>
           
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Mobile No."
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, mobileNumber: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Email"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, email: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={countries}
              getOptionLabel={(option) => option.countryName}
              onChange={(e, val) => {
                // `val` is the selected option
                setValue({ ...value, country: val ? val.countryName : "" }); // Set stateName from the selected option
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container mt="3" spacing={4}>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={states}
              getOptionLabel={(option) => option.stateName}
              onChange={(e, val) => {
                // `val` is the selected option
                setValue({ ...value, state: val ? val.stateName : "" }); // Set stateName from the selected option
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={cities}
              getOptionLabel={(option) => option.cityName}
              onChange={(e, val) => {
                // `val` is the selected option
                setValue({ ...value, city: val ? val.cityName : "" }); // Set stateName from the selected option
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Address"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, address: e.target.value });
              }}
            />
          </Grid>
          
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Pin Code"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, pincode: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Landmark"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, landmark: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="GSTIN No."
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, gstNumber: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <Grid container gap={2}>
          <Grid item>
            <CommonButton name={"Create"} handleOnClick={handleCreate} />
          </Grid>
          <Grid item>
            <CommonButton name={"Cancel"} />
          </Grid>
        </Grid>
        <Divider
          sx={{ height: "1px", backgroundColor: "lightgray", width: "100%" }}
        />

        <Box sx={{ width: "100%" }}>
          <h4>Product Details</h4>
        </Box>
        <Grid container mt="3" spacing={4}>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Sub Category"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Model"
                  variant="standard"
                  style={{ width: "12.5rem" }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Invoice No."
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Serial No."
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Purchased From"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, workflowName: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <InputFileUpload/>
          </Grid>
        </Grid>
        <Grid container gap={2}>
          <Grid item>
            <CommonButton name={"Create"} />
          </Grid>
          <Grid item>
            <CommonButton name={"Cancel"} />
          </Grid>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </Grid>
  );
};

export default Customerservice;
