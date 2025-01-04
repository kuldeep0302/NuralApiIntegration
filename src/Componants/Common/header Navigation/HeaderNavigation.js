import { Box, Paper, Stack, styled } from "@mui/material";
import { Link } from "react-router-dom";
import "./headerNavigation.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //   color: theme.palette.text.secondary,
  marginLeft: `${theme.spacing(1.25)} !important`,
  marginRight: `${theme.spacing(1.25)} !important`,
  fontSize: "17px",

  fontWeight: 700,
}));

const HeaderNavigation = ({ value, location }) => {

  return (
    <Box sx={{ width: "100%" }}>
      <Stack>
        <Item className="item">
          {/* <span className="arrow">
            <Link to={location}>
              <img src="photos\arrow.png" alt="back" />
            </Link>
          </span> */}
          {value}
        </Item>
      </Stack>
    </Box>
  );
};

export default HeaderNavigation;
