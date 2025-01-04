import React from 'react';
import "./Manageentitycredittermmain.css";
import { Link } from 'react-router-dom';

const Manageentitycredittermmain = () => {

    return (
        <div className='Manageentitycredittermmain-container'>
            <div className='fistline-Manageentitycredittermmain'>
                <div className='namewithicone-Manageentitycredittermmain'>
                    <p className="name-Manageentitycredittermmain">
                        <span>
                            <Link to="/Setting">Setting</Link> &gt;
                        </span>
                        <span> <Link to="/Manageentitycredittermmain">Manage Entity Credit Term</Link> </span>

                    </p></div>

                <div className="setting-icones-Manageentitycredittermmain">

                    <div className='firstdivicone-Manageentitycredittermmain'>
                        <div className="iconefirst-Manageentitycredittermmain">
                            <img src="./photos/Group 359239 upload.png" alt="Download Icon" />
                        </div>

                        <div className="iconefirst-Manageentitycredittermmain">
                            <img src="./photos/Group 359241 download.png" alt="Download Icon" />
                        </div></div>

                    <div className="addwithicone-Manageentitycredittermmain">
                        <Link to="/Manageentitycreditterm" download className="flex-container">
                            <img src="./photos/Group 359467.png" alt="Download Icon" className="icon" />
                        </Link>
                    </div>






                </div></div>
        </div>



    )
}

export default Manageentitycredittermmain;