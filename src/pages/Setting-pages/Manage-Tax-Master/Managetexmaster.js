import React, { useEffect, useState } from "react";
import "./Managetexmaster.css";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/lab/Autocomplete";
import Button from "@mui/material/Button";
import ExportToExcel from "../../../Componants/Common/ExportToExcel";
import toast, { Toaster } from "react-hot-toast";
import inactiveIcon from "../../../Assests/inactiveIcon.svg";
import activeIcon from "../../../Assests/activeIcon.svg";
import editIcon from "../../../Assests/editIcon.svg";
import deleteIcon from "../../../Assests/deleteIcon.svg";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from "@mui/material";
import { PiLightbulb } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import CommonButton from "../../../Componants/Common/Button";
import Paginate from "../../../Componants/Common/Paginate";
import HeaderNavigation from "../../../Componants/Common/header Navigation/HeaderNavigation";
import config from "../../../Componants/Common/config";
import Subheader from "../../../Componants/Common/Subheader";
import axios from "axios";
import { createTax,getTaxes,filterHsnCode,updateTaxStatus,deleteTax,updateTax } from "../../../API Service/apiService";

const calltype = [];

const callsource = [
  { title: "Afghanistan" },
  { title: "Albania" },
  { title: "Algeria" },
  { title: "Andorra" },
  { title: "Angola" },
  { title: "Antigua and Barbuda" },
  { title: "Argentina" },
  { title: "Armenia" },
  { title: "Australia" },
  { title: "Austria" },
  { title: "Azerbaijan" },
  { title: "Bahamas" },
  { title: "Bahrain" },
  { title: "Bangladesh" },
  { title: "Barbados" },
  { title: "Belarus" },
  { title: "Belgium" },
  { title: "Belize" },
  { title: "Benin" },
  { title: "Bhutan" },
  { title: "Bolivia" },
  { title: "Bosnia and Herzegovina" },
  { title: "Botswana" },
  { title: "Brazil" },
  { title: "Brunei" },
  { title: "Bulgaria" },
  { title: "Burkina Faso" },
  { title: "Burundi" },
  { title: "Cabo Verde" },
  { title: "Cambodia" },
  { title: "Cameroon" },
  { title: "Canada" },
  { title: "Central African Republic" },
  { title: "Chad" },
  { title: "Chile" },
  { title: "China" },
  { title: "Colombia" },
  { title: "Comoros" },
  { title: "Congo, Democratic Republic of the" },
  { title: "Congo, Republic of the" },
  { title: "Costa Rica" },
  { title: "Cote d'Ivoire" },
  { title: "Croatia" },
  { title: "Cuba" },
  { title: "Cyprus" },
  { title: "Czech Republic" },
  { title: "Denmark" },
  { title: "Djibouti" },
  { title: "Dominica" },
  { title: "Dominican Republic" },
  { title: "East Timor (Timor-Leste)" },
  { title: "Ecuador" },
  { title: "Egypt" },
  { title: "El Salvador" },
  { title: "Equatorial Guinea" },
  { title: "Eritrea" },
  { title: "Estonia" },
  { title: "Eswatini" },
  { title: "Ethiopia" },
  { title: "Fiji" },
  { title: "Finland" },
  { title: "France" },
  { title: "Gabon" },
  { title: "Gambia" },
  { title: "Georgia" },
  { title: "Germany" },
  { title: "Ghana" },
  { title: "Greece" },
  { title: "Grenada" },
  { title: "Guatemala" },
  { title: "Guinea" },
  { title: "Guinea-Bissau" },
  { title: "Guyana" },
  { title: "Haiti" },
  { title: "Honduras" },
  { title: "Hungary" },
  { title: "Iceland" },
  { title: "India" },
  { title: "Indonesia" },
  { title: "Iran" },
  { title: "Iraq" },
  { title: "Ireland" },
  { title: "Israel" },
  { title: "Italy" },
  { title: "Jamaica" },
  { title: "Japan" },
  { title: "Jordan" },
  { title: "Kazakhstan" },
  { title: "Kenya" },
  { title: "Kiribati" },
  { title: "Korea, North" },
  { title: "Korea, South" },
  { title: "Kosovo" },
  { title: "Kuwait" },
  { title: "Kyrgyzstan" },
  { title: "Laos" },
  { title: "Latvia" },
  { title: "Lebanon" },
  { title: "Lesotho" },
  { title: "Liberia" },
  { title: "Libya" },
  { title: "Liechtenstein" },
  { title: "Lithuania" },
  { title: "Luxembourg" },
  { title: "Madagascar" },
  { title: "Malawi" },
  { title: "Malaysia" },
  { title: "Maldives" },
  { title: "Mali" },
  { title: "Malta" },
  { title: "Marshall Islands" },
  { title: "Mauritania" },
  { title: "Mauritius" },
  { title: "Mexico" },
  { title: "Micronesia" },
  { title: "Moldova" },
  { title: "Monaco" },
  { title: "Mongolia" },
  { title: "Montenegro" },
  { title: "Morocco" },
  { title: "Mozambique" },
  { title: "Myanmar (Burma)" },
  { title: "Namibia" },
  { title: "Nauru" },
  { title: "Nepal" },
  { title: "Netherlands" },
  { title: "New Zealand" },
  { title: "Nicaragua" },
  { title: "Niger" },
  { title: "Nigeria" },
  { title: "North Macedonia (formerly Macedonia)" },
  { title: "Norway" },
  { title: "Oman" },
  { title: "Pakistan" },
  { title: "Palau" },
  { title: "Panama" },
  { title: "Papua New Guinea" },
  { title: "Paraguay" },
  { title: "Peru" },
  { title: "Philippines" },
  { title: "Poland" },
  { title: "Portugal" },
  { title: "Qatar" },
  { title: "Romania" },
  { title: "Russia" },
  { title: "Rwanda" },
  { title: "Saint Kitts and Nevis" },
  { title: "Saint Lucia" },
  { title: "Saint Vincent and the Grenadines" },
  { title: "Samoa" },
  { title: "San Marino" },
  { title: "Sao Tome and Principe" },
  { title: "Saudi Arabia" },
  { title: "Senegal" },
  { title: "Serbia" },
  { title: "Seychelles" },
  { title: "Sierra Leone" },
  { title: "Singapore" },
  { title: "Slovakia" },
  { title: "Slovenia" },
  { title: "Solomon Islands" },
  { title: "Somalia" },
  { title: "South Africa" },
  { title: "South Sudan" },
  { title: "Spain" },
  { title: "Sri Lanka" },
  { title: "Sudan" },
  { title: "Suriname" },
  { title: "Sweden" },
  { title: "Switzerland" },
  { title: "Syria" },
  { title: "Taiwan" },
  { title: "Tajikistan" },
  { title: "Tanzania" },
  { title: "Thailand" },
  { title: "Togo" },
  { title: "Tonga" },
  { title: "Trinidad and Tobago" },
  { title: "Tunisia" },
  { title: "Turkey" },
  { title: "Turkmenistan" },
  { title: "Tuvalu" },
  { title: "Uganda" },
  { title: "Ukraine" },
  { title: "United Arab Emirates" },
  { title: "United Kingdom" },
  { title: "United States" },
  { title: "Uruguay" },
  { title: "Uzbekistan" },
  { title: "Vanuatu" },
  { title: "Vatican City (Holy See)" },
  { title: "Venezuela" },
  { title: "Vietnam" },
  { title: "Yemen" },
  { title: "Zambia" },
  { title: "Zimbabwe" }
];

