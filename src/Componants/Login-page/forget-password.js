import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import LoginPageImage from "../../Assests/LoginPageImage.svg";
import loginFooter from "../../Assests/loginFooter.svg";
import companyLogo from "../../Assests/CompanyLogo.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "./Loginpage.css";
const Loginpage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  // const handleLogin = (e) => {
  //   e.preventDefault(); // Prevent form submission
  //   localStorage.setItem("token", "1234");
  // };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        localStorage.setItem("token", "1234");
        const form = e.target;
        if (form.checkValidity()) {
          // Process form data
          console.log("Form is valid");
        } else {
          form.reportValidity(); // This will show validation errors for all required fields
        }
      }}
      noValidate
    >
      <Grid container className="body">
        {/* left side */}
        <Grid container md={5}>
          <Grid
            container
            gap={1}
            className="loginForm"
            direction="column"
            alignItems="center"
          >
            <Grid item sx={{ marginTop: "5px", padding: 0 }}>
              <img
                src={companyLogo}
                alt="Company Logo"
                className="companyLogo"
              />
            </Grid>
            <Grid item sx>
              <Typography variant="h6">Get Your Password</Typography>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              direction={"row"}
              className="form"
            >
              <Grid item>
                <Box
                  sx={{ "& .MuiTextField-root": { m: 1, width: "30ch" } }}
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      label="User Name"
                      id="outlined-size-small"
                      size="small"
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item container justifyContent={'center'} sm={12} md={12}>
                <Typography >OR</Typography>
              </Grid>
              <Grid item>
                <Box
                  sx={{ "& .MuiTextField-root": { m: 1, width: "30ch" } }}
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      label="Email ID"
                      id="outlined-size-small"
                      size="small"
                    />
                  </div>
                </Box>
              </Grid>
             

              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Link href="#" underline="hover">
                  Forgot password?
                </Link>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                sx={{ marginTop: "1rem" }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  // onClick={handleLogin}
                  style={{
                    backgroundColor: "#05CFD3",
                    color: "#fff",
                    borderRadius: "12px",
                    width: "100%",
                  }}
                >
                  <strong> LOGIN </strong>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* right side  */}
        <Grid item md={6}>
          <Grid container>
            <Grid item className="rightSide">
              <Typography variant="h5" className="nuralTag">
                {/* <strong>Nural Service</strong> */}
              </Typography>
              <Grid container justifyContent={"center"} className="loginImage">
                <img src={LoginPageImage} alt="" className="img" />
              </Grid>
              <Grid
                container
                justifyContent={"center"}
                sx={{ padding: "10px" }}
                className="loginFooter"
              >
                <img src={loginFooter} alt="" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Loginpage;
