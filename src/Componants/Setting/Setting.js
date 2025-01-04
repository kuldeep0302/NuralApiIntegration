import React from "react";
import "./Setiting.css";
import { Link } from "react-router-dom";
import HeaderNavigation from "../Common/header Navigation/HeaderNavigation";

const Setting = () => {
  return (
    <div className="setting-containermain">
      <header className="container-setting"></header>
      <HeaderNavigation value={"Master / Setting"} />

      <div className="settingpage-setting">
        <div>
          <p className="MASTERS">LOCATION</p>
          <Link to="/managecountry">
            <button className="Positions" type="button">
              Country
            </button>
          </Link>

          <Link to="/Managezone">
            <button className="Positions" type="button">
              Zone
            </button>
          </Link>
          {/* <Link to="/Manageregion">
            <button className="Positions" type="button">
              Region
            </button>
          </Link> */}
          <Link to="/Managestate">
            <button className="Positions" type="button">
              State
            </button>
          </Link>
          {/* <Link to="/Managedistrict">
            <button className="Positions" type="button">
              District
            </button>
          </Link> */}

          <Link to="/Managecity">
            <button className="Positions" type="button">
              City
            </button>
          </Link>

          {/* <Link to="/Managelocality">
            <button className="Positions" type="button">
              Locality
            </button>
          </Link> */}
          <Link to="/bulk-uploadlocality">
            <button className="Positions" type="button">
              Geography Upload
            </button>
          </Link>
        </div>

        <div>
          <p className="MASTERS">TAX MASTER</p>

          <Link to="/Managetexmaster">
            <button className="Positions" type="button">
              Tax Master
            </button>
          </Link>

          {/* <Link to="/TaxCategoryName">
            <button className="Positions" type="button">
              Tax Category
            </button>
          </Link> */}

          {/* <Link to="/Managetaxtype">
            <button className="Positions" type="button">
              Tax Type
            </button>
          </Link> */}
        </div>

        <div>
          <p className="MASTERS">PRODUCT BASE</p>
          <Link to="/Managebrand">
            <button className="Positions" type="button">
              Brand
            </button>
          </Link>
          <Link to="/Manageproductcatgeory">
            <button className="Positions" type="button">
              Product Category
            </button>
          </Link>
          <Link to="/Manageproductsubcatgeory">
            <button className="Positions" type="button">
              Product Sub Category
            </button>
          </Link>
          <Link to="/Managemodel">
            <button className="Positions" type="button">
              Model
            </button>
          </Link>

          {/* <Link to="/Managesku">
            <button className="Positions" type="button">
              SKU
            </button>
          </Link> */}
        </div>
        <div>
          <p className="MASTERS">PRODUCT/SPARES</p>

          <Link to="/Managepartmaster">
            <button className="Positions" type="button">
              Spare Part
            </button>
          </Link>

          <Link to="/Managesparepartmapping">
            <button className="Positions" type="button">
              Spare Part Mapping
            </button>
          </Link>

          {/* <Link to="/Serialvendorwarranty">
            <button className="Positions" type="button">
              Serial Vendor Warranty
            </button>
          </Link> */}

          {/* <Link to="/Customercategory">
            <button className="Positions" type="button">
              Customer Category
            </button>
          </Link> */}
        </div>

        <div>
          <p className="MASTERS">USER BASE</p>

          <Link to="/Usermaster">
            <button className="Positions" type="button">
              User-Master
            </button>
          </Link>

          {/* <Link to="/Entitymapping">
            <button className="Positions" type="button">
              Entity Mapping
            </button>
          </Link> */}
        </div>

        <div>
          <p className="MASTERS">AMC</p>
          <Link to="/Amc">
            <button className="Positions" type="button">
              AMC Master
            </button>
          </Link>
        </div>

        <div>
          <p className="MASTERS">Module</p>
          <Link to="/module-master">
            <button className="Positions" type="button">
              Module
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Setting;