const Managetexmaster = () => {
  const pageSize = config.pageSize;
  const dummyGetList = {
    serialNo: "",
    hsncode: "",
    cgst: "",
    sgst: "",
    iggst: "",
    utgst: "",
    pageSize: pageSize
  };
  const [value, setValue] = React.useState({});

  const calltypeDefaultProps = {
    options: calltype,
    getOptionLabel: (option) => option.title
  };

  const callsourceDefaultProps = {
    options: callsource,
    getOptionLabel: (option) => option.title
  };

  function handleClick() {
    const saveButton = document.getElementById("save-button");
    saveButton.textContent = "Saved";
    saveButton.classList.add("saved");
    alert("Data saved successfully!");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", handleClick);
  });
 

  const [searchParams, setParams] = useState({
    ...dummyGetList
  });

  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [taxes, setTaxes] = useState([]);
  const [dataSize, setDataSize] = useState(pageSize);
  const [search, setSearch] = useState("");
  const [dropSearch, setDropSearch] = useState("");
  const [dropTaxes,setDropTaxes]=useState([])
  const [isEditMode, setIsEditMode] = useState(false);
  const [taxId,setTaxId]=useState("")

  useEffect(() => {
    fetchTaxes();
  }, [page]); // Fetch taxes when page or search changes

  useEffect(() => {
    fetchDropTaxes(); // Fetch dropdown options once
  }, []);

  const fetchTaxes = async () => {
    try {
      const response = await getTaxes(search,page, 10); // Pass page and limit
      setTaxes(response.data.taxes);
      setTotalRecords(response.data.totalTaxes);
    } catch (error) {
      console.error("Error fetching taxes:", error);
    }
  };

  const fetchDropTaxes = async () => {
    try {
      const response = await getTaxes(search,page, 1000); // Pass page and limit
      setDropTaxes(response.data.taxes || []);
    } catch (error) {
      console.error("Error fetching taxes:", error);
    }
  };

  const filterTaxes = async () => {
    try {
      const response = await filterHsnCode(dropSearch,page, 10); // Pass page and limit
      setTaxes(response.data.taxes || []);
    } catch (error) {
      console.error("Error fetching taxes:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);

    setParams((prevParams) => ({
      ...prevParams,
      pageIndex: newPage.toString()
    }));
  };

  const [formData, setFormData] = useState({
    hsnCode: "",
    description: "",
    cgst: "",
    sgst: "",
    igst: "",
    utgst: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAddTax = async () => {
    try {
      const response = await createTax(formData)
      alert("Tax added successfully!");
      console.log("Response:", response);
      setFormData({
        hsnCode: "",
        description: "",
        cgst: "",
        sgst: "",
        igst: "",
        utgst: "",
      }); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding tax:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add tax");
    }
  };

  const handleSearchChange = async (event, newValue) => {
    setDropSearch(newValue?.hsnCode || "");
  };

   const handleSearchClick = async () => {
    setPage(1); // Reset to first page when searching
    await filterTaxes();
    // await fetchDropTaxes(); // Re-fetch dropdown options
    // setDropSearch("")
    
  };

  const handleStatus = async (hsnCode, status) => {
    try {
      // setLoading();
      // console.log(`brand id is ${brandId}, ${index}`);
      const body={
        hsnCode,
        status:!status
      }
      const response = await updateTaxStatus(body);
      console.log(`status resposne : ${response.data.message}`);

      if (response.status === "success") {
        toast.success("Status Updated Successfully");
      }
      fetchTaxes();
    } catch (error) {
      console.log(`Error updating status ${error}`);
      toast.error(`Failed to update status`);
      throw error;
    } finally {
      // setLoading(false);
    }
  };

  const handleEdit = (index) => {
   const editBody=taxes[index]
   console.log(editBody)
   setTaxId(editBody._id)
   setFormData((p)=>({
    ...p,
    
    hsnCode: editBody.hsnCode,
    description: editBody.description,
    cgst: editBody.cgst,
    sgst: editBody.sgst,
    igst: editBody.igst,
    utgst: editBody.utgst,
   }))
   setIsEditMode(true);
  //  scrollToTop()
  };

  const handleUpdateTax = async () => {
    const editbody={
      ...formData,
      taxId
    }
    console.log("editbody",editbody)
    try {
      const response = await updateTax(editbody)
      alert("Tax update successfully!");
      console.log("Response:", response);
      setTaxId("")
      setFormData({
        hsnCode: "",
        description: "",
        cgst: "",
        sgst: "",
        igst: "",
        utgst: "",
      }); // Reset form after successful submission
      fetchTaxes()
    } catch (error) {
      console.error("Error adding tax:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add tax");
    }
  };

  const scrollToTop = () => {
    console.log("running",window.scrollTo)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // const handleDelete = async (index, taxId) => {
  //   try {
  //     const response = await deleteTax(taxId);
  //     console.log("response is ", response.message);

  //     // Refresh the brand list directly from the backend after deletion
  //     fetchTaxes();
  //   } catch (error) {
  //     console.log(`Error deleting Brand ${error}`);
  //   }
  // };

  return (
    <div className="Managetexmaster-container">
      <HeaderNavigation value={"Tax"} />

      <div className="autocompleteform-Managetexmaster">
      <div className="textbox-main-Managetexmaster">
        <div className="line-Managetexmaster">
          <div className="textinput-Managetexmaster">
            <TextField
              style={{ width: "100%" }}
              label="HSN Code"
              variant="standard"
              value={formData.hsnCode}
              onChange={(e) => handleInputChange("hsnCode", e.target.value)}
            />
          </div>
          <div className="textinput-Managetexmaster">
            <TextField
              style={{ width: "100%" }}
              label="Description"
              variant="standard"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div className="textinput-Managetexmaster">
            <TextField
              style={{ width: "100%" }}
              label="CGST%"
              variant="standard"
              value={formData.cgst}
              onChange={(e) => handleInputChange("cgst", e.target.value)}
            />
          </div>
          <div className="textinput-Managetexmaster">
            <TextField
              style={{ width: "100%" }}
              label="SGST%"
              variant="standard"
              value={formData.sgst}
              onChange={(e) => handleInputChange("sgst", e.target.value)}
            />
          </div>
        </div>
        <div className="line-Managetexmaster">
          <div className="textinput-Managetexmaster">
            <TextField
              style={{ width: "100%" }}
              label="IGST%"
              variant="standard"
              value={formData.igst}
              onChange={(e) => handleInputChange("igst", e.target.value)}
            />
          </div>
          <div className="textinput-Managetexmaster">
            <TextField
              style={{ width: "100%" }}
              label="UTGST%"
              variant="standard"
              value={formData.utgst}
              onChange={(e) => handleInputChange("utgst", e.target.value)}
            />
          </div>
        </div>

        <div className="button-Managetexmaster">
        <span>
        <CommonButton
          name={isEditMode ? "UPDATE" : "ADD"} // Dynamically set the button name
          handleOnClick={isEditMode ? handleUpdateTax : handleAddTax} // Dynamically set the click handler
        />
      </span>
      
  <span className="buttons-Managetexmaster-span">
    <CommonButton
      name={"CANCEL"}
      handleOnClick={() => {setFormData({ hsnCode: "", description: "", cgst: "", sgst: "", igst: "", utgst: "" });
      setIsEditMode(false)}}
    />
  </span>
</div>

      </div>
    </div>

    <div className="autocompleteform-Managetexmaster">
      <Subheader heading={"List View"} />
      <div className="line-Managetexmaster">
        <div className="textinput-Managetexmaster">
          <Autocomplete
              id="disable-close-on-select"
              // disableCloseOnSelect
              options={dropTaxes}
              getOptionLabel={(option) => option.hsnCode}
              value={
                dropTaxes.find(
                  (option) => option.hsnCode === dropSearch
                ) || null
              }
              onChange={handleSearchChange}
            renderInput={(params) => (
              <TextField {...params} label="HSN Code" variant="standard" />
            )}
          />
        </div>

        <span className="buttons-managecountry-span">
          <CommonButton name={"Search"} handleOnClick={handleSearchClick} />
        </span>
      </div>

      <div className="table-Managetexmaster">
        <div className="excelexport-Managetexmaster">
          <span className="buttons-Managetexmaster-span">
            <ExportToExcel
              name="Export to Excel"
              data={taxes}
              fileName="Taxes_Data"
              headers={[
                "HSN Code",
                "Description",
                "CGST",
                "SGST",
                "IGST",
                "UTGST",
              ]}
            />
          </span>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="tax table">
            <TableHead>
              <TableRow>
                <TableCell align="center">HSN Code & Description</TableCell>
                <TableCell align="center">CGST</TableCell>
                <TableCell align="center">SGST</TableCell>
                <TableCell align="center">IGST</TableCell>
                <TableCell align="center">UTGST</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taxes.map((tax,index) => (
                <TableRow key={tax._id}>
                  <TableCell align="center">
                    {tax.hsnCode} - {tax.description}
                  </TableCell>
                  <TableCell align="center">{tax.cgst}</TableCell>
                  <TableCell align="center">{tax.sgst}</TableCell>
                  <TableCell align="center">{tax.igst}</TableCell>
                  <TableCell align="center">{tax.utgst || "N/A"}</TableCell>
                  <TableCell
                      align="right"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        onClick={() => handleStatus(tax.hsnCode,tax.status )}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={tax.status === false ? inactiveIcon : activeIcon}
                          alt="active"
                          height="20px"
                          width="20px"
                        />
                      </IconButton>

                      <IconButton
                        // onClick={() =>
                        // {  handleEdit(index);
                        //   scrollToTop()}
                        // }
                        onClick={()=>
                          {
                          handleEdit(index);
                          scrollToTop();
                        }}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={editIcon}
                          alt="Edit"
                          height={"20px"}
                          width={"20px"}
                        />
                      </IconButton>
                      {/* <IconButton
                        onClick={() => handleDelete(index, tax._id)}
                        sx={{
                          outline: "none",
                          "&:focus": { outline: "none" },
                        }}
                      >
                        <img
                          src={deleteIcon}
                          alt="active"
                          height={"20px"}
                          width={"20px"}
                        />
                      </IconButton> */}
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="pagination-container">
        <Paginate
          page={page}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
          dataSize={dataSize}
        />
      </div>
    </div>
    </div>
  );
};

export default Managetexmaster;
