import React, { useState } from "react";
import "./Usermaster.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Radio from "@mui/material/Radio";
import CommonButton from "../../../Componants/Common/Button";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";

const calltype = [];

const Usermaster = () => {
  const [entityType, setEntityType] = useState("Service Center");
  const [selectedValue, setSelectedValue] = useState("ui"); // Default is "UI"

  const handleEntityChange = (event, val) => {
    if (val) {
      setEntityType(val.title);
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Only one radio button can be selected
  };

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

  const EntityType = [
    { title: "Engineer", Value: 1 },
    { title: "Service Center", Value: 2 },
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
    if (entityType === "Service Center") {
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

              {!shouldHideField("serviceCenter") && (
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
              )}

              {!shouldHideField("serviceCentertext") && (
                <div className="textinput-Usermaste">
                  <TextField
                    id="standard-basic"
                    label="Service Center"
                    variant="standard"
                    onChange={(e) => {
                      setValue({ ...value, FirstName: e.target.value });
                    }}
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
                  label="First Name"
                  variant="standard"
                  onChange={(e) => {
                    setValue({ ...value, FirstName: e.target.value });
                  }}
                />
              </div>
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  onChange={(e) => {
                    setValue({ ...value, LastName: e.target.value });
                  }}
                />
              </div>
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Mobile"
                  variant="standard"
                  onChange={(e) => {
                    setValue({ ...value, Mobile: e.target.value });
                  }}
                />
              </div>
              <div className="textinput-Usermaste">
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  onChange={(e) => {
                    setValue({ ...value, Email: e.target.value });
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
                      setValue({ ...value, Landline: e.target.value });
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
                      setValue({ ...value, AddressLine1: e.target.value });
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
                      setValue({ ...value, AddressLine2: e.target.value });
                    }}
                  />
                </div>
              )}
              {!shouldHideField("state") && (
                <div className="textinput-Usermaste">
                  <Autocomplete
                    onChange={(e, val) => {
                      setValue({ ...value, role: val.title });
                    }}
                    {...calltypeDefaultProps}
                    id="disable-close-on-select"
                    disableCloseOnSelect
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
                    onChange={(e, val) => {
                      setValue({ ...value, role: val.title });
                    }}
                    {...calltypeDefaultProps}
                    id="disable-close-on-select"
                    disableCloseOnSelect
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
                      setValue({ ...value, Landmark: e.target.value });
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
                      setValue({ ...value, Pincode: e.target.value });
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
                <CommonButton name={"SAVE"} />
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
