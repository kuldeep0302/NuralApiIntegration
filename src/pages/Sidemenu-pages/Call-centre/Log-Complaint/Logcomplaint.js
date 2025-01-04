import React, { useState } from "react";
import "./Logcomplaint.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Button from "@mui/material/Button";

const calltype = [];

const Logcomplaint = () => {
  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  const [value, setValue] = useState({
    ContactNumber: "",
  });

  const [activeTab, setActiveTab] = useState("CustomerProduct");

  return (
    <>
      <div className="Logcomplaint-maincontainer">
        <div className="firstbox-Logcomplaint">
          <h4>Log Complaint</h4>
        </div>

        <div className="container-Logcomplaint">
          <div className="line-Logcomplaint">
            <div className="textinput-Logcomplaint">
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
                    Call Type"
                    variant="standard"
                  />
                )}
              />
            </div>{" "}
            <div className="textinput-Logcomplaint">
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
                    Call Source"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="textinput-Logcomplaint">
              <TextField
               style={{width:"100%"}}
                id="standard-basic"
                label="Contact Number"
                variant="standard"
                onChange={(e, val) => {
                  setValue({ ...value, ContactNumber: e.target.value });
                }}
              />
            </div>
            <div className="textinput-Logcomplaint">
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
                    Job Number"
                    variant="standard"
                  />
                )}
              />
            </div>
          </div>

          <div className="buttons-Logcomplaint">
            <span className="buttons-Logcomplaint-span">
              <Button
                className="action-button"
                size="large"
                component="label"
                variant="contained"
                style={{ backgroundColor: "#32499F" }}
              >
                Search
              </Button>
            </span>
            <span className="buttons-Logcomplaint-span">
              <Button
                className="action-button"
                size="large"
                component="label"
                variant="contained"
                style={{ backgroundColor: "#32499F" }}
              >
                Reset
              </Button>
            </span>

            <span className="buttons-Logcomplaint-span">
              <Button
                className="action-button"
                size="large"
                component="label"
                variant="contained"
                style={{ backgroundColor: "#32499F" }}
              >
                Create Customer
              </Button>
            </span>
          </div>
        </div>
      </div>

      <div className="castumar-product-callcentre">
        <div className="secoundbox-Customerproduct">
          <div>
            <h4
              className={`secound-text-Customerproduct ${
                activeTab === "CustomerProduct" ? "active" : ""
              }`}
              onClick={() => setActiveTab("CustomerProduct")}
            >
              Customer Product
            </h4>
          </div>
          <div>
            <h4
              className={`secound-text-Customerproduct ${
                activeTab === "CallHistory" ? "active" : ""
              }`}
              onClick={() => setActiveTab("CallHistory")}
            >
              Call History
            </h4>
          </div>
        </div>

        {activeTab === "CustomerProduct" && (
          <div className="table-Customerproduct">
            <table>
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Model</th>
                  <th>SKU</th>
                  <th>Date Of Purchase</th>
                  <th>Invoice Number</th>
                  <th>Action</th>
                </tr>
                <tr>
                  <td colspan="8">&nbsp;</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td>Product</td>
                  <td>Category</td>
                  <td>Model</td>
                  <td>SKU</td>
                  <td>DD/MM/YY</td>
                  <td>Invoice Number</td>
                  <td>
                    {""}
                    <img
                      src="photos\control-center 1.png"
                      alt=""
                      width="15"
                      style={{ marginLeft: "5px" }}
                    />
                  </td>
                </tr>
                <tr className="cs-Callhistory">
                  <td colspan="4"></td>
                </tr>
                <tr>
                  <td>Brand</td>
                  <td>Product</td>
                  <td>Category</td>
                  <td>Model</td>
                  <td>SKU</td>
                  <td>DD/MM/YY</td>
                  <td>Invoice Number</td>
                  <td>
                    {" "}
                    <img
                      src="photos\control-center 1.png"
                      alt=""
                      width="15"
                      style={{ marginLeft: "5px" }}
                    />
                  </td>
                </tr>
                <tr className="cs-Callhistory">
                  <td colspan="4"></td>
                </tr>

                <tr>
                  <td>Brand</td>
                  <td>Product</td>
                  <td>Category</td>
                  <td>Model</td>
                  <td>SKU</td>
                  <td>DD/MM/YY</td>
                  <td>Invoice Number</td>
                  <td>
                    {" "}
                    <img
                      src="photos\control-center 1.png"
                      alt=""
                      width="15"
                      style={{ marginLeft: "5px" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "CallHistory" && (
          <div className="table-Callhistory">
            <table>
              <thead>
                <tr>
                  <th>Jobsheet Date</th>
                  <th>Jobsheet No.</th>
                  <th>Complaint No.</th>
                  <th>Product Category</th>
                  <th>Model</th>
                  <th>SKU</th>
                  <th>Contact Person</th>
                  <th>Jobsheet Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>07/05/2021</td>
                  <td>JS2140000060</td>
                  <td>14456</td>
                  <td>XYZ</td>
                  <td>FV140000060</td>
                  <td>89040000060</td>
                  <td>Aditya</td>
                  <td>Service</td>
                </tr>
                <tr className="cs-Callhistory">
                  <td colspan="4"></td>
                </tr>
                <tr>
                  <td>07/05/2021</td>
                  <td>JS2140000060</td>
                  <td>14456</td>
                  <td>XYZ</td>
                  <td>FV140000060</td>
                  <td>89040000060</td>
                  <td>Aditya</td>
                  <td>Service</td>
                </tr>
                <tr className="cs-Callhistory">
                  <td colspan="4"></td>
                </tr>
                <tr>
                  <td>07/05/2021</td>
                  <td>JS2140000060</td>
                  <td>14456</td>
                  <td>XYZ</td>
                  <td>FV140000060</td>
                  <td>89040000060</td>
                  <td>Aditya</td>
                  <td>Service</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Logcomplaint;
