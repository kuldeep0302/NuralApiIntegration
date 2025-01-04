import React, { useState } from "react";
import "./Sidemenu.css";
import { Menu } from "antd";
import { useNavigate, Link } from "react-router-dom";
import {
  DashboardOutlined,
  FileTextOutlined,
  PhoneOutlined,
  ToolOutlined,
  BarChartOutlined,
  FileOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";

const Sidemenu = ({ companyName }) => {
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([]);

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setOpenKeys([]);
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const { SubMenu } = Menu;

  return (
    <>
      <div id="sidebar" className="content">
        <div className="sidebar-logo">
          <img
            src="https://nural-sales-document-bucket.s3-ap-south-1.amazonaws.com/picture/0.5999497521591091WhatsApp Image 2023-04-04 at 4.59.23 PM.jpeg"
            alt=""
          />
          <div className="sidebar-logo-text">
            <p>{companyName}</p>
          </div>
        </div>

        <Menu
          className="menu"
          id="menu"
          onClick={handleMenuClick}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
        >
          <SubMenu
            key="super-admin"
            title="Super-Admin"
            icon={<PhoneOutlined />}
          >
            <Menu.Item key="/Dashboardsuperadmin">
              <Link to="/Dashboardsuperadmin">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/Financialdashboard">
              <Link to="/Financialdashboard">Financial dashboard</Link>
            </Menu.Item>
            <Menu.Item key="CreateOrganizations">
              <Link to="CreateOrganizations">
                Create Clients{"/"}Organizations
              </Link>
            </Menu.Item>
            <Menu.Item key="/Dashboardtrails">
              <Link to="/Dashboardtrails">Trails</Link>
            </Menu.Item>
            <Menu.Item key="/Subscriptions">
              <Link to="/Subscriptions">Subscriptions</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="dashboard"
            title="Dashboard"
            icon={<DashboardOutlined />}
          >
            <Menu.Item key="/Dashboard">
              <Link to="/Dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/Reappoitment">
              <Link to="/Reappoitment">Call-Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/Amcdashboard">
              <Link to="/Amcdashboard">AMC-Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/inventory-dashboard">
              <Link to="/Amcdashboard">Inventory Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/service-dashboard">
              <Link to="/Amcdashboard">Service Dashboard</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="customer" title="Customer" icon={<PhoneOutlined />}>
            <Menu.Item key="/Customerservice">
              <Link to="/Customerservice">Create Customer</Link>
            </Menu.Item>
            <Menu.Item key="/Searchdealercustomer">
              <Link to="/Searchdealercustomer">Search Customer</Link>
            </Menu.Item>
          </SubMenu>

          <Menu
            key="call-center"
            title="Call Center"
            icon={<PhoneOutlined />}
          ></Menu>

          <SubMenu
            key="service-center"
            title="Service Center"
            icon={<ToolOutlined />}
          >
            <Menu.Item key="/Jobsheets">
              <Link to="/Jobsheets">Jobsheet</Link>
            </Menu.Item>
            <Menu.Item key="/Bufferstockallocation">
              <Link to="/Bufferstockallocation">Buffer stock allocation</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="report" title="Report" icon={<FileOutlined />}>
            <SubMenu
              key="service-reports"
              title="Service Reports"
              icon={<FileTextOutlined />}
            >
              <Menu.Item key="/JobReport">
                <Link to="/JobReport">Job Report</Link>
              </Menu.Item>
              <Menu.Item key="/Closecallreport">
                <Link to="/Closecallreport">Closed Call Report</Link>
              </Menu.Item>
              <Menu.Item key="/Callupdationmobile">
                <Link to="/Callupdationmobile">
                  Call Updation From Mobile-App Report
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="inventory-reports"
              title="Inventory Reports"
              icon={<BarChartOutlined />}
            >
              <Menu.Item key="/Engineerpartconsumption">
                <Link to="/Engineerpartconsumption">
                  Engineer Part Consumption
                </Link>
              </Menu.Item>
              <Menu.Item key="/Stockinhand">
                <Link to="/Stockinhand">Stock In Hand</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu key="help" title="Help" icon={<QuestionCircleOutlined />}>
            <Menu.Item key="/Changepassword">
              <Link to="/Changepassword">Change Password</Link>
            </Menu.Item>
            <Menu.Item key="/Jobsheetsearch">
              <Link to="/Jobsheetsearch">Jobsheet Search</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </>
  );
};

export default Sidemenu;
