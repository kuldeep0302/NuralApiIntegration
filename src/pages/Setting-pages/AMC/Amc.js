import React, { useState } from "react";
import "./Amc.css";
import TextField from "@material-ui/core/TextField";
import {
  Autocomplete,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import CommonButton from "../../../Componants/Common/Button";
import Paginate from "../../../Componants/Common/Paginate";
import ExportToExcel from "../../../Componants/Common/ExportToExcel";
import activeIcon from "../../../Assests/activeIcon.svg";
import inactiveIcon from "../../../Assests/inactiveIcon.svg";
import editIcon from "../../../Assests/editIcon.svg";
import config from "../../../Componants/Common/config";

// const amcHeaders = [
// { label: "AMC Name", key: "amcName" },
// { label: "Brand", key: "brandName" },
// { label: "Category", key: "categoryName" },
// { label: "Model", key: "modelName" },
// { label: "AMC Cost (INR)", key: "amcCost" }
// { label: "Duration (in Months)", key: "duration" }
// ];

const calltype = [];

const Amc = () => {
  const pageSize = config.pageSize;
  const dummyGetList = {
    serialNo: "",
    countryName: "",
    pageSize: pageSize
  };
  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title
  };

  const [value, setValue] = useState({
    ContactNumber: ""
  });
  const [filteredAMCs, setFilteredAMCs] = useState([]);

  //  const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedAMCs = filteredAMCs.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;

  // const totalItems = filteredAMCs.length;


  // const startIndex = (currentPage - 1) * itemsPerPage;

  // const paginatedAMCs = filteredAMCs.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );
  // const paginatedCities = filteredCities.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const [dataSize, setDataSize] = useState(pageSize);
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

  return (
    <>
      <HeaderNavigation value={"AMC > AMC Master"} />

      <div className="firsttextbox-amc">
        <div className="line-Amc">
          <div className="textinput-Amc">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="AMC Name"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, ContactNumber: e.target.value });
              }}
            />
          </div>

          <div className="textinput-Amc">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, role: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField {...params} label="Brand" variant="standard" />
              )}
            />
          </div>
          <div className="textinput-Amc">
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
                  label="Product Category"
                  variant="standard"
                />
              )}
            />
          </div>
          <div className="textinput-Amc">
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
                  label="Sub Category"
                  variant="standard"
                />
              )}
            />
          </div>
        </div>

        <div className="line-Amc">
          <div className="textinput-Amc">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, role: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField {...params} label="Model" variant="standard" />
              )}
            />
          </div>
          <div className="textinput-Amc">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="No. of Services"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, ContactNumber: e.target.value });
              }}
            />
          </div>
          <div className="textinput-Amc">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="AMC Cost (INR)"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, ContactNumber: e.target.value });
              }}
            />
          </div>
          <div className="textinput-Amc">
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
                  label="Duration (in Months)"
                  variant="standard"
                />
              )}
            />
          </div>
        </div>
        <div className="line-Amc">
          <div className="textinput-Amc">
            {/* <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              // defaultValue="Default Value"
            /> */}
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              sx={{ width: "400px", mb: 2, backgroundColor: "#fff !important" }}
            />
          </div>
        </div>

        <div className="buttons-Amc">
          <span className="buttons-Amc-span">
            <CommonButton name={"Create"} />
          </span>
        </div>
      </div>

      <div className="Secoundtextbox-amc">
        <div className="line-Amc">
          <div className="textinput-Amc">
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="AMC Name"
              variant="standard"
              onChange={(e, val) => {
                setValue({ ...value, ContactNumber: e.target.value });
              }}
            />
          </div>

          <div className="textinput-Amc">
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
      Brand"
                  variant="standard"
                />
              )}
            />
          </div>
          <div className="textinput-Amc">
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
      Product Category"
                  variant="standard"
                />
              )}
            />
          </div>
          <div className="textinput-Amc">
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
      Sub Category"
                  variant="standard"
                />
              )}
            />
          </div>
        </div>

        {/* <div className="line-Amc"></div> */}

        <div className="buttons-Amc">
          <span className="buttons-Amc-span">
            <CommonButton name={"Search"} />
          </span>
        </div>
        <div className="table-Amc">
          <div className="excelexport-Amc">
            <span className="buttons-Amc-span">
              <ExportToExcel
                name="Export to Excel"
                // data={formattedAMC}
                fileName="AMC_Data"
                // headers={amcHeaders}
              />
            </span>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }} align="left">
                    AMC Name
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Brand
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Category
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Model
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    AMC Cost (INR)
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Duration (in Months)
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {paginatedAMCs.map((amc, index) => ( */}
                <TableRow
                //  key={amc.id}
                >
                  <TableCell align="left">
                    xxxxx
                    {/* {index + 1}  */}
                  </TableCell>
                  <TableCell align="center">xxxxx</TableCell>
                  <TableCell align="center">xxxxx</TableCell>
                  <TableCell align="center">xxxxx</TableCell>
                  <TableCell align="center">xxxxx</TableCell>
                  <TableCell align="center">xxxxx</TableCell>
                  {/* <TableCell align="right">
                    <PiLightbulb
                      style={{ cursor: "pointer", marginRight: "5px" }}
                    />
                    <FaEdit
                      style={{ cursor: "pointer", marginRight: "5px" }}
                      // onClick={() => handleEdit(index)}
                    />
                  </TableCell> */}
                  <TableCell
                    align="center"
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
                  </TableCell>
                </TableRow>
                {/* ))} */}
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
    </>
  );
};

export default Amc;
