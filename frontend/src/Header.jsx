import React from "react";
import { FaHome, FaSearch, FaUser, FaComments, FaExchangeAlt, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Styles/Header.css";

function Header() {
  const navigate = useNavigate()

  const handleClick = () =>{
    navigate(`/`)
  } 
  return (
    <div className="headerTop">
      <div className="home" onClick={handleClick}>
        <FaHome size={50}/>
      </div>
      <div className="search-bar">
        <div class="input-group">
            <input type="text" class="form-control" aria-label="Text input" placeholder="Search..." />
            <button type="button" class="btn btn-outline-info"><FaSearch style={{marginTop: "-6px", color: 'black'}}size={20} /></button>
        </div>
      </div>
      <div className="icons"> 
        <FaExchangeAlt size={30} />
        <FaUser size={30} />
      </div>
    </div>
  );
}

export default Header;
