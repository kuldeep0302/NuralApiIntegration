import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import "./Reappoitment.css";
import HeaderNavigation from "../../../../Componants/Common/header Navigation/HeaderNavigation";
import CommonButton from "../../../../Componants/Common/Button";
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import JobsheetView from "./JobsheetView";
import CloseIcon from "@mui/icons-material/Close";
import RepairUpdate from "./RepairUpdate";

const Reappointment = () => {
  const [jobsheetOpen, setJobsheetOpen] = useState(false);
  const [repairOpen, setRepairOpen] = useState(false);
  const [value, setValue] = useState({
    Servicecenter: ""
  });

  const calltype = [{ title: "Option 1" }, { title: "Option 2" }];

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title
  };

  const Unallocated = "Unallocated";
  const Allocated = "Allocated";
  const Pendingforpart = "Pendingforpart";
  const Close = "Close";

  const [visibleTables, setVisibleTables] = useState([]);

  const toggleTable = (tableId) => {
    if (visibleTables.includes(tableId)) {
      setVisibleTables(visibleTables.filter((id) => id !== tableId));
    } else {
      setVisibleTables([tableId]);
    }
  };

  // const [open, setOpen] = useState(false);

  // // Function to handle opening the modal
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // // Function to handle closing the modal
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleJobsheetOpen = () => setJobsheetOpen(true);
  const handleJobsheetClose = () => setJobsheetOpen(false);

  const handleRepairOpen = () => setRepairOpen(true);
  const handleRepairClose = () => setRepairOpen(false);

  return (
    <div className="firstbox-Reappointment">
      {/* <div className="firstname-Reappointment">
        <div>
          <h3 className="h-dashbord">Dashboard</h3>
        </div>
      </div> */}
      <HeaderNavigation value={"Dashboard"} />

      <div className="box-Reappointment">
        <div
          className="First-box-Reappointment"
          onClick={() => toggleTable(Unallocated)}
        >
          <div className="Firstline-Reappointment">Unallocated</div>
          <div className="secoundline-Reappointment">500</div>
        </div>
        <div
          className="First-box-Reappointment"
          onClick={() => toggleTable(Allocated)}
        >
          <div className="Firstline-Reappointment">Allocated</div>
          <div className="secoundline-Reappointment">5</div>
        </div>
        <div
          className="First-box-Reappointment"
          onClick={() => toggleTable(Reappointment)}
        >
          <div className="Firstline-Reappointment">Reappointment</div>
          <div className="secoundline-Reappointment">595</div>
        </div>
        <div
          className="First-box-Reappointment"
          onClick={() => toggleTable(Pendingforpart)}
        >
          <div className="Firstline-Reappointment">Pending For Part</div>
          <div className="secoundline-Reappointment">02</div>
        </div>
        <div
          className="First-box-Reappointment"
          onClick={() => toggleTable(Close)}
        >
          <div className="Firstline-Reappointment">Closed</div>
          <div className="secoundline-Reappointment">32</div>
        </div>
      </div>

      <div className="text-serchline-Reappointment">
        <div className="textinput-two-Reappointment">
          <Autocomplete
            onChange={(e, val) => {
              setValue({ ...value, Servicecenter: val.title });
            }}
            {...calltypeDefaultProps}
            id="disable-close-on-select"
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField {...params} label="Brand" variant="standard" />
            )}
          />
        </div>
        <div className="textinput-two-Reappointment">
          <Autocomplete
            onChange={(e, val) => {
              setValue({ ...value, Servicecenter: val.title });
            }}
            {...calltypeDefaultProps}
            id="disable-close-on-select"
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField {...params} label="Jobsheet Type" variant="standard" />
            )}
          />
        </div>
        <div className="textinput-two-Reappointment">
          <Autocomplete
            onChange={(e, val) => {
              setValue({ ...value, Servicecenter: val.title });
            }}
            {...calltypeDefaultProps}
            id="disable-close-on-select"
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField {...params} label="Job Number" variant="standard" />
            )}
          />
        </div>
        <div className="button-Reappointment">
          <span className="buttons-Reappointment-span">
            {/* <Button
              className="action-button"
              size="large"
              component="label"
              variant="contained"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Create
            </Button> */}
            <CommonButton name={"Search"} />
          </span>
        </div>
        <div className="textinput-two-Reappointment"></div>
      </div>
      <div className="text-serchline-Reappointment">
        <div className="textinput-two-Reappointment">
          <Autocomplete
            onChange={(e, val) => {
              setValue({ ...value, Servicecenter: val.title });
            }}
            {...calltypeDefaultProps}
            id="disable-close-on-select"
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assign to Engineer"
                variant="standard"
              />
            )}
          />
        </div>
        <div className="button-Reappointment">
          <span className="buttons-Reappointment-span">
            <CommonButton name={"Assign"} />
          </span>
        </div>
        <div className="textinput-two-Reappointment"></div>
        <div className="textinput-two-Reappointment"></div>
        <div className="textinput-two-Reappointment"></div>
      </div>

      <div className="table-Reappointment">
        {/* <div
          id="Reappointment"
          style={{
            display: visibleTables.includes(Reappointment) ? "block" : "none"
          }}
        >
          <table class="my-table">
            <tbody>
              <tr>
                <th>Action</th>
                <th>Date</th>
                <th>Time</th>
                <th>Customer Company Name</th>
                <th> Customer Category</th>
                <th>Jobsheet Number</th>
                <th> Jobsheet Date</th>
                <th> Target Closure</th>
                <th> Status</th>
                <th> Remark</th>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                  <img
                    src="photos\view.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                  <img
                    src="photos\print.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                  <img
                    src="photos\close.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                </td>
                <td>07-05-2-2023</td>
                <td>1:00 PM</td>
                <td>ATOM SPREADEDGE</td>
                <td>XYZ</td>
                <td>JS657657686</td>
                <td>30-12-2023</td>
                <td>12-12-2023</td>
                <td>xxxxx</td>
                <td>xxxx</td>
              </tr>
              <tr className="cs-Reappointment">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                  <img
                    src="photos\view.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\print.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\close.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                </td>
                <td>07-05-2-2023</td>
                <td>1:00 PM</td>
                <td>ATOM SPREADEDGE</td>
                <td>XYZ</td>
                <td>JS657657686</td>
                <td>30-12-2023</td>
                <td>12-12-2023</td>
                <td>xxxxx</td>
                <td>xxxxx</td>
              </tr>
            </tbody>
          </table>
        </div> */}

        <div
          id="Reappointment"
          style={{
            display: visibleTables.includes(Reappointment) ? "block" : "none"
          }}
        >
          <table class="my-table">
            <TableContainer component={Paper} className="my-table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Action
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Preferred Date & Time
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Customer Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Brand
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Product Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Jobsheet Number
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Jobsheet Date
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Engineer Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {data.map((row, index) => ( */}
                  <TableRow
                  // key={index}
                  >
                    <TableCell>
                      <input type="checkbox" />

                      {/* Jobsheet Modal */}
                      <Modal open={jobsheetOpen} onClose={handleJobsheetClose}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "75%",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            padding: 0,
                            borderRadius: 2,
                            maxHeight: "90vh",
                            overflowY: "auto"
                          }}
                        >
                          <Box
                            mt={3}
                            display="flex"
                            justifyContent="flex-end"
                            sx={{ backgroundColor: "#EFF3FE" }}
                          >
                            <CloseIcon
                              onClick={handleJobsheetClose}
                              sx={{ cursor: "pointer" }}
                            />
                          </Box>
                          <JobsheetView />
                        </Box>
                      </Modal>

                      {/* Repair Modal */}
                      <Modal open={repairOpen} onClose={handleRepairClose}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "75%",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            padding: 0,
                            borderRadius: 2,
                            maxHeight: "90vh",
                            overflowY: "auto"
                          }}
                        >
                          <Box
                            mt={3}
                            display="flex"
                            justifyContent="flex-end"
                            sx={{ backgroundColor: "#EFF3FE" }}
                          >
                            <CloseIcon
                              onClick={handleRepairClose}
                              sx={{ cursor: "pointer" }}
                            />
                          </Box>
                          <RepairUpdate />
                        </Box>
                      </Modal>

                      <img
                        src="photos/view.png"
                        alt="View"
                        width="15"
                        style={{ marginLeft: "5px" }}
                        onClick={handleJobsheetOpen}
                      />

                      <img
                        src="photos/close.png"
                        alt="Repair"
                        width="15"
                        style={{ marginLeft: "5px" }}
                        onClick={handleRepairOpen}
                      />
                    </TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </table>
          {/* )} */}
        </div>

        {/* <div
          id="Unallocated"
          style={{
            display: visibleTables.includes(Unallocated) ? "block" : "none"
          }}
        >
          <table class="my-table">
            <tbody>
              <tr>
                <th>Action</th>
                <th>Date</th>
                <th>Time</th>
                <th>Customer Company Name</th>
                <th>Customer Category</th>
                <th>Jobsheet Number</th>
                <th>Jobsheet Date</th>
                <th>Target Closure</th>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />{" "}
                  <img
                    src="photos\view.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\print.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\close.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                </td>
                <td>07-05-2-2023</td>
                <td>1:00 PM</td>
                <td>ATOM SPREADEDGE</td>
                <td>XYZ</td>
                <td>JS657657686</td>
                <td>30-12-2023</td>
                <td>12-12-2023</td>
              </tr>
              <tr className="cs-Reappointment">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                  <img
                    src="photos\view.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\print.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\close.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                </td>
                <td>07-05-2-2023</td>
                <td>1:00 PM</td>
                <td>ATOM SPREADEDGE</td>
                <td>XYZ</td>
                <td>JS657657686</td>
                <td>30-12-2023</td>
                <td>12-12-2023</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div
          id="Unallocated"
          style={{
            display: visibleTables.includes(Unallocated) ? "block" : "none"
          }}
        >
          <table class="my-table">
            <TableContainer component={Paper} className="my-table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Action
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Preferred Date & Time
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Customer Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Brand
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Product Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Jobsheet Number
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Jobsheet Date
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Engineer Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {data.map((row, index) => ( */}
                  <TableRow
                  // key={index}
                  >
                    <TableCell>
                      <input type="checkbox" />
                      <img
                        src="photos\view.png"
                        alt=""
                        width="15"
                        style={{ marginLeft: "5px" }}
                      />
                      {/* <img
                        src="photos\print.png"
                        alt=""
                        width="15"
                        style={{ marginLeft: "5px" }}
                      /> */}
                      <img
                        src="photos\close.png"
                        alt=""
                        width="15"
                        style={{ marginLeft: "5px" }}
                      />
                    </TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </table>
          {/* )} */}
        </div>

        {/* <div
          id="Allocated"
          style={{
            display: visibleTables.includes(Allocated) ? "block" : "none"
          }}
        >
          <table class="my-table">
            <tbody>
              <tr>
                <th>Action</th>
                <th>Date</th>
                <th>Time</th>
                <th>Customer Company Name</th>
                <th>Jobsheet Number</th>
                <th>Jobsheet Date</th>
                <th>Assigned To</th>
                <th>Target Closure</th>
                <th>Status</th>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />{" "}
                  <img
                    src="photos\view.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\print.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\close.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                </td>
                <td>07-05-2-2023</td>
                <td>1:00 PM</td>
                <td>ATOM SPREADEDGE</td>
                <td>XYZ</td>
                <td>JS657657686</td>
                <td>30-12-2023</td>
                <td>12-12-2023</td>
                <td>xxxxx</td>
              </tr>
              <tr className="cs-Reappointment">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />{" "}
                  <img
                    src="photos\view.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\print.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\close.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                </td>
                <td>07-05-2-2023</td>
                <td>1:00 PM</td>
                <td>ATOM SPREADEDGE</td>
                <td>XYZ</td>
                <td>JS657657686</td>
                <td>30-12-2023</td>
                <td>12-12-2023</td>
                <td>xxxxx</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div
          id="Allocated"
          style={{
            display: visibleTables.includes(Allocated) ? "block" : "none"
          }}
        >
          <table class="my-table">
            <TableContainer component={Paper} className="my-table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Action
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Preferred Date & Time
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Customer Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Brand
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Product Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Jobsheet Number
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Jobsheet Date
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Engineer Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {data.map((row, index) => ( */}
                  <TableRow
                  // key={index}
                  >
                    <TableCell>
                      <input type="checkbox" />
                      <img
                        src="photos\view.png"
                        alt=""
                        width="15"
                        style={{ marginLeft: "5px" }}
                      />
                      {/* <img
                        src="photos\print.png"
                        alt=""
                        width="15"
                        style={{ marginLeft: "5px" }}
                      /> */}
                      <img
                        src="photos\close.png"
                        alt=""
                        width="15"
                        style={{ marginLeft: "5px" }}
                      />
                    </TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </table>
          {/* )} */}
        </div>

        {/* <div
          id="Pendingforpart"
          style={{
            display: visibleTables.includes(Pendingforpart) ? "block" : "none"
          }}
        >
          <table class="my-table">
            <tbody>
              <tr>
                <th>Action</th>
                <th>Date</th>
                <th>Time</th>
                <th>Customer Company Name</th>
                <th>Customer Category</th>
                <th>Jobsheet Number</th>
                <th>Jobsheet Date</th>
                <th>Part Requested</th>
                <th>Assigned to</th>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                  <img
                    src="photos\view.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                  <img
                    src="photos\print.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\close.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                </td>
                <td>07-05-2-2023</td>
                <td>1:00 PM</td>
                <td>ATOM SPREADEDGE</td>
                <td>XYZ</td>
                <td>JS657657686</td>
                <td>30-12-2023</td>
                <td>xxxxx</td>
                <td>xxxxx</td>
              </tr>
              <tr className="cs-Reappointment">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />{" "}
                  <img
                    src="photos\view.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\print.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\close.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                </td>
                <td>07-05-2-2023</td>
                <td>1:00 PM</td>
                <td>ATOM SPREADEDGE</td>
                <td>XYZ</td>
                <td>JS657657686</td>
                <td>30-12-2023</td>
                <td>xxxxx</td>
                <td>xxxxx</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div
          id="Pendingforpart"
          style={{
            display: visibleTables.includes(Pendingforpart) ? "block" : "none"
          }}
        >
          <table class="my-table">
            <TableContainer component={Paper} className="my-table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Action
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Preferred Date & Time
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Customer Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Brand
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Product Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Jobsheet Number
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Jobsheet Date
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Engineer Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {data.map((row, index) => ( */}
                  <TableRow
                  // key={index}
                  >
                    <TableCell>
                      <input type="checkbox" />
                      <img
                        src="photos\view.png"
                        alt=""
                        width="15"
                        style={{ marginLeft: "5px" }}
                      />
                      {/* <img
                        src="photos\print.png"
                        alt=""
                        width="15"
                        style={{ marginLeft: "5px" }}
                      /> */}
                      <img
                        src="photos\close.png"
                        alt=""
                        width="15"
                        style={{ marginLeft: "5px" }}
                      />
                    </TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </table>
          {/* )} */}
        </div>

        {/* <div
          id="Close"
          style={{
            display: visibleTables.includes(Close) ? "block" : "none"
          }}
        >
          <table class="my-table">
            <tbody>
              <tr>
                <th>Action</th>
                <th>Date</th>
                <th>Time</th>
                <th>Customer Company Name</th>
                <th>Customer Category</th>
                <th>Jobsheet Number</th>
                <th>Jobsheet Date</th>
                <th>Part Requested</th>
                <th>Assigned to</th>
                <th>Status</th>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                  <img
                    src="photos\view.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                  <img
                    src="photos\print.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                  <img
                    src="photos\close.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                </td>
                <td>07-05-2-2023</td>
                <td>1:00 PM</td>
                <td>ATOM SPREADEDGE</td>
                <td>XYZ</td>
                <td>JS657657686</td>
                <td>30-12-2023</td>
                <td>xxxxx</td>
                <td>xxxxx</td>
                <td>Close</td>
              </tr>
              <tr className="cs-Reappointment">
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />{" "}
                  <img
                    src="photos\view.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\print.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />{" "}
                  <img
                    src="photos\close.png"
                    alt=""
                    width="15"
                    style={{ marginLeft: "5px" }}
                  />
                </td>
                <td>07-05-2-2023</td>
                <td>1:00 PM</td>
                <td>ATOM SPREADEDGE</td>
                <td>XYZ</td>
                <td>JS657657686</td>
                <td>xxxxx</td>
                <td>xxxxx</td>
                <td>xxxxx</td>
                <td>Close</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div
          id="Close"
          style={{
            display: visibleTables.includes(Close) ? "block" : "none"
          }}
        >
          <table class="my-table">
            <TableContainer component={Paper} className="my-table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Action
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Preferred Date & Time
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Customer Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Brand
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Product Name
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Jobsheet Number
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Jobsheet Date
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Engineer Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {data.map((row, index) => ( */}
                  <TableRow
                  // key={index}
                  >
                    <TableCell>
                      <input type="checkbox" />
                      <img
                        src="photos\view.png"
                        alt="View"
                        width="15"
                        style={{ marginLeft: "5px" }}
                      />
                      {/* <img
                        src="photos\print.png"
                        alt=""
                        width="15"
                        style={{ marginLeft: "5px" }}
                      /> */}
                      <img
                        src="photos\close.png"
                        alt=""
                        width="15"
                        style={{ marginLeft: "5px" }}
                      />
                    </TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                    <TableCell align="center">xxxxx</TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </table>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Reappointment;
