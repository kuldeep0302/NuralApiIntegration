import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./pages/app";
import Setting from "./Componants/Setting/Setting";
import Managecountry from "./pages/Setting-pages/Manage-country/Manage-country";
import Manageregion from "./pages/Setting-pages/Manage-region/Manage-region";
import Managezone from "./pages/Setting-pages/Manage-zone/Mainegezone";
import Managestate from "../src/pages/Setting-pages/Manage-state/Managestate";
import Managedistrict from "./pages/Setting-pages/Manage-District/Managedistrict";
import Managecity from "./pages/Setting-pages/Manage-city/Managecity";
import Managelocality from "./pages/Setting-pages/Manage-Locality/Managelocality";
import Bulkuploadlocality from "./pages/Setting-pages/Bulkupload-locality/Bulkuploadlocality";
import Managetexmaster from "./pages/Setting-pages/Manage-Tax-Master/Managetexmaster";
import TaxCategoryName from "./pages/Setting-pages/Tax-Category-Name/TaxCategoryName";
import Managebrand from "./pages/Setting-pages/Manage-Brand/Managebrand";
import Manageproductcatgeory from "./pages/Setting-pages/Manage-Product-Catgeory/Manageproductcatgeory";
import Managemodel from "./pages/Setting-pages/Manage-Model/Managemodel";
import Managesku from "./pages/Setting-pages/Manage-SKU/Managesku";
import Serialvendorwarranty from "./pages/Setting-pages/Serial-Vendor-Warranty/Serialvendorwarranty";
import Customercategory from "./pages/Setting-pages/Customer-Category/Customercategory";
import Viewentitymapping from "./pages/Setting-pages/View-Entity-Mapping/Viewentitymapping";
import Manageentitycreditterm from "./pages/Setting-pages/Manage-Entity-Credit-Term/Manageentitycreditterm";
import Manageentitycredittermmain from "./pages/Setting-pages/Manage-Entity-Credit-Term/Manageentitycredittermmain";
import Uploadmanageuser from "./pages/Setting-pages/Upload-Manage-User/Uploadmanageuser";
import Uploadentitydetail from "./pages/Setting-pages/Upload-Entity-Detail/Uploadentitydetail";
import Usermaster from "./pages/Setting-pages/User-master/Usermaster";
import Entitymapping from "./pages/Setting-pages/Entity-Mapping/Entitymapping";
import Customerservice from "./pages/Sidemenu-pages/Call-centre/Master-Customer/Customerservice";
import Logcomplaint from "./pages/Sidemenu-pages/Call-centre/Log-Complaint/Logcomplaint";
import Logproductcomplaint from "./pages/Sidemenu-pages/Support-pages/Log-Product-Complaint/Logproductcomplaint";
import Jobsheets from "./pages/Sidemenu-pages/Service-center/Jobsheet/Jobsheets/Jobsheets";
import Jobsheet from "./pages/Sidemenu-pages/Service-center/Jobsheet/Jobsheet/Jobsheet";
import Jobsheet2 from "./pages/Sidemenu-pages/Service-center/Jobsheet/Jobsheet2/Jobsheet2";
import Dashboard from "./pages/Sidemenu-pages/Dashboard/Dashboard/Dashboard";
import Amcdashboard from "./pages/Sidemenu-pages/AMC-Dashboard/Amcdashboard";
import Amc from "./pages/Setting-pages/AMC/Amc";
import CreateCustomerAmc from "./pages/Sidemenu-pages/AMC-Dashboard/AMC-CN/CreateCustomerAmc";
import Reappoitment from "./pages/Sidemenu-pages/Repair/Dashboard/Reappoitment";
import Searchdealercustomer from "./pages/Sidemenu-pages/Repair/Search-Dealercustomer/Searchdealercustomer";
import One from "./pages/Sidemenu-pages/Repair/Popup-Page/Allocated-one/One";
import Bufferstockallocation from "./pages/Sidemenu-pages/Repair/Buffer-stock-allocation/Bufferstockallocation";
import Engineerpartconsumption from "./pages/Sidemenu-pages/Reports/Inventory Report/Engineer-Part-Consumption/Engineerpartconsumption";
import Managetaxtype from "./pages/Setting-pages/Manage-Tax-type/Managetaxtype";
import Managesparepartmapping from "./pages/Setting-pages/Manage-spare-part-mapping/Managesparepartmapping";
import Closecallreport from "./pages/Sidemenu-pages/Reports/Service report/Close-call-report/Closecallreport";
import Callupdationmobile from "./pages/Sidemenu-pages/Reports/Service report/Call-updation-mobile/Callupdationmobile";
import Stockinhand from "./pages/Sidemenu-pages/Reports/Inventory Report/Stock-Inhand/Stockinhand";
import Changepassword from "./pages/Sidemenu-pages/Help-Page/Change-password/Changepassword";
import Jobsheetsearch from "./pages/Sidemenu-pages/Help-Page/Jobsheet-search/Jobsheetsearch";
import Dashboardsuperadmin from "./pages/Sidemenu-pages/Super-admin/Dashboard/Dashboardsuperadmin";
import Financialdashboard from "./pages/Sidemenu-pages/Super-admin/Financial Dashboard/Financialdashboard";
import Dashboardtrails from "./pages/Sidemenu-pages/Super-admin/Trails/Dashboardtrails";
import Subscriptions from "./pages/Sidemenu-pages/Super-admin/Subscriptions/Subscriptions";
import CreateOrganizations from "./pages/Sidemenu-pages/CreateOrganizations/CreateOrganizations";
import CreateOrganizationsView from "./pages/Sidemenu-pages/CreateOrganizations/CreateOrganizationsView";
import CreateSubscription from "./pages/Sidemenu-pages/CreateSubscription/CreateSubscription";
import CreateSubscriptionView from "./pages/Sidemenu-pages/CreateSubscription/CreateSubscriptionView";
import Manageproductsubcatgeory from "./pages/Setting-pages/Manage-product-subcatgeory/Manageproductsubcatgeory";
import SparePartCreation from "./pages/Setting-pages/Manage-part-master/Managepartmaster";
import InventoryDashboard from "./pages/Sidemenu-pages/Inventory Dashboard/InventoryDashboard";
import StockGRN from "./pages/Sidemenu-pages/Inventory Dashboard/StockGRN";
import ServiceCenter from "./pages/Sidemenu-pages/Service Center/ServiceCenter";
import ChangePasswordAdmin from "./pages/Sidemenu-pages/Help-Page/Change-password/ChangePasswordAdmin";
import JobReport from "./pages/Sidemenu-pages/Reports/Service report/Open-Call-Detail/JobReport";
import ModuleMaster from "./pages/Setting-pages/Module-master/ModuleMaster";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Setting" element={<Setting />} />
      <Route path="/managecountry" element={<Managecountry />} />
      <Route path="/Manageregion" element={<Manageregion />} />
      <Route path="/Managezone" element={<Managezone />} />
      <Route path="/Managestate" element={<Managestate />} />
      <Route path="/Managedistrict" element={<Managedistrict />} />
      <Route path="/Managecity" element={<Managecity />} />
      <Route path="/Managelocality" element={<Managelocality />} />
      <Route path="/Bulk-uploadlocality" element={<Bulkuploadlocality />} />
      <Route path="/Managetexmaster" element={<Managetexmaster />} />
      <Route path="/TaxCategoryName" element={<TaxCategoryName />} />
      <Route path="/Managetaxtype" element={<Managetaxtype />} />
      <Route path="/Managebrand" element={<Managebrand />} />
      <Route path="/Manageproductcatgeory" element={<Manageproductcatgeory />}/>
      <Route path="/Managemodel" element={<Managemodel />} />
      <Route path="/Managesku" element={<Managesku />} />
      <Route path="/Managepartmaster" element={<SparePartCreation />} />
      <Route path="/Managesparepartmapping" element={<Managesparepartmapping />}/>
      <Route path="/Serialvendorwarranty" element={<Serialvendorwarranty />} />
      <Route path="/Serialvendorwarranty" element={<Serialvendorwarranty />} />
      <Route path="/Customercategory" element={<Customercategory />} />
      <Route path="/Viewentitymapping" element={<Viewentitymapping />} />
      <Route path="/Manageentitycreditterm" element={<Manageentitycreditterm />}/>
      <Route path="/Manageentitycredittermmain" element={<Manageentitycredittermmain />}/>
      <Route path="/Uploadmanageuser" element={<Uploadmanageuser />} />
      <Route path="/Uploadentitydetail" element={<Uploadentitydetail />} />
      <Route path="/Usermaster" element={<Usermaster />} />
      <Route path="/Entitymapping" element={<Entitymapping />} />
      <Route path="/Customerservice" element={<Customerservice />} />
      <Route path="/Logcomplaint" element={<Logcomplaint />} />
      <Route path="/Logproductcomplaint" element={<Logproductcomplaint />} />
      <Route path="/Jobsheets" element={<Jobsheets />} />
      <Route path="/Jobsheet" element={<Jobsheet />} />
      <Route path="/Jobsheet2" element={<Jobsheet2 />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Amcdashboard" element={<Amcdashboard />} />
      <Route path="/Amc" element={<Amc />} />
      <Route path="/CreateCustomerAmc" element={<CreateCustomerAmc />} />
      <Route path="/Reappoitment" element={<Reappoitment />} />
      <Route path="/Searchdealercustomer" element={<Searchdealercustomer />} />
      <Route path="/One" element={<One />} />
      <Route path="/inventory-stocktransfer" element={<Bufferstockallocation />}/>
      <Route path="/JobReport" element={<JobReport />} />
      <Route path="/Closecallreport" element={<Closecallreport />} />
      <Route path="/Callupdationmobile" element={<Callupdationmobile />} />
      <Route path="/Engineerpartconsumption" element={<Engineerpartconsumption />}/>
      <Route path="/Stockinhand" element={<Stockinhand />} />
      <Route path="/Changepassword" element={<Changepassword />} />
      <Route path="/Jobsheetsearch" element={<Jobsheetsearch />} />
      <Route path="/Dashboardsuperadmin" element={<Dashboardsuperadmin />} />
      <Route path="/Financialdashboard" element={<Financialdashboard />} />
      <Route path="/Dashboardtrails" element={<Dashboardtrails />} />
      <Route path="/Subscriptions" element={<Subscriptions />} />
      <Route path="/CreateOrganizations" element={<CreateOrganizations />} />
      <Route path="/CreateOrganizationsView" element={<CreateOrganizationsView />}/>
      <Route path="/CreateSubscription" element={<CreateSubscription />} />
      <Route path="/CreateSubscriptionView" element={<CreateSubscriptionView />}/>
      <Route path="/Manageproductsubcatgeory"element={<Manageproductsubcatgeory />}/>
      <Route path="/inventory-dashboard" element={<InventoryDashboard />} />
      <Route path="/inventory-stockgrn" element={<StockGRN />} />
      <Route path="/service-dashboard" element={<ServiceCenter />} />
      <Route path="/change-password-admin" element={<ChangePasswordAdmin />} />
      <Route path="/module-master" element={<ModuleMaster />} />
    </Routes>
  );
}
export default RoutesApp;
