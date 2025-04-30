import React from "react";
import { Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FaHome, FaVideo, FaHistory, FaThumbsUp, FaCommentAlt } from 'react-icons/fa';
import "./Styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <>
      <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{color: 'white', fontSize: '1.5em'}}>TU Video</Offcanvas.Title>
      </Offcanvas.Header>
      <hr className="custom-hr"/>
      <Offcanvas.Body>
        <div className="SideBar">
          <p className="sidebar-section-title">Explore</p>
          <ul>
            <nav>
            <div className="sidebar-links">
                <Link to="/" className="sidebar-link">
                  <FaHome /> <span className="tab">Home</span>
                </Link>
                <Link to="/Subscriptions" className="sidebar-link">
                  <FaVideo /> Subscriptions
                </Link>
                <Link to="/History" className="sidebar-link">
                  <FaHistory /> History
                </Link>
                <Link to="/Liked_Videos" className="sidebar-link">
                  <FaThumbsUp /> Liked Videos
                </Link>
                <Link to="/User_Comments_Page" className="sidebar-link">
                  <FaCommentAlt /> Your Comments
                </Link>
                </div>
            </nav>
          </ul>
        </div>
        <hr className="custom-hr"/>
      </Offcanvas.Body>
    </>
  );
}

export default Sidebar;
