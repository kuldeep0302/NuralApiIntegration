import React, { useEffect, useState } from "react";
import "./Usermaster.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Radio from "@mui/material/Radio";
import CommonButton from "../../../Componants/Common/Button";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import {
  createUser,
  getCityList,
  getServiceCenterList,
  getStateList,
} from "../../../API Service/apiService";
import CircularProgress from "@mui/material/CircularProgress";
 
const Usermaster = () => {
  const [entityType, setEntityType] = useState("serviceCenter");
  const [selectedValue, setSelectedValue] = useState("ui"); // Default is "UI"
  const [serviceCenterList, setServiceCenterList] = useState([]);
  const handleEntityChange = (e, val) => {
    if (val) {
      // Reset form and errors when entity type changes
      handleReset();
      setEntityType(val.title);
      setValue({ ...value, entityType: val.title });
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
 
  useEffect(() => {
    const fetchServiceCenterList = async () => {
      const response = await getServiceCenterList();
 
      setServiceCenterList(response.data.serviceCenters);
      console.log("serviceCenterList", response.data.serviceCenters);
    };
    fetchServiceCenterList();
  }, []);
 
  const EntityType = [
    { title: "engineer", Value: 1 },
    { title: "serviceCenter", Value: 2 },
  ];
 
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
 
  const handleCheckboxChange1 = () => {
    setChecked1(!isChecked1);
  };
 
  const handleCheckboxChange2 = () => {
    setChecked2(!isChecked2);
  };
 
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
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
      return field === "serviceCenter";
    } else if (entityType === "engineer") {
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
    serviceCenterId: "",
    accessKey: "",
    password: "",
    loginID: "",
    serviceCenter: "",
  });
 
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  // Add validation helper functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
 
  const validateMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };
 
  const validatePincode = (pincode) => {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
  };
 
  const validateField = (fieldName, value) => {
    let error = '';
    
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      error = `${fieldName} is required`;
    } else {
      switch (fieldName) {
        case 'email':
          if (!validateEmail(value)) {
            error = 'Please enter a valid email address';
          }
          break;
        case 'mobile':
          if (!validateMobile(value)) {
            error = 'Mobile number must be 10 digits';
          }
          break;
        case 'pincode':
          if (entityType === 'serviceCenter' && !validatePincode(value)) {
            error = 'Pincode must be a valid 6-digit number';
          }
          break;
        case 'password':
          if (value.length < 6) {
            error = 'Password must be at least 6 characters long';
          }
          break;
        case 'firstName':
        case 'lastName':
          if (value.length < 2) {
            error = `${fieldName} must be at least 2 characters long`;
          }
          break;
        case 'accessKey':
          if (value.length < 4) {
            error = 'Access key must be at least 4 characters long';
          }
          break;
        case 'loginID':
          if (value.length < 4) {
            error = 'Login ID must be at least 4 characters long';
          }
          break;
        case 'serviceCenterId':
          if (entityType === 'engineer' && !value) {
            error = 'Please select a service center';
          }
          break;
        case 'serviceCenter':
          if (entityType === 'serviceCenter' && (!value || value.trim().length < 3)) {
            error = 'Service center name must be at least 3 characters long';
          }
          break;
        case 'state':
          if (entityType === 'serviceCenter' && !value) {
            error = 'Please select a state';
          }
          break;
        case 'city':
          if (entityType === 'serviceCenter' && !value) {
            error = 'Please select a city';
          }
          break;
        case 'addressLine1':
          if (entityType === 'serviceCenter' && value.trim().length < 5) {
            error = 'Address must be at least 5 characters long';
          }
          break;
        default:
          break;
      }
    }
    return error;
  };
 
  // Add real-time validation function
  const handleFieldValidation = (fieldName, value) => {
    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    return !error;
  };
 
  // Update the onChange handlers for all fields to include validation
  const handleInputChange = (fieldName, value) => {
    setValue(prev => ({
      ...prev,
      [fieldName]: value
    }));
    handleFieldValidation(fieldName, value);
  };
 
  // Update Autocomplete components to include validation
  const handleStateChange = (event, newValue) => {
    setSelectedState(newValue);
    const stateName = newValue ? newValue.stateName : "";
    setValue(prev => ({
      ...prev,
      state: stateName
    }));
    handleFieldValidation('state', stateName);
  };
 
  const handleCityChange = (event, newValue) => {
    const cityName = newValue ? newValue.cityName : "";
    setValue(prev => ({
      ...prev,
      city: cityName
    }));
    handleFieldValidation('city', cityName);
  };
 
  const handleServiceCenterChange = (event, newValue) => {
    const serviceCenterId = newValue ? newValue._id : "";
    setValue(prev => ({
      ...prev,
      serviceCenterId
    }));
    handleFieldValidation('serviceCenterId', serviceCenterId);
  };
 
  // Add validateForm function
  const validateForm = () => {
    const requiredFields = entityType === 'serviceCenter' 
      ? [
          'entityType',
          'firstName',
          'lastName',
          'mobile',
          'email',
          'addressLine1',
          'state',
          'city',
          'pincode',
          'accessKey',
          'password',
          'loginID',
          'serviceCenter'
        ]
      : [
          'entityType',
          'firstName',
          'lastName',
          'mobile',
          'email',
          'serviceCenterId',
          'accessKey',
          'password',
          'loginID'
        ];

    const newErrors = {};
    let isValid = true;

    // Validate all required fields
    requiredFields.forEach(field => {
      const error = validateField(field, value[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Set all errors at once
    setErrors(newErrors);
    return isValid;
  };
 
  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate form and check for any errors
      const isValid = validateForm();
      
      if (!isValid) {
        setIsSubmitting(false);
        // Get all error messages
        const errorMessages = Object.values(errors).filter(error => error);
        if (errorMessages.length > 0) {
          alert(errorMessages[0]); // Show first error message
        }
        return;
      }

      // Check if all required fields are filled
      const requiredFields = entityType === 'serviceCenter' 
        ? [
            'entityType',
            'firstName',
            'lastName',
            'mobile',
            'email',
            'addressLine1',
            'state',
            'city',
            'pincode',
            'accessKey',
            'password',
            'loginID',
            'serviceCenter'
          ]
        : [
            'entityType',
            'firstName',
            'lastName',
            'mobile',
            'email',
            'serviceCenterId',
            'accessKey',
            'password',
            'loginID'
          ];

      const missingFields = requiredFields.filter(field => !value[field]?.trim());
      
      if (missingFields.length > 0) {
        setIsSubmitting(false);
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }

      // If all validations pass, prepare data for API call
      const data = entityType === "serviceCenter"
        ? {
            entityType: value.entityType || "serviceCenter",
            firstName: value.firstName?.trim(),
            lastName: value.lastName?.trim(),
            mobile: value.mobile?.trim(),
            email: value.email?.trim(),
            landline: value.landline?.trim() || "",
            addressLine1: value.addressLine1?.trim(),
            addressLine2: value.addressLine2?.trim() || "",
            state: value.state?.trim(),
            city: value.city?.trim(),
            landmark: value.landmark?.trim() || "",
            pincode: value.pincode?.trim(),
            serviceCenter: value.serviceCenter?.trim(),
            accessKey: value.accessKey?.trim(),
            password: value.password?.trim(),
            loginID: value.loginID?.trim(),
          }
        : {
            entityType: value.entityType?.trim(),
            firstName: value.firstName?.trim(),
            lastName: value.lastName?.trim(),
            mobile: value.mobile?.trim(),
            email: value.email?.trim(),
            accessKey: value.accessKey?.trim(),
            password: value.password?.trim(),
            loginID: value.loginID?.trim(),
            serviceCenterId: value.serviceCenterId?.trim(),
          };

      setLoading(true);
      const response = await createUser(data);
      
      if (response.status === "error") {
        alert(response.message);
        return;
      }

      alert(`${entityType} created successfully!`);
      handleReset();
    } catch (error) {
      console.error("Error saving data:", error.response?.data || error.message);
      alert(`Failed to create ${entityType}. Please try again.`);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };
 
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
 
  const [selectedState, setSelectedState] = useState([]);
 
  const fetchState = async () => {
    try {
      setLoading(true);
      const response = await getStateList();
      setStates(response.data.states);
    } catch (error) {
      console.error("Error fetching states:", error);
      alert("Failed to load states. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await getCityList();
      setCities(response.data.cities);
      console.log("response.data", response.data);
      setTotalRecords(response.data.totalCities);
      setLoading(false);
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
 
  const handleReset = () => {
    // Reset all form fields
    setValue({
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
      serviceCenterId: "",
      accessKey: "",
      password: "",
      loginID: "",
      serviceCenter: "",
    });
    
    // Reset all error states
    setErrors({});
    
    // Reset state selection
    setSelectedState([]);
    
    // Reset entity type to default if needed
    setEntityType("serviceCenter");
    
    // Reset loading and submitting states
    setLoading(false);
    setIsSubmitting(false);
  };
 
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
                  checked={selectedValue === "excel"}
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
                  checked={selectedValue === "ui"}
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
                  options={EntityType}
                  getOptionLabel={(option) => option.title}
                  id="disable-close-on-select"
                  
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Entity Type"
                      variant="standard"
                    />
                  )}
                />
              </div>
 
              {entityType === "serviceCenter" && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Service Center Name"
                    variant="standard"
                    required
                    error={!!errors.serviceCenter}
                    helperText={errors.serviceCenter}
                    value={value.serviceCenter || ''}
                    onChange={(e) => {
                      setValue({ ...value, serviceCenter: e.target.value });
                      if (errors.serviceCenter) {
                        setErrors({ ...errors, serviceCenter: '' });
                      }
                    }}
                  />
                </div>
              )}
 
              {entityType === "engineer" && (
                <div className="textinput-Usermaste">
                  <Autocomplete
                    options={serviceCenterList}
                    getOptionLabel={(option) =>
                      option.serviceCenter || "no service center"
                    }
                    onChange={handleServiceCenterChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service Center"
                        variant="standard"
                        required
                        error={!!errors.serviceCenterId}
                        helperText={errors.serviceCenterId}
                      />
                    )}
                  />
                </div>
              )}
 
              <div className="textinput-Usermaste"></div>
              <div className="textinput-Usermaste"></div>
            </div>
 
            <div className="line-Usermaster">
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Access Key"
                  variant="standard"
                  required
                  error={!!errors.accessKey}
                  helperText={errors.accessKey}
                  value={value.accessKey || ''}
                  onChange={(e) => {
                    setValue({ ...value, accessKey: e.target.value });
                    if (errors.accessKey) {
                      setErrors({ ...errors, accessKey: '' });
                    }
                  }}
                />
              </div>
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Login ID"
                  variant="standard"
                  required
                  error={!!errors.loginID}
                  helperText={errors.loginID}
                  value={value.loginID || ''}
                  onChange={(e) => {
                    setValue({ ...value, loginID: e.target.value });
                    if (errors.loginID) {
                      setErrors({ ...errors, loginID: '' });
                    }
                  }}
                />
              </div>
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  type="password"
                  required
                  error={!!errors.password}
                  helperText={errors.password}
                  value={value.password || ''}
                  onChange={(e) => {
                    setValue({ ...value, password: e.target.value });
                    if (errors.password) {
                      setErrors({ ...errors, password: '' });
                    }
                  }}
                />
              </div>
              <div className="textinput-Usermaste"></div>
            </div>
 
            <div className="line-Usermaster">
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  value={value.firstName || ''}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  value={value.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Mobile"
                  variant="standard"
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                  value={value.mobile || ''}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                />
              </div>
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  error={!!errors.email}
                  helperText={errors.email}
                  value={value.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
                    onChange={(e) => handleInputChange('landline', e.target.value)}
                  />
                </div>
              )}
              {!shouldHideField("addressLine1") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Address Line 1"
                    variant="standard"
                    error={!!errors.addressLine1}
                    helperText={errors.addressLine1}
                    value={value.addressLine1 || ''}
                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                  />
                </div>
              )}
              {!shouldHideField("addressLine2") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Address Line 2"
                    variant="standard"
                    error={!!errors.addressLine2}
                    helperText={errors.addressLine2}
                    value={value.addressLine2 || ''}
                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                  />
                </div>
              )}
              {!shouldHideField("state") && (
                <div className="textinput-Usermaste">
                  <Autocomplete
                    options={states}
                    getOptionLabel={(option) => option.stateName}
                    onChange={handleStateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        variant="standard"
                        error={!!errors.state}
                        helperText={errors.state}
                      />
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
                    onChange={handleCityChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City"
                        variant="standard"
                        error={!!errors.city}
                        helperText={errors.city}
                      />
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
                    error={!!errors.landmark}
                    helperText={errors.landmark}
                    value={value.landmark || ''}
                    onChange={(e) => handleInputChange('landmark', e.target.value)}
                  />
                </div>
              )}
              {!shouldHideField("pincode") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Pincode"
                    variant="standard"
                    error={!!errors.pincode}
                    helperText={errors.pincode}
                    value={value.pincode || ''}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                  />
                </div>
              )}
              {!shouldHideField("") && (
                <div className="textinput-Usermaste"></div>
              )}
            </div>
 
            <div className="button-container-Usermaster">
              <div className="button-Usermaster">
                <CommonButton
                  name={"SAVE"}
                  handleOnClick={handleSave}
                  disabled={isSubmitting || loading}
                />
                {(isSubmitting || loading) && <CircularProgress size={24} />}
                <CommonButton 
                  name={"CANCEL"} 
                  handleOnClick={handleReset}
                  disabled={isSubmitting || loading} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
 
export default Usermaster;
