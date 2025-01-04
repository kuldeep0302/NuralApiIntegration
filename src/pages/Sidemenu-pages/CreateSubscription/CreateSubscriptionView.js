import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { FaEdit } from "react-icons/fa";

const subscriptions = [
  {
    name: "xxxx",
    description: "xxxxxx",
    perUserLicense: "xxxx",
    modules: "xxxxx",
    createdOn: "xxxxx",
    createdBy: "xxxxx",
    status: "Active",
  },
  {
    name: "xxxx",
    description: "xxxxxx",
    perUserLicense: "xxx",
    modules: "xxxxx",
    createdOn: "xxxxx",
    createdBy: "xxxxx",
    status: "Active",
  },
];

const CreateSubscriptionView = () => {
  return (
    <>
        <div
        className="firstbox-ClientOrganization"
        style={{
          borderBottom: "1px solid #ccc",
          paddingTop: "20px",
          paddingLeft: "25px",
          height: "60px",
          fontSize: "x-large !important",
          position: "relative",
          bottom: "20px",
        }}
      >
        <h2 className="first-text-ClientOrganization">Subscription</h2>
      </div>
      <TableContainer component={Paper} sx={{ margin: "10px", fontSize: "large"}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{backgroundColor:"#33499F", color:"white"}}>Name</TableCell>
            <TableCell sx={{backgroundColor:"#33499F", color:"white"}}>Description</TableCell>
            <TableCell sx={{backgroundColor:"#33499F", color:"white"}}>Per User License</TableCell>
            <TableCell sx={{backgroundColor:"#33499F", color:"white"}}>Modules</TableCell>
            <TableCell sx={{backgroundColor:"#33499F", color:"white"}}>Created On</TableCell>
            <TableCell sx={{backgroundColor:"#33499F", color:"white"}}>Created By</TableCell>
            <TableCell sx={{backgroundColor:"#33499F", color:"white"}}>Status</TableCell>
            <TableCell sx={{backgroundColor:"#33499F", color:"white"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions.map((subscription, index) => (
            <TableRow key={index}>
              <TableCell>{subscription.name}</TableCell>
              <TableCell>{subscription.description}</TableCell>
              <TableCell>{subscription.perUserLicense}</TableCell>
              <TableCell>{subscription.modules}</TableCell>
              <TableCell>{subscription.createdOn}</TableCell>
              <TableCell>{subscription.createdBy}</TableCell>
              <TableCell>{subscription.status}</TableCell>
              <TableCell>
              <FaEdit style={{ cursor: "pointer", marginRight: "5px" }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
   
  );
};

export default CreateSubscriptionView;
