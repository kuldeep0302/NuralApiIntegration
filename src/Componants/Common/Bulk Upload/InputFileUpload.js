// import { Grid } from '@mui/material'
// import React from 'react'

// const uploadIcon = () => {
//   return (
//     <Grid>

//     </Grid>
//   )
// }

// export default uploadIcon

import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload( {onChange, accept}) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        backgroundColor: "#33499F",
        color: "white",
        boxShadow: " 4px 2px 4px rgb(110, 142, 237)",
        marginTop: "10px",
        marginBottom: "10px",
        fontSize: "15px",
        width: "max-content",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#1565c0", // Lighter shade of the initial color on hover
        },
      }}
    >
      Choose File
      <VisuallyHiddenInput
        type="file"
        
        accept={accept}
        // onChange={(event) => console.log(event.target.files)}
        onChange={onChange}
        multiple
      />
    </Button>
  );
}
