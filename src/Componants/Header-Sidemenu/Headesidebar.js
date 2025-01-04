import React from 'react';
import './Headersidebar.css';
import Sidemenu from '../Sidemenubar/Sidemenu';
import Header from '../Header/Header';
import '../Header/Header.css';
import '../Sidemenubar/Sidemenu.css'





const Headersidebar = () => {

    return (

        <div className='container-Headersidebar'>
            <div className='header-main' id='header'><Header /></div>
            <div className='sidemenu-main' id='sidebar'><Sidemenu /></div>

        </div>


    );
}

export default Headersidebar;
