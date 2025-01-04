import React, { useEffect, useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faBell,
  faCog,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";

// const Header = ({ companyName }) => {
//   const [sidebarState, setSidebarState] = useState("hide");

//   const togglesideMenu = () => {
//     const sidebar = document.getElementById("sidebar");
//     const screenWidth = window.innerWidth;

//     if (screenWidth <= 768) {
//       if (sidebarState === "hide") {
//         sidebar.style.display = "block";
//         setTimeout(() => {
//           sidebar.className = "content animate__animated animate__bounceInDown";
//         }, 10);
//         setSidebarState("show");
//       } else {
//         sidebar.className = "content animate__animated animate__bounceOutUp";
//         setTimeout(() => {
//           sidebar.style.display = "none";
//         }, 300);
//         setSidebarState("hide");
//       }
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         // Adjusted the threshold
//         setSidebarState("show");
//       } else {
//         setSidebarState("hide");
//         const sidebar = document.getElementById("sidebar");
//         sidebar.style.display = "none";
//       }
//     };

//     // Initialize sidebar state based on screen width
//     handleResize();

//     // Attach the resize event listener
//     window.addEventListener("resize", handleResize);

//     // Cleanup function to remove the event listener when component unmounts
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <>
//       <nav className="main-nav" >
//         <div className="fawithname-header">
//           <div className="fa-bar">
//             <FontAwesomeIcon onClick={togglesideMenu} icon={faBars} />{" "}
//           </div>
//           <div>
//             <div className="nural-welcome">
//               <h3>Welcome! {companyName}</h3>
//             </div>
//             <p>COMPANY ADMIN</p>
//             <p>{new Date().toLocaleDateString()}</p>
//           </div>
//         </div>

//         <div className="icon-container">
//           <div className="icone-header">
//             <div className="frstthree-header">
//               {" "}
//               <Badge
//                 color="error"
//                 badgeContent={99}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//               >
//                 <FontAwesomeIcon className="header-icon" icon={faBell} />
//               </Badge>
//               <div>
//                 <Link
//                   className="header-icon"
//                   style={{ color: "white" }}
//                   to="/setting"
//                 >
//                   <FontAwesomeIcon icon={faCog} />
//                 </Link>
//               </div>
//               <FontAwesomeIcon
//                 className="header-icon"
//                 icon={faQuestionCircle}
//               />
//             </div>
//             <div className="circleIcon">
//               <FontAwesomeIcon className="header-icon" icon={faUser} />
//               <div className="dropdown-content">
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem("token");
//                     window.location.reload();
//                   }}
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="header-logo">
//             <img
//               src="photos\NService Full 1.png"
//               className="powerdby-header"
//               alt=""
//             />
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

const Header = ({ companyName }) => {
  const [sidebarState, setSidebarState] = useState("expanded");

  const toggleSideMenu = () => {
    const sidebar = document.getElementById("sidebar");

    if (sidebarState === "expanded") {
      sidebar.style.display = "none";
      setSidebarState("collapsed");
    } else {
      sidebar.style.display = "block";
      setSidebarState("expanded");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarState("expanded");
      } else {
        setSidebarState("collapsed");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={`main-nav ${sidebarState}`}>
      <div className="fawithname-header">
        <div className="fa-bar">
          <FontAwesomeIcon onClick={toggleSideMenu} icon={faBars} />{" "}
        </div>
        <div>
          <div className="nural-welcome">
            <h3>Welcome! {companyName}</h3>
          </div>
          <p>COMPANY ADMIN</p>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="icon-container">
        <div className="icone-header">
          <div className="frstthree-header">
            <Badge color="error" badgeContent={99}>
              <FontAwesomeIcon className="header-icon" icon={faBell} />
            </Badge>
            <Link
              className="header-icon"
              to="/setting"
              style={{ color: "white" }}
            >
              <FontAwesomeIcon icon={faCog} />
            </Link>
            <FontAwesomeIcon className="header-icon" icon={faQuestionCircle} />
          </div>
          <div className="circleIcon">
            <FontAwesomeIcon className="header-icon" icon={faUser} />
            <div className="dropdown-content">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="header-logo">
          <img
            src="photos/NService Full 1.png"
            className="powerdby-header"
            alt=""
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
