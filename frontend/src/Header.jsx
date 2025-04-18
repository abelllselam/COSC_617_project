import React, { useState } from "react";
import { Navbar, Container, Form, Button, Offcanvas } from 'react-bootstrap';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaSearch, FaExchangeAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Images/logo2.png'
import Sidebar from "./Sidebar";

function Header() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const handleClick = () =>{
    navigate(`/`)
  } 
  return (
    <>
      <Navbar expand="lg"  style={{ marginTop: '-52px',}}>
        <Container fluid className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <Button variant="primary" onClick={handleShow} style={{textDecoration: 'none', background: 'none', border: 'none', boxShadow: 'none',}}>
              <RxHamburgerMenu size={30} style={{ color: 'white' }} />
            </Button>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '12vw',
                cursor: 'pointer',
                marginTop: '12px',
                marginLeft: '20px'
              }}
              onClick={handleClick}
            />
          </div>

          <Form className="d-flex align-items-center position-relative" role="search" style={{ marginLeft: '-80px' }}>
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="pe-5"
              style={{
                width: '50vw',
                borderRadius: '25px',
                paddingRight: '40px',
              }}
            />
            <Button
              type="submit"
              variant="link"
              style={{
                position: 'absolute',
                right: '4px',
                bottom: '4px',
                background: 'none',
                border: 'none',
                color: 'black',
                zIndex: '2',
              }}
            >
              <FaSearch size={18} />
            </Button>
          </Form>

          <div className="d-flex align-items-center justify-content-center">
            <h4 style={{color:"white"}}>Sign In</h4>
          </div>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} scroll backdrop placement="start" style={{background: "linear-gradient(to bottom,rgb(12, 12, 12) 30%,rgb(51, 48, 48) 100%)"}}>
        <Sidebar />
      </Offcanvas>
    </>
  );
}

export default Header;
