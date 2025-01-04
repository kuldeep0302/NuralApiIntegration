import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LoginPageImage from "../../Assests/LoginPageImage.svg";
import loginFooter from "../../Assests/loginFooter.svg";
import companyLogo from "../../Assests/CompanyLogo.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "./Loginpage.css";
import toast, { Toaster } from "react-hot-toast";
import logInAPI, { logInAPICall } from "../../API Service/apiService";
import { useNavigate } from "react-router-dom";
const Loginpage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [postData, setPostData] = useState({
    accessKey: "",
    username: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  // api call
  const handleLogin = async () => {
    try {
      const postData = {
        accessKey: accessKey,
        username: userName,
        password: password,
      };
      const response = await logInAPICall(postData);
      if (response) console.log(`response of login ${response.data.token}`);
      if (response) {
        const newToken = response.data.token;
        setToken(newToken);
        console.log("Server response:", response.data.token);
        toast.success(response.message);
      }
    } catch (err) {
      console.log("error in api call", err);
      const errorMessage = err.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw err;
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        localStorage.setItem("token", token);
        const form = e.target;
        if (form.checkValidity()) {
          console.log("Form is valid");
          await handleLogin();

          if (token) {
            window.location.href = "/";
          }
        } else {
          form.reportValidity();
        }
      }}
      noValidate
    >
      <Toaster position="top-center" reverseOrder={false} />
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
              <Typography variant="h6">Login into Your Account</Typography>
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
                      label="Access Key"
                      id="outlined-size-small"
                      size="small"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                    />
                  </div>
                </Box>
              </Grid>
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
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <div>
                    <FormControl
                      sx={{ m: 1, width: "30ch" }}
                      variant="outlined"
                      size="small"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </FormControl>
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
                <Link href="/forget-password" underline="hover">
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
                  // onClick={(e) => handleLogin()}
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
