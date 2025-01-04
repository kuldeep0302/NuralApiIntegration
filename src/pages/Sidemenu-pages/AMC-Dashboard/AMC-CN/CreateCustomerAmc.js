import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./Amccn.css";
import HeaderNavigation from "../../../../Componants/Common/header Navigation/HeaderNavigation";
import CommonButton from "../../../../Componants/Common/Button";

const calltype = [];

const CreateCustomerAmc = () => {
  const [value, setValue] = useState();

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title
  };

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    mobileNo: "",
    brand: "",
    productCategory: "",
    subCategory: "",
    model: "",
    serialNo: "",
    amcStatus: "",
    selectedDate: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <HeaderNavigation value={"Create Customer AMC"} />

      <div className="Amccn-container">
        <div className="line-Amccn">
          <div className="textinput-Amccn">
            <TextField
              name="customerName"
              id="standard-basic"
              label="Customer Name"
              variant="standard"
              value={formData.customerName}
              onChange={handleChange}
            />
          </div>
          <div className="textinput-Amccn">
            <TextField
              name="email"
              id="standard-basic"
              label="Email"
              variant="standard"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="textinput-Amccn">
            <TextField
              name="mobileNo"
              id="standard-basic"
              label="Mobile No"
              variant="standard"
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </div>
          <div className="textinput-Amccn"></div>
        </div>
        <div className="line-Amccn">
          <div className="textinput-Amccn">
            <TextField
              name="brand"
              id="standard-basic"
              label="Brand"
              variant="standard"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div className="textinput-Amccn">
            <TextField
              name="productCategory"
              id="standard-basic"
              label="Product Category"
              variant="standard"
              value={formData.productCategory}
              onChange={handleChange}
            />
          </div>
          <div className="textinput-Amccn">
            <TextField
              name="subCategory"
              id="standard-basic"
              label="Sub Category"
              variant="standard"
              value={formData.subCategory}
              onChange={handleChange}
            />
          </div>
          <div className="textinput-Amccn">
            <TextField
              name="model"
              id="standard-basic"
              label="Model"
              variant="standard"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="line-Amccn">
          <div className="textinput-Amccn">
            <TextField
              name="serialNo"
              id="standard-basic"
              label="Serial No"
              variant="standard"
              value={formData.serialNo}
              onChange={handleChange}
            />
          </div>
          <div className="textinput-Amccn">
            <TextField
              name="amcStatus"
              id="standard-basic"
              label="AMC Status"
              variant="standard"
              value={formData.amcStatus}
              onChange={handleChange}
            />
          </div>

          <div className="textinput-Amccn">
            <TextField
              className="date-Amccn"
              label="Valid Till"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="textinput-Amccn"></div>
        </div>

        <div className="line-Amccn">
          <div className="textinput-Customerservice">
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
                  label="
                    Select AMC"
                  variant="standard"
                />
              )}
            />
          </div>
          <div className="textinput-Amccn">
            <TextField
              className="date-Amccn"
              label="Start Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="textinput-Amccn">
            {/* <TextField
              className="date-Amccn"
              label="End Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true
              }}
            /> */}
          </div>

          <div className="textinput-Amccn"></div>
        </div>
        <div className="buttons-Amccn">
          <span className="buttons-Amccn-span">
            <CommonButton name={"Create"} />
          </span>
        </div>
      </div>
    </>
  );
};

export default CreateCustomerAmc;
