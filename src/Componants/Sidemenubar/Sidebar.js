import { Sidenav, Nav } from "rsuite";
// import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import customer from "../../Assests/customer.svg";
import dashboard from "../../Assests/dashboard.svg";
import help from "../../Assests/help.svg";
import report from "../../Assests/report.svg";
import servicecenter from "../../Assests/servicecenter.svg";
import superadmin from "../../Assests/superadmin.svg";
import { useState } from "react";

const styles = {
  width: 240,
  height: "100vh",
  position: "fixed",
  margin: "auto",
  paddingLeft: "0 !important"
};

const scrollableStyles = {
  height: "calc(100vh - 60px)",
  overflowY: "auto",
  paddingBottom: "10rem"
};

const Sidebar = ({
  appearance,
  openKeys,
  expanded,
  onOpenChange,
  onExpand,
  ...navProps
}) => {
  const [open, setOpen] = useState(false);

  const handleIconClick = (e) => {
    // If the sidebar is collapsed, expand it
    if (!expanded) {
      onExpand(); 
    }
  };

  return (
    <div>
      <div
        style={styles}
      >
        <Sidenav
          appearance={appearance}
          expanded={expanded}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          <Sidenav.Toggle onToggle={onExpand} />
          <div className="sidebar-logo">
            <img
              src="https://nural-sales-document-bucket.s3-ap-south-1.amazonaws.com/picture/0.5999497521591091WhatsApp Image 2023-04-04 at 4.59.23 PM.jpeg"
              alt="Company logo"
            />
            <div className="sidebar-logo-text">
              <p>NURAL</p>
            </div>
          </div>

          <div style={scrollableStyles}>
            <Sidenav.Body>
              <Nav {...navProps}>
                {/* SUPERADMIN */}
                <Nav.Menu
                  eventKey="1"
                  title={expanded ? "Super-Admin" : ""}
                  icon={
                    <img
                      src={superadmin}
                      alt="Super Admin Icon"
                      title="Super-Admin"
                      onClick={handleIconClick} // Handle click on the icon
                    />
                  }
                  className={expanded ? "" : "expandable-icon"} // Add class when collapsed
                >
                  <Nav.Item eventKey="1-1">
                    <Link to="/Dashboardsuperadmin" className="link-black">
                      Dashboard
                    </Link>
                  </Nav.Item>
                  <Nav.Item eventKey="1-2">
                    <Link to="/Financialdashboard" className="link-black">
                      Financial dashboard
                    </Link>
                  </Nav.Item>
                  <Nav.Item eventKey="1-3">
                    <Link to="/CreateOrganizations" className="link-black">
                      Create Clients/Organizations
                    </Link>
                  </Nav.Item>
                  <Nav.Item eventKey="1-4">
                    <Link to="/Dashboardtrails" className="link-black">
                      Trails
                    </Link>
                  </Nav.Item>
                  <Nav.Item eventKey="1-5">
                    <Link to="/Subscriptions" className="link-black">
                      Subscriptions
                    </Link>
                  </Nav.Item>
                </Nav.Menu>
                {/* DASHBOARD */}
                <Nav.Menu
                  eventKey="2"
                  // title="Dashboard"
                  title={expanded ? "Dashboard" : ""} // Conditionally show title
                  //  icon={<DashboardIcon />}
                  icon={
                    <img
                      src={dashboard}
                      alt="Dashboard Icon"
                      title="Dashboard"
                      onClick={handleIconClick} // Handle click on the icon
                    />
                  }
                  className={expanded ? "" : "expandable-icon"} // Add class when collapsed
                >
                  <Nav.Item eventKey="2-1">
                    <Link to="/Reappoitment" className="link-black">
                      Dashboard
                    </Link>
                  </Nav.Item>
                  <Nav.Item eventKey="2-2">
                    <Link to="/Reappoitment" className="link-black">
                      Call-Dashboard
                    </Link>
                  </Nav.Item>
                  <Nav.Item eventKey="2-3">
                    <Link to="/Amcdashboard" className="link-black">
                      AMC-Dashboard
                    </Link>
                  </Nav.Item>
                  <Nav.Item eventKey="2-4">
                    <Link to="/Amcdashboard" className="link-black">
                      Inventory Dashboard
                    </Link>
                  </Nav.Item>
                  <Nav.Item eventKey="2-5">
                    <Link to="/Amcdashboard" className="link-black">
                      Service Dashboard
                    </Link>
                  </Nav.Item>
                </Nav.Menu>
                {/* CUSTOMER */}
                {/* <Nav.Menu
                  eventKey="3"
                  // title="Customer"
                  title={expanded ? "Customer" : ""}
                  // icon={<DashboardIcon />}
                  icon={
                    <img src={customer} alt="Customer Icon" title="Customer" />
                  }
                > */}
                <Nav.Menu
                  eventKey="3"
                  title={expanded ? "Customer" : ""}
                  icon={
                    <img
                      src={customer}
                      alt="Customer Icon"
                      title="Customer"
                      onClick={handleIconClick} // Handle click on the icon
                    />
                  }
                  className={expanded ? "" : "expandable-icon"} // Add class when collapsed
                >
                  <Nav.Item eventKey="3-1">
                    <Link to="/Customerservice" className="link-black">
                      Create Customer
                    </Link>
                  </Nav.Item>
                  <Nav.Item eventKey="3-2">
                    <Link to="/Searchdealercustomer" className="link-black">
                      Search Customer
                    </Link>
                  </Nav.Item>
                </Nav.Menu>
                {/* service-center */}
                <Nav.Menu
                  eventKey="4"
                  // title="Service-Center"
                  title={expanded ? "Service-Center" : ""}
                  // icon={<DashboardIcon />}
                  icon={
                    <img
                      src={servicecenter}
                      alt="Servicecenter Icon"
                      title="Service-Centerr"
                      onClick={handleIconClick} // Handle click on the icon
                    />
                  }
                  className={expanded ? "" : "expandable-icon"} // Add class when collapsed
                >
                  <Nav.Item eventKey="4-1">
                    <Link to="/Jobsheets" className="link-black">
                      Jobsheet
                    </Link>
                  </Nav.Item>
                  <Nav.Item eventKey="4-2">
                    <Link to="/Bufferstockallocation" className="link-black">
                      Buffer stock allocation
                    </Link>
                  </Nav.Item>
                </Nav.Menu>
                {/* Reports */}
                <Nav.Menu
                  eventKey="5"
                  // title="Report"
                  title={expanded ? "Report" : ""}
                  // icon={<DashboardIcon />}
                  icon={
                    <img
                      src={report}
                      alt="report Icon"
                      title="Report"
                      onClick={handleIconClick} // Handle click on the icon
                    />
                  }
                  className={expanded ? "" : "expandable-icon"} // Add class when collapsed
                >
                  <Nav.Menu eventKey="5-1" title="Service Reports">
                    <Nav.Item eventKey="5-1-1">
                      <Link to="/JobReport" className="link-black">
                        Job Report
                      </Link>
                    </Nav.Item>
                    <Nav.Item eventKey="5-1-2">
                      <Link to="/Closecallreport" className="link-black">
                        Closed Call Report
                      </Link>
                    </Nav.Item>
                    <Nav.Item eventKey="5-1-3">
                      <Link to="/Callupdationmobile" className="link-black">
                        Call Updation From Mobile-App Report
                      </Link>
                    </Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu eventKey="5-2" title="Inventory Reports">
                    <Nav.Item eventKey="5-2-1">
                      <Link
                        to="/Engineerpartconsumption"
                        className="link-black"
                      >
                        Engineer Part Consumption
                      </Link>
                    </Nav.Item>
                    <Nav.Item eventKey="5-2-2">
                      <Link to="/Stockinhand" className="link-black">
                        Stock In Hand
                      </Link>
                    </Nav.Item>
                  </Nav.Menu>
                </Nav.Menu>
                {/* Help */}
                <Nav.Menu
                  eventKey="6"
                  // title="Help"
                  title={expanded ? "Help" : ""}
                  // icon={<DashboardIcon />}
                  icon={
                    <img
                      src={help}
                      alt="help Icon"
                      title="Help"
                      onClick={handleIconClick} // Handle click on the icon
                    />
                  }
                  className={expanded ? "" : "expandable-icon"} // Add class when collapsed
                >
                  <Nav.Item eventKey="6-1">
                    <Link to="/Changepassword" className="link-black">
                      Change Password
                    </Link>
                  </Nav.Item>
                  <Nav.Item eventKey="6-2">
                    <Link to="/Jobsheetsearch" className="link-black">
                      Jobsheet Search
                    </Link>
                  </Nav.Item>
                </Nav.Menu>
              </Nav>
            </Sidenav.Body>
          </div>
        </Sidenav>
      </div>
    </div>
  );
};

export default Sidebar;
