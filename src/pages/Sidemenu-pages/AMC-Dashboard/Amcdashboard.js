import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Amcdashboard.css";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import {
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
import activeIcon from "../../../Assests/activeIcon.svg";
import inactiveIcon from "../../../Assests/inactiveIcon.svg";
import editIcon from "../../../Assests/editIcon.svg";
import CommonButton from "../../../Componants/Common/Button";

const Amcdashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <div className="Amcdashboard-container">
        <HeaderNavigation value={"AMC Dashboard"} />
        {/* <div className="setting-icones-Amcdashboard ">
            <div className="firstdivicone-Amcdashboard ">
              <div className="iconefirst-Amcdashboard ">
                <img src="./photos/Group 359239 upload.png" alt="upload Icon" />
              </div>

              <div className="iconefirst-Amcdashboard ">
                <img
                  src="./photos/Group 359241 download.png"
                  alt="Download Icon"
                />
              </div>
              <div className="addwithicone-Amcdashboard ">
                <Link
                  to="/CreateCustomerAmc"
                  download
                  className="flex-container"
                >
                  <img
                    src="./photos/Group 359467.png"
                    alt="add Icon"
                    className="icon"
                  />
                </Link>
              </div>
            </div>
          </div> */}
      </div>

      <div className="value-container-Amcdashboard">
        <div className="firstvaluebox-Amcdashboard">
          <p className="First-Amcdashboard">Total Customer</p>
          <h4 className="Secound-Amcdashboard">500</h4>
        </div>
        <div className="firstvaluebox-Amcdashboard">
          <p className="First-Amcdashboard">Total AMC</p>
          <h4 className="Secound-Amcdashboard">400</h4>
        </div>
        <div className="firstvaluebox-Amcdashboard">
          <p className="First-Amcdashboard">Renewal Pending in 2 months</p>
          <h4 className="Secound-Amcdashboard">40</h4>
        </div>
        <div className="firstvaluebox-Amcdashboard">
          <p className="First-Amcdashboard">MTD AMC</p>
          <h4 className="Secound-Amcdashboard">80</h4>
        </div>
      </div>
      <div className="line-Amcdashboard">
      
        <div className="textinput-Amcdashboard">
          <TextField
            className="date-Amcdashboard"
            label="AMC Start Date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <div className="textinput-Amcdashboard">
          <TextField
            className="date-Amcdashboard"
            label="AMC End Date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <div className="buttons-Amcdashboard">
          <span className="buttons-Amcdashboard-span">
            <CommonButton name={"Search"} />
          </span>
        </div>
        <div className="textinput-Amcdashboard"></div>
        <div className="textinput-Amcdashboard"></div>
      </div>

      <div className="table-Amcdashboard">
        {/* <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Product</th>
              <th>Warranty</th>
              <th>AMC</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            <tr>
              <td colspan="2">&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>
                <img
                  src="photos/info.png"
                  alt=""
                  width="15"
                  style={{ marginLeft: "5px" }}
                />
              </td>
            </tr>

            <tr className="cs-Amcdashboard">
              <td colspan="4"></td>
            </tr>

            <tr>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>xxxxx</td>
              <td>
                <img
                  src="photos/info.png"
                  alt=""
                  width="15"
                  style={{ marginLeft: "5px" }}
                />
              </td>
            </tr>
          </tbody>
        </table> */}
        <div className="excelexport-Amcdashboard">
          <span className="buttons-Amcdashboard-span">
            <ExportToExcel
              name="Export to Excel"
              // data={formattedAMCdashboard}
              fileName="AMCDashboard_Data"
              // headers={amcdashboardHeaders}
            />
          </span>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }} align="center">
                  Customer Name
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="center">
                  Product
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="center">
                  Warranty
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="center">
                  AMC
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="center">
                  Start Date
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="center">
                  End Date
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="center">
                  Status
                </TableCell>
                {/* <TableCell sx={{ color: "#fff" }} align="center">
                  Action
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {filteredCountries.map((country, index) => ( */}
              {/* {paginatedCountries.map((country, index) => ( */}
              <TableRow
              // key={amcdashboard.id}
              >
                <TableCell align="center">xxxxx </TableCell>
                <TableCell align="center">xxxxx</TableCell>
                <TableCell align="center">xxxxx</TableCell>
                <TableCell align="center">xxxxx</TableCell>
                <TableCell align="center">xxxxx</TableCell>
                <TableCell align="center">xxxxx</TableCell>
                <TableCell align="center">xxxxx</TableCell>
                {/* <TableCell
                  align="right"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                  }}
                >
                  <IconButton
                    // onClick={() => handleStatus(index)}
                    sx={{
                      outline: "none",
                      "&:focus": { outline: "none" }
                    }}
                  >
                    <img
                      src={activeIcon}
                      alt="active"
                      height={"20px"}
                      width={"20px"}
                    />
                  </IconButton>

                  <IconButton
                    // onClick={() => handleEdit(index)}
                    sx={{
                      outline: "none",
                      "&:focus": { outline: "none" }
                    }}
                  >
                    <img
                      src={editIcon}
                      alt="Edit"
                      height={"20px"}
                      width={"20px"}
                    />
                  </IconButton>
                </TableCell> */}
              </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Amcdashboard;
