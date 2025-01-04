// import React from 'react';
// import { Pagination, Stack, IconButton, Typography } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// const Paginate = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const handleChange = (event, page) => {
//     onPageChange(page);
//   };

//   return (
//     <Stack direction="row" alignItems="center" spacing={2}>
//       <IconButton
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         size="small"
//       >
//         <ArrowBackIosNewIcon fontSize="small" />
//       </IconButton>

//       <Typography variant="body2" >
//         Page {currentPage} Out of {totalPages}
//       </Typography>

//       <IconButton
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         size="small"
//       >
//         <ArrowForwardIosIcon fontSize="small" />
//       </IconButton>
//     </Stack>
//   );
// };

// export default Paginate;

import React from "react";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
// import { useSelector } from "react-redux";
import config from "./config";

const Paginate = ({ page, totalRecords, onPageChange, dataSize }) => {
  const pageSize = config.pageSize;

  // console.log("totalRecords", totalRecords,dataSize);
  const totalRecord = Math.ceil(totalRecords / pageSize);

  // console.log("page",page,"tr", totalRecords, "ds",dataSize,"pageSize",pageSize)

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalRecords) {
      onPageChange(page + 1);
    }
  };

  const isPreviousDisabled = page === 1;

  const isNextDisabled = totalRecord === page;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={0}
      bgcolor="#33499F"
      color="white"
      sx={{ width: { lg: "100%", xs: "100%" } }}
    >
      <IconButton
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        sx={{
          color: isPreviousDisabled
            ? "rgba(255, 255, 255, 0.5) !important"
            : "white !important"
        }}
      >
        <ArrowBack />
      </IconButton>
      <Typography variant="body1" mx={2} sx={{ color: "white !important" }}>
        Page
      </Typography>
      <InputBase
        value={page}
        inputProps={{ style: { textAlign: "center", color: "white" } }}
        readOnly
        sx={{
          width: "50px",
          height: 35,
          border: "1px solid #ccc",
          borderRadius: 1,
          padding: "0 8px",
          backgroundColor: "#33499F",
          color: "white"
        }}
      />
      <Typography variant="body1" mx={2} sx={{ color: "white !important" }}>
        Out of {totalRecord}
      </Typography>
      <IconButton
        onClick={handleNext}
        disabled={isNextDisabled}
        sx={{
          color: isNextDisabled
            ? "rgba(255, 255, 255, 0.5) !important"
            : "white !important"
        }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default Paginate;
