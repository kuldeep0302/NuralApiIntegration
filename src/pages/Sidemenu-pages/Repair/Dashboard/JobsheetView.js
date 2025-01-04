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
  Box
} from "@mui/material";

const JobsheetView = ({ paymentImages = [], images = [] }) => {
  const jobVisitData = [
    {
      engineer: "XXXX",
      scheduledDate: "XXXXXXXXX",
      actualVisitDate: "XXXXXXXXX",
      inOutTime: "XXXX",
      engineerRemark: "XXXX",
      customerRemark: "XXXX",
      collectedAmount: "XXXX",
      paymentMode: "XXXX",
      transactionNo: "XXXX"
    }
    // Add more rows as needed
  ];

  const partUsedData = [
    {
      repairAction: "XXXX",
      partName: "XXXX",
      serial: "XXXX",
      quantity: "XXXX",
      usedPending: "Pending"
    },
    {
      repairAction: "XXXX",
      partName: "XXXX",
      serial: "XXXX",
      quantity: "XXXX",
      usedPending: "Used"
    }
    // Add more rows as needed
  ];

  const actionLogData = [
    { actionDate: "XXXX", user: "XXXX", actionDone: "XXXX" }
    // Add more rows as needed
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#EFF3FE" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Jobsheet View
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Jobsheet No"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Creation Date"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Created By"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}></Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Service Center"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Jobsheet Closure Date"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Jobsheet Status"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}></Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Customer Remark"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <p sx={{ fontSize: "900" }}>Customer Details</p>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            label="Customer Name"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Mobile No"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Email Id"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Address"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Alternate No"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <p sx={{ fontSize: "900" }}>Product Details</p>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            label="Brand"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Category"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Sub Category"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Model"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Serial"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Warranty Status"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}></Grid>
        <Grid item xs={12} sm={4} md={3}></Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Engineer Remark"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Date of Purchase"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Purchase from"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}></Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Invoice No"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Invoice Image"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Swap Product/Serial"
            variant="standard"
            size="small"
            sx={{ width: "10rem" }}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography
          sx={{
            width: "10rem",
            backgroundColor: "#33499F",
            color: "white",
            borderRadius: "4px 4px 0 0"
          }}
        >
          Job Visit
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Engineer</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  Scheduled Date/Time
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>Actual Visit Date</TableCell>
                <TableCell sx={{ color: "#fff" }}>In/Out Time</TableCell>
                <TableCell sx={{ color: "#fff" }}>Engineer Remark</TableCell>
                <TableCell sx={{ color: "#fff" }}>Customer Remark</TableCell>
                <TableCell sx={{ color: "#fff" }}>Collected Amount</TableCell>
                <TableCell sx={{ color: "#fff" }}>Payment Mode</TableCell>
                <TableCell sx={{ color: "#fff" }}>Transaction No</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobVisitData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.engineer}</TableCell>
                  <TableCell>{row.scheduledDate}</TableCell>
                  <TableCell>{row.actualVisitDate}</TableCell>
                  <TableCell>{row.inOutTime}</TableCell>
                  <TableCell>{row.engineerRemark}</TableCell>
                  <TableCell>{row.customerRemark}</TableCell>
                  <TableCell>{row.collectedAmount}</TableCell>
                  <TableCell>{row.paymentMode}</TableCell>
                  <TableCell>{row.transactionNo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mt={4}>
        <Typography
          sx={{
            width: "10rem",
            backgroundColor: "#33499F",
            color: "white",
            borderRadius: "4px 4px 0 0"
          }}
        >
          PartUsed/Pending
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Repair Action</TableCell>
                <TableCell sx={{ color: "#fff" }}>Part Name</TableCell>
                <TableCell sx={{ color: "#fff" }}>Serial</TableCell>
                <TableCell sx={{ color: "#fff" }}>Quantity</TableCell>
                <TableCell sx={{ color: "#fff" }}>Used/Pending</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partUsedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.repairAction}</TableCell>
                  <TableCell>{row.partName}</TableCell>
                  <TableCell>{row.serial}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.usedPending}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mt={4}>
        <Typography
          sx={{
            width: "10rem",
            backgroundColor: "#33499F",
            color: "white",
            borderRadius: "4px 4px 0 0"
          }}
        >
          Jobsheet Action Log
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Action Date</TableCell>
                <TableCell sx={{ color: "#fff" }}>User</TableCell>
                <TableCell sx={{ color: "#fff" }}>Action Done</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actionLogData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.actionDate}</TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{row.actionDone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <h3>Uploaded Repair Images</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {images.length > 0 ? (
              images.map((image, index) => (
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
              ))
            ) : (
              <p>No repair images uploaded</p>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <h3>Uploaded Payment Images</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {paymentImages.length > 0 ? (
              paymentImages.map((image, index) => (
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
              ))
            ) : (
              <p>No payment images uploaded</p>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobsheetView;
