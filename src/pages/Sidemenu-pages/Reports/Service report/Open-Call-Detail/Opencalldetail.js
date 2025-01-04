import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as XLSX from "xlsx";
import "./Opencalldetail.css";

const calltype = [];

const Opencalldetail = () => {
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
    <div className="container-Opencalldetail">
      <div className="firstname-Opencalldetail">
        <h3 className="h-dashbord">Open Call Reports</h3>
      </div>

      <div className="textfiled-Opencalldetail">
        <div className="line-Opencalldetail">
          <div className="textinput-Opencalldetail">
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
          <div className="textinput-Opencalldetail">
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
          <div className="textinput-Opencalldetail">
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

        <div className="line-Opencalldetail">
          <div className="textinput-Opencalldetail">
            <TextField
              className="date-Opencalldetail"
              label="From Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="textinput-Opencalldetail">
            <TextField
              className="date-Opencalldetail"
              label="To Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="textinput-Opencalldetail">
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

        <div className="excelbutton-Opencalldetail">
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

export default Opencalldetail;
