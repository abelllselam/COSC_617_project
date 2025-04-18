import React from "react";
import { Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import "./Styles/Sidebar.css";

function Sidebar() {
  return (
    <>
      <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{color: 'white', fontSize: '1.5em'}}>TU Video</Offcanvas.Title>
      </Offcanvas.Header>
      <hr className="custom-hr"/>
      <Offcanvas.Body>
        <div className="SideBar">
        <p>Explore</p>
          <ul>
            <nav>
              <Link to="/Favorites">Favorites</Link>
              <Link to="/Popular"> Popular</Link>
              <Link to="/Liked_Videos"> Liked Videos</Link>
            </nav>
          </ul>
        </div>
        <hr className="custom-hr"/>
      </Offcanvas.Body>
    </>
  );
}

export default Sidebar;
