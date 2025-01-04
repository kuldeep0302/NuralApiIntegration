import React, { useState } from "react";
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Switch,
  Typography,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  Paper,
  TableBody,
  Chip,
  IconButton,
} from "@mui/material";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import Subheader from "../../../Componants/Common/Subheader";
import CommonButton from "../../../Componants/Common/Button";
import activeIcon from "../../../Assests/activeIcon.svg";
import infoIcon from "../../../Assests/infoIcon.svg";

const modules = Array.from({ length: 15 }, (_, i) => `Module ${i + 1}`);
const cells = [
  "Name",
  "Description",
  "Per User License",
  "Modules",
  "Created On",
  "Created By",
  "Status",
  "Action",
];
const rows = [
  {
    name: "Basic Plan",
    description: "Includes core modules with limited features.",
    license: "$10",
    modules: "5",
    createdOn: "2023-10-01",
    createdBy: "Admin",
    status: "Active",
    action: "Manage",
  },
  {
    name: "Pro Plan",
    description: "Full feature set with priority support.",
    license: "$20",
    modules: "10",
    createdOn: "2023-09-15",
    createdBy: "John Doe",
    status: "Inactive",
    action: "Manage",
  },
  {
    name: "Enterprise Plan",
    description: "Customizable plan for large businesses.",
    license: "$50",
    modules: "Unlimited",
    createdOn: "2023-08-10",
    createdBy: "Jane Smith",
    status: "Active",
    action: "Manage",
  },
];
const CreateSubscription = () => {
  const [status, setStatus] = useState(false);

  return (
    <Grid container>
      <HeaderNavigation value={"Subscription"} />
      <Grid
        sx={{
          background: "#EFF3FE",
          marginLeft: "10px",
          marginTop: "4px",
          marginRight: "10px",
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
          width: "100%",
          borderRadius: "5px",
          padding: "10px",
          fontWeight: 600,
        }}
      >
        {" "}
        <Subheader heading={"Create Subscription"} />
        <Grid container gap={6}>
          <Grid item xs={8} md={3}>
            <TextField width="fit-content" label="Name" variant="standard" />
          </Grid>
          <Grid item xs={8} md={3}>
            <TextField
              width="fit-content"
              label="Description"
              variant="standard"
            />
          </Grid>
          <Grid item xs={8} md={3}>
            <TextField
              width="fit-content"
              label="Per User License Cost"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12}>
            <Subheader heading={"Select Moduels"} />
          </Grid>
          {modules.map((module, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FormControlLabel
                control={<Checkbox name={module} />}
                label={module}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          gap={3}
          justifyContent={"flex-end"}
          sx={{
            background: "#EFF3FE",
            marginLeft: "10px",
            marginTop: "4px",
            marginRight: "10px",
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            width: "100%",
            borderRadius: "5px",
            padding: "10px",
            fontWeight: 600,
          }}
        >
          <CommonButton name={"Create"} />
          <CommonButton name={"Close"} />
        </Grid>
      </Grid>
      <Grid
        sx={{
          background: "#EFF3FE",
          marginLeft: "10px",
          marginTop: "4px",
          marginRight: "10px",
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
          width: "100%",
          borderRadius: "5px",
          padding: "10px",
          fontWeight: 600,
        }}
      >
        <Grid container>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {cells.map((cell, index) => (
                    <TableCell
                      key={index}
                      sx={{ color: "white", textAlign: "center" }}
                    >
                      {cell}
                    </TableCell> // Adding a key prop
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.license}</TableCell>
                    <TableCell align="center">{row.modules}</TableCell>
                    <TableCell align="center">{row.createdOn}</TableCell>
                    <TableCell align="center">{row.createdBy}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        // onClick={() => handleStatus(index)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={activeIcon}
                          alt="active"
                          height={"20px"}
                          width={"20px"}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        // onClick={() => handleStatus(index)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={infoIcon}
                          alt="active"
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateSubscription;
