import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Autocomplete
} from "@mui/material";
import CommonButton from "../../../../Componants/Common/Button";
import deleteIcon from "../../../../Assests/deleteIcon.svg";
import InputFileUpload from "../../../../Componants/Common/Bulk Upload/InputFileUpload";

const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" }
];
const paymentOptions = [{ label: "Yes" }, { label: "No" }];
const paymentModeOptions = [
  { label: "Cash" },
  { label: "Cheque" },
  { label: "Online" }
];

const warrantyOptions = [
  { label: "In warranty" },
  { label: "Out warranty" },
  { label: "Warranty void" }
];
const actionOptions = [
  { label: "Repair with part" },
  { label: "Replacement" },
  { label: "Part Pending" }
  // { label: "Reappointment" }
];

// const RepairUpdate = () => {
const RepairUpdate = ({ repairImages }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles([...files, file]);
    }
  };

  const handleFileUpload2 = (event) => {
    const file2 = event.target.files[0];
    if (file2) {
      setFiles2([...files2, file2]);
    }
  };

  const handleFileDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };
  const handleFileDelete2 = (index) => {
    const updatedFiles2 = files2.filter((_, i) => i !== index);
    setFiles2(updatedFiles2);
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [fileName, setFileName] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [time, setTime] = useState("");

  const handleTimeChange = (event) => {
    const value = event.target.value;
    // Optionally, you can validate the input format here
    // For simplicity, we'll directly update the state
    setTime(value);
  };

  const [images, setImages] = useState([]);
  // const handleImageChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   if (files.length + images.length > 5) {
  //     alert("You can only upload a maximum of 5 images.");
  //     return;
  //   }
  //   const newImages = files.map((file) => URL.createObjectURL(file));
  //   setImages((prevImages) => [...prevImages, ...newImages]);
  // };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };
  // const handleRemoveImage = (index) => {
  //   setImages(images.filter((_, i) => i !== index));
  // };

  const [paymentImages, setPaymentImages] = useState([]);

  // const handlePaymentImageChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   if (files.length + paymentImages.length > 3) {
  //     alert("You can only upload a maximum of 3 images.");
  //     return;
  //   }
  //   const newImages = files.map((file) => URL.createObjectURL(file));
  //   setPaymentImages((prevImages) => [...prevImages, ...newImages]);
  // };

  const handlePaymentImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setPaymentImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#EFF3FE" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Repair Update
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            label="Customer name"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            label="City"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            label="Service Type"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <TextField
            label="Jobsheet Type"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            label="Fault as observed by Customer"
            variant="standard"
            size="small"
            sx={{ width: "15rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            label="Remark"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
      </Grid>
      <br />
      <hr /> <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <Typography sx={{ fontSize: "900", fontWeight: "600" }}>
            Job Details
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            label="Product Name"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            label="Product Code"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            className="date-Closecallreport"
            label="Purchase Date"
            type="date"
            variant="standard"
            sx={{ width: "10rem" }}
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            label="Engineer Assigned"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={warrantyOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Warranty Status"
                variant="standard"
                style={{ width: "11rem" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            className="date-Closecallreport"
            label="Visit Date"
            type="date"
            variant="standard"
            sx={{ width: "10rem" }}
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            className="date-Closecallreport"
            label="Visit Time"
            type="text"
            //  type="time"
            variant="standard"
            sx={{ width: "10rem" }}
            InputLabelProps={{
              shrink: true
            }}
            value={time}
            onChange={handleTimeChange}
            placeholder="HH/MM AM/PM"
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}></Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={actionOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Action"
                variant="standard"
                style={{ width: "11rem" }}
              />
            )}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <Typography sx={{ fontSize: "900", fontWeight: "600" }}>
            Repair with Part
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={4}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Part Name"
                variant="standard"
                style={{ width: "11rem" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Part Serial"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Old Part Serial"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={paymentOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Payment"
                variant="standard"
                style={{ width: "11rem" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={paymentModeOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Payment Mode"
                variant="standard"
                style={{ width: "11rem" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Amount"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Payment Refrence No"
            variant="standard"
            size="small"
            sx={{ width: "12rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}></Grid>
        <Grid item xs={12} sm={3} md={4}></Grid>

        {/* <Grid item xs={12} sm={10} md={8}>
          <p style={{ fontSize: "900", color: "#32499F" }}>
            Upload Payment Images (Upload upto 3 images**)
          </p>
          <Grid item xs={12} sm={2} md={2}>
            <InputFileUpload
              type="file"
              onChange={handlePaymentImageChange}
              accept=".jpg, .png, .svg"
              multiple
            />
          </Grid>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {paymentImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Uploaded ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover"
                }}
              />
            ))}
          </div>
        </Grid> */}
        {/* Upload Payment Images */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10} md={8}>
            <p style={{ fontSize: "900", color: "#32499F" }}>
              Upload Payment Images (Upload up to 3 images**)
            </p>
            <Grid item xs={12} sm={2} md={2}>
              <InputFileUpload
                type="file"
                onChange={handlePaymentImageChange}
                accept=".jpg, .png, .svg"
                multiple
              />
            </Grid>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {(paymentImages || []).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Payment ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover"
                  }}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <Typography sx={{ fontSize: "900", fontWeight: "600" }}>
            Replacement
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Brand"
                variant="standard"
                style={{ width: "11rem" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="standard"
                style={{ width: "11rem" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sub Category"
                variant="standard"
                style={{ width: "11rem" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Model"
                variant="standard"
                style={{ width: "11rem" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            label="Serial No"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}></Grid>
        <Grid item xs={12} sm={3} md={3}></Grid>
        <Grid item xs={12} sm={3} md={3}></Grid>

        <Grid sx={{ padding: "20px", width: "400px" }} xs={12} sm={6} md={6}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography sx={{ fontSize: "400" }}>
                Image Upload (Product Taken)
              </Typography>
            </Grid>
          </Grid>
          {/* File upload input */}

          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-file-1" // Changed this line
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="upload-file">
            <InputFileUpload
              inputProps={{ accept: ".jpg, .png, .svg" }}
              //   onChange={handleFileChange}
              onChange={handleFileUpload}
            />
          </label>

          {/* Display uploaded files */}
          {files.length > 0 && (
            <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>File</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleFileDelete(index)}
                          sx={{
                            outline: "none",
                            "&:focus": { outline: "none" }
                          }}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete"
                            height={"20px"}
                            width={"20px"}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
        <Grid sx={{ padding: "20px", width: "400px" }} xs={12} sm={6} md={6}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography sx={{ fontSize: "400" }}>
                Image Upload (Product Given)
              </Typography>
            </Grid>
          </Grid>

          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-file-2" // Changed this line
            type="file"
            onChange={handleFileUpload2}
          />
          <label htmlFor="upload-file">
            <InputFileUpload
              inputProps={{ accept: ".jpg, .png, .svg" }}
              //   onChange={handleFileChange}
              onChange={handleFileUpload2}
            />
          </label>

          {files2.length > 0 && (
            <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>File</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files2.map((file2, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{file2.name}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleFileDelete2(index)}
                          sx={{
                            outline: "none",
                            "&:focus": { outline: "none" }
                          }}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete"
                            height={"20px"}
                            width={"20px"}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <Typography sx={{ fontSize: "900", fontWeight: "600" }}>
            Part Pending
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={4}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Part Name"
                variant="standard"
                style={{ width: "11rem" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Quantity"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <CommonButton name={"Add Part"} />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Autocomplete
            id="disable-close-on-select"
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Part Name"
                variant="standard"
                style={{ width: "11rem" }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Quantity"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <CommonButton name={"Delete"} />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <TextField
            label="Engineer Remark"
            variant="outlined"
            size="small"
            sx={{ width: "20rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4}></Grid>
        <Grid item xs={12} sm={3} md={4}></Grid>

        {/* <Grid item xs={12} sm={10} md={8}>
          <p style={{ fontSize: "900", color: "#32499F" }}>
            Upload Repair Images (Upload upto 5 images**)
          </p>
          <Grid item xs={12} sm={2} md={2}>
            <InputFileUpload
              type="file"
              onChange={handleImageChange}
              accept=".jpg, .png, .svg"
              multiple
            />
          </Grid>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Uploaded ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover"
                }}
              />
            ))}
          </div>
        </Grid> */}
        {/* Upload Repair Images */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10} md={8}>
            <p style={{ fontSize: "900", color: "#32499F" }}>
              Upload Repair Images (Upload up to 5 images**)
            </p>
            <Grid item xs={12} sm={2} md={2}>
              <InputFileUpload
                type="file"
                onChange={handleImageChange}
                accept=".jpg, .png, .svg"
                multiple
              />
            </Grid>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {(images || []).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Repair ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover"
                  }}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3} md={3}></Grid>
        <Grid item xs={6} sm={3} md={3}></Grid>
        <Grid item xs={6} sm={3} md={2}></Grid>
        <Grid item xs={6} sm={3} md={2}>
          <CommonButton name={"Update"} />
        </Grid>
        <Grid item xs={6} s={3} md={2}>
          <CommonButton name={"Cancel"} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RepairUpdate;
