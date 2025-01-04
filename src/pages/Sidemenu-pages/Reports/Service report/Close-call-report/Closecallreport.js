import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as XLSX from "xlsx";
import "./Closecallreport.css";

const calltype = [];

const Closecallreport = () => {
  const [value, setValue] = useState({
    JobType: "",
    GSP: "",
    ServiceCentre: "",
    Organization: "",
  });

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title,
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [excelData] = React.useState([
    // Your Excel data goes here
  ]);

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Create a blob and initiate download
    const blob = XLSX.write(wb, {
      bookType: "xlsx",
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "your_file_name.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-Closecallreport">
      <div className="firstname-Closecallreport">
        <h3 className="h-dashbord">Close Call Reports</h3>
      </div>

      <div className="textfiled-Closecallreport">
        <div className="line-Closecallreport">
          <div className="textinput-Closecallreport">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, Transferfrom: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField {...params} label="Job Type:" variant="standard" />
              )}
            />
          </div>
          <div className="textinput-Closecallreport">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, Transferfrom: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField {...params} label="GSP :" variant="standard" />
              )}
            />
          </div>
          <div className="textinput-Closecallreport">
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, Transferfrom: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Service Centre:"
                  variant="standard"
                />
              )}
            />
          </div>
        </div>

        <div className="line-Closecallreport">
          <div className="textinput-Closecallreport">
            <TextField
              className="date-Closecallreport"
              label="Creation Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="textinput-Closecallreport">
            <TextField
              className="date-Closecallreport"
              label="Close Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="textinput-Closecallreport">
            {" "}
            <Autocomplete
              onChange={(e, val) => {
                setValue({ ...value, TransferTo: val.title });
              }}
              {...calltypeDefaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Organization:"
                  variant="standard"
                />
              )}
            />
          </div>
        </div>

        <div className="excelbutton-Closecallreport">
          {" "}
          <button
            onClick={downloadExcel}
            style={{
              backgroundColor: "#32499F",
              color: "white",
              width: "10%",
              height: "5vh",
              whiteSpace: "nowrap",
            }}
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Closecallreport;
