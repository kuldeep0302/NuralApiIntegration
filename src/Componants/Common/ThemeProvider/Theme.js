import { fontSize, fontWeight } from "@mui/system";
import { createContext, useState } from "react";

export const Theme = createContext();

export const ThemeProvider = ({ children }) => {
  const [light, setLight] = useState(false);
  const btnstyle = {
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
  };
  const tempStyle = {
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: 700,
  };
  const listStyle = {
    fontFamily: "Open Sans",
    fontSize: "16px !important",
    fontWeight: 500,
    lineHeight: "20px",
    textAlign: "left",
  };
  const bulkUpload = { fontWeight: "600", mb: "1rem", fontSize: "16px" };
  return (
    <Theme.Provider
      value={{ light, setLight, btnstyle, tempStyle, bulkUpload, listStyle }}
    >
      {children}
    </Theme.Provider>
  );
};
