// import React, { useState } from "react";
// import "./index.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "./Componants/Header/Header";
// import Loginpage from "./Componants/Login-page/Loginpage";
// import Forgetpage from "./Componants/Login-page/forget-password";
// import Cap from "./Componants/Login-page/Cap";
// import Footer from "./Componants/Footer/Footer";
// import Routespath from "./routes";
// import CreateOrganizations from "./pages/Sidemenu-pages/CreateOrganizations/CreateOrganizations";
// import Sidebar from "./Componants/Sidemenubar/Sidebar";
// import { createRoot } from "react-dom/client";

// const container = document.getElementById("root");
// const root = createRoot(container);

// root.render(<Layout />);

// function Layout() {
//   const [companyName] = useState("Nural");
//   const [activeKey, setActiveKey] = useState("1");
//   const [openKeys, setOpenKeys] = useState(["3", "4"]);
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   if (!localStorage.getItem("token")) {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Loginpage />} />
//           <Route path="/Loginpage" element={<Loginpage />} />
//           <Route path="/forget-password" element={<Forgetpage />} />
//           <Route path="/Cap" element={<Cap />} />
//           <Route
//             path="/CreateOrganizations"
//             element={<CreateOrganizations />}
//           />
//         </Routes>
//       </BrowserRouter>
//     );
//   }

//   return (
//     <BrowserRouter>
//       <div className="container">
//         <Sidebar
//           activeKey={activeKey}
//           openKeys={openKeys}
//           onSelect={setActiveKey}
//           onOpenChange={setOpenKeys}
//           expanded={isSidebarExpanded}
//           onExpand={toggleSidebar}
//         />
//         <div
//           style={{
//             marginLeft: isSidebarExpanded ? "240px" : "60px",
//             transition: "margin-left 0.3s ease",
//           }}
//           className="main-area"
//         >
//           <Header companyName={companyName} />
//           <div className="routepath" style={{ overflowY: "auto !important" }}>
//             <Routespath />
//           </div>
//           <Footer />
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }
import React, { useState } from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Componants/Header/Header";
import Loginpage from "./Componants/Login-page/Loginpage";
import Forgetpage from "./Componants/Login-page/forget-password";
import Cap from "./Componants/Login-page/Cap";
import Footer from "./Componants/Footer/Footer";
import Routespath from "./routes";
import CreateOrganizations from "./pages/Sidemenu-pages/CreateOrganizations/CreateOrganizations";
import Sidebar from "./Componants/Sidemenubar/Sidebar";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Layout />);

function Layout() {
  const [companyName] = useState("Nural");
  const [activeKey, setActiveKey] = useState("1");
  const [openKeys, setOpenKeys] = useState(["3", "4"]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  if (!localStorage.getItem("token")) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/Loginpage" element={<Loginpage />} />
          <Route path="/forget-password" element={<Forgetpage />} />
          <Route path="/Cap" element={<Cap />} />
          <Route
            path="/CreateOrganizations"
            element={<CreateOrganizations />}
          />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Sidebar
          activeKey={activeKey}
          openKeys={openKeys}
          onSelect={setActiveKey}
          onOpenChange={setOpenKeys}
          expanded={isSidebarExpanded}
          onExpand={toggleSidebar}
        />
        <div
          className={`main-content ${
            isSidebarExpanded ? "expanded" : "collapsed"
          }`}
        >
          <Header companyName={companyName} />
          <div
            className={`routepath ${
              isSidebarExpanded ? "expanded" : "collapsed"
            }`}
          >
            <Routespath />
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
