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

import React, { useState, useEffect } from "react";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import config from "./config";

const Paginate = ({ page, totalRecords, onPageChange, dataSize }) => {
  const pageSize = config.pageSize;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const [inputPage, setInputPage] = useState(page.toString());

  // Update input when page prop changes
  useEffect(() => {
    setInputPage(page.toString());
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Allow only numbers and empty string
    if (/^\d*$/.test(value)) {
      setInputPage(value);
    }
  };

  const handleInputBlur = () => {
    let numericPage = parseInt(inputPage, 10);

    // If empty or invalid, reset to current page
    if (!numericPage || isNaN(numericPage)) {
      setInputPage(page.toString());
      return;
    }

    // Clamp the value between 1 and totalPages
    numericPage = Math.max(1, Math.min(numericPage, totalPages));
    
    // Only trigger page change if the page actually changed
    if (numericPage !== page) {
      onPageChange(numericPage);
    }
    
    // Update input to reflect actual page
    setInputPage(numericPage.toString());
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleInputBlur();
    }
  };

  const isPreviousDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={1}
      bgcolor="#33499F"
      color="white"
      sx={{ width: "100%" }}
    >
      <IconButton
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        sx={{
          color: isPreviousDisabled
            ? "rgba(255, 255, 255, 0.5) !important"
            : "white !important",
        }}
      >
        <ArrowBack />
      </IconButton>
      <Typography variant="body1" mx={2} sx={{ color: "white !important" }}>
        Page
      </Typography>
      <InputBase
        value={inputPage}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyPress={handleKeyPress}
        inputProps={{ 
          style: { 
            textAlign: "center", 
            color: "white",
            width: "30px"
          }
        }}
        sx={{
          height: 35,
          border: "1px solid #ccc",
          borderRadius: 1,
          padding: "0 8px",
          backgroundColor: "#33499F",
          color: "white",
          '&:hover': {
            backgroundColor: '#3f57b3'
          }
        }}
      />
      <Typography variant="body1" mx={2} sx={{ color: "white !important" }}>
        Out of {totalPages}
      </Typography>
      <IconButton
        onClick={handleNext}
        disabled={isNextDisabled}
        sx={{
          color: isNextDisabled
            ? "rgba(255, 255, 255, 0.5) !important"
            : "white !important",
        }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default Paginate;
