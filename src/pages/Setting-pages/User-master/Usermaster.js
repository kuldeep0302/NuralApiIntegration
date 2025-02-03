import React, { useEffect, useState } from "react";
import "./Usermaster.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Radio from "@mui/material/Radio";
import CommonButton from "../../../Componants/Common/Button";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import { createUser, getCityList, getStateList } from "../../../API Service/apiService";

const calltype = [];

const Usermaster = () => {
  const [entityType, setEntityType] = useState("serviceCenter");
  const [selectedValue, setSelectedValue] = useState("ui"); // Default is "UI"
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const handleEntityChange = (e, val) => {
    if (val) {
      setEntityType(val.title); // Set the entityType separately if needed
      setValue({ ...value, entityType: val.title }); // Update the entityType in the value object
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Only one radio button can be selected
  };

  // const [value, setValue] = useState({
  //   customerCompanyName: "",
  //   contactPersonName: "",
  //   email: "",
  //   mobileNo: "",
  // });

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  const EntityType = [
    { title: "Engineer", Value: 1 },
    { title: "serviceCenter", Value: 2 },
  ];

 

  const handleCheckboxChange1 = () => {
    setChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setChecked2(!isChecked2);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState([]);
  const [totalRecords, setTotalRecords] = useState([]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
    } else {
      console.log("No file selected.");
    }
  };

  const shouldHideField = (field) => {
    if (entityType === "serviceCenter") {
      return (
        field === "loginName" ||
        field === "password" ||
        field === "serviceCenter"
      );
    } else if (entityType === "Engineer") {
      return [
        "landline",
        "addressLine1",
        "addressLine2",
        "state",
        "city",
        "landmark",
        "pincode",
        "serviceCentertext",
      ].includes(field);
    }
    return false;
  };

  const [value, setValue] = useState({
    entityType: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    landline: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    landmark: "",
    pincode: "",
  });

  const handleSave = async () => {
    
    const data = {
      entityType: value.entityType,
      firstName: value.firstName,
      lastName: value.lastName,
      mobile: value.mobile,
      email: value.email,
      landline: value.landline || "",
      addressLine1: value.addressLine1,
      addressLine2: value.addressLine2 || "",
      state: value.state,
      city: value.city,
      landmark: value.landmark || "",
      pincode: value.pincode,
    };

    const requiredFields = [
      { field: "entityType", message: "Entity type is required." },
      { field: "firstName", message: "First name is required." },
      { field: "lastName", message: "Last name is required." },
      { field: "mobile", message: "Mobile number is required." },
      { field: "email", message: "Email is required." },
      { field: "addressLine1", message: "Address Line 1 is required." },
      { field: "state", message: "State is required." },
      { field: "city", message: "City is required." },
      { field: "pincode", message: "Pincode is required." },
    ];

    // Check for missing required fields
    for (let { field, message } of requiredFields) {
      if (!data[field] || data[field].trim() === "") {
        alert(message);
        return;
      }
    }

    // Additional validations
    if (!/^\d{10}$/.test(data.mobile)) {
      alert("Mobile number must be 10 digits.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      alert("Enter a valid email address.");
      return;
    }

    if (!/^\d{6}$/.test(data.pincode)) {
      alert("Pincode must be a valid 6-digit number.");
      return;
    }

    try {
      setLoading(true);
      const response = await createUser(data);
      console.log("Data saved successfully:", response);
      setLoading(false);
      alert("Data saved successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error saving data:", error.response?.data || error.message);
      alert("Failed to save data. Please try again.");
    }
  };

 // Track the selected state

  const fetchState = async () => {
        try {
          const response = await getStateList();
          setStates(response.data.states);
          console.log("response.data", response.data);
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
      };

    const fetchCities= async () => {
      try {
        setLoading(true);
        const response = await getCityList();
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
      
      fetchState();
      fetchCities();
      }, []);
  const filteredCities = selectedState
    ? cities.filter((city) => city.stateName === selectedState.stateName)
    : [];

  return (
    <>
      <HeaderNavigation value={"User Master"} />

      <div className="Usermaster-container">
        <div className="createuu-Usermaster">
          <div>
            <h4>Create User Using:</h4>
          </div>

          <div className="rediobutton-Usermaster">
            <div className="first-rediobutton-Usermaster">
              <div>
                <Radio
                  checked={selectedValue === "excel"} // Check if the selected value is "excel"
                  onChange={handleChange}
                  value="excel"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Excel" }}
                />
              </div>
              <div>
                <p>Excel</p>
              </div>
            </div>
            <div className="secound-rediobutton-Usermaster">
              <div>
                <Radio
                  checked={selectedValue === "ui"} // Check if the selected value is "ui"
                  onChange={handleChange}
                  value="ui"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "UI" }}
                />
              </div>
              <div>
                <p>UI</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedValue === "ui" && (
        <div className="ui-Usermaster">
          <div className="text-auti-form-Usermaster">
            <div className="line-Usermaster">
              <div className="textinput-Usermaste">
                <Autocomplete
                  value={{ title: entityType }}
                  onChange={handleEntityChange}
                  {...calltypeDefaultProps}
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  options={EntityType}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Entity Type"
                      variant="standard"
                    />
                  )}
                />
              </div>

              {/* {!shouldHideField("serviceCenter") && (
                <div className="textinput-Usermaste">
                  <Autocomplete
                    onChange={(e, val) => {
                      setValue({ ...value, role: val.title });
                    }}
                    {...calltypeDefaultProps}
                    id="disable-close-on-select"
                    disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service Center"
                        variant="standard"
                      />
                    )}
                  />
                </div>
              )} */}

              {/* {!shouldHideField("serviceCentertext") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Service Center"
                    variant="standard"
                    onChange={(e) => {
                      setValue({ ...value, servicecenter: e.target.value });
                    }}
                  />
                </div>
              )} */}

              <div className="textinput-Usermaste"></div>
              <div className="textinput-Usermaste"></div>
            </div>

            <div className="line-Usermaster">
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                  onChange={(e) => {
                    setValue({ ...value, firstName: e.target.value });
                  }}
                />
              </div>
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  onChange={(e) => {
                    setValue({ ...value, lastName: e.target.value });
                  }}
                />
              </div>
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Mobile"
                  variant="standard"
                  onChange={(e) => {
                    setValue({ ...value, mobile: e.target.value });
                  }}
                />
              </div>
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  onChange={(e) => {
                    setValue({ ...value, email: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="line-Usermaster" id="address-usermaster">
              {!shouldHideField("landline") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Landline"
                    variant="standard"
                    onChange={(e) => {
                      setValue({ ...value, landline: e.target.value });
                    }}
                  />
                </div>
              )}
              {!shouldHideField("addressLine1") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Address Line 1"
                    variant="standard"
                    onChange={(e) => {
                      setValue({ ...value, addressLine1: e.target.value });
                    }}
                  />
                </div>
              )}
              {!shouldHideField("addressLine2") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Address Line 2"
                    variant="standard"
                    onChange={(e) => {
                      setValue({ ...value, addressLine2: e.target.value });
                    }}
                  />
                </div>
              )}
              {!shouldHideField("state") && (
                <div className="textinput-Usermaste">
                  <Autocomplete
                    options={states}
                    getOptionLabel={(option) => option.stateName}
                    onChange={(event, newValue) => {
                      setSelectedState(newValue); // Update selected state
                      setValue({ ...value, state: newValue ? newValue.stateName : "" }); // Update state name in form value
                      
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="State" variant="standard" />
                    )}
                  />
                </div>
              )}
            </div>

            <div className="line-Usermaster">
              {!shouldHideField("city") && (
                <div className="textinput-Usermaste">
                  <Autocomplete
                    options={filteredCities}
                    getOptionLabel={(option) => option.cityName}
                    onChange={(event, newValue) => {
                      setValue({ ...value, city: newValue ? newValue.cityName : "" }); // Update city name in form value
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="City" variant="standard" />
                    )}
                  />
                </div>
              )}
              {!shouldHideField("landmark") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Landmark"
                    variant="standard"
                    onChange={(e) => {
                      setValue({ ...value, landmark: e.target.value });
                    }}
                  />
                </div>
              )}
              {!shouldHideField("pincode") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Pincode"
                    variant="standard"
                    onChange={(e) => {
                      setValue({ ...value, pincode: e.target.value });
                    }}
                  />
                </div>
              )}
              {!shouldHideField("") && (
                <div className="textinput-Usermaste"></div>
              )}
            </div>

            <div className="line-Usermaster" id="login-usermaster">
              {!shouldHideField("loginName") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Login Name"
                    variant="standard"
                    onChange={(e) => {
                      setValue({ ...value, LoginName: e.target.value });
                    }}
                  />
                </div>
              )}
              {!shouldHideField("password") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    onChange={(e) => {
                      setValue({ ...value, Password: e.target.value });
                    }}
                  />
                </div>
              )}
              {!shouldHideField("") && (
                <div className="textinput-Usermaste"></div>
              )}
              {!shouldHideField("") && (
                <div className="textinput-Usermaste"></div>
              )}
            </div>

            {/* Save and Cancel Buttons */}
            <div className="button-container-Usermaster">
              <div className="button-Usermaster">
                <CommonButton name={"SAVE"}  handleOnClick={handleSave}/>
                <CommonButton name={"CANCEL"} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Usermaster;
