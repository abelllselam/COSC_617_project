import React from "react";
import { FaHome, FaBook, FaUser, FaComments, FaExchangeAlt, FaCog } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Styles/Sidebar.css";
import Logo from '../src/Images/logo.png';

function Sidebar() {
  return (
    <div className="SideBar">
      <div id="divImg"> <img src={Logo} alt="TU VideoLogo" /></div>
      <ul>
        <nav>
          <Link to="/"><FaHome /> Iron Man </Link>
          <Link to="/course-catalog"><FaBook /> Black Widow</Link>
          <Link to="/graduation"><FaUser /> Thor </Link>
          <Link to="/advising"><FaComments /> Captain America</Link>
          <Link to="/transfers"><FaExchangeAlt /> Hulk</Link>
          <Link to="/internships"><HiAcademicCap /> Hawkeye</Link>
          <Link to="/settings"><FaCog /> Loki</Link>
        </nav>
      </ul>
    </div>
  );
}

export default Sidebar;
