import React, { useState, useEffect } from "react";
import { Navbar, Container, Form, Button, Offcanvas, Modal } from 'react-bootstrap';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Images/logo2.png';
import Sidebar from "./Sidebar";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";

function Header() {
  const [show, setShow] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignInClose = () => setShowSignIn(false);
  const handleSignInShow = () => setShowSignIn(true);

  const handleSignUpClose = () => setShowSignUp(false);
  const handleSignUpShow = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: avatarUrl,
      });
      alert("Account created successfully!");
      handleSignUpClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully!");
      handleSignInClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert("Error signing out: " + error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar expand="lg" style={{ marginTop: '-52px' }}>
        <Container fluid className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <Button
              variant="primary"
              onClick={handleShow}
              style={{
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                boxShadow: 'none',
              }}
            >
              <RxHamburgerMenu size={30} style={{ color: 'white' }} />
            </Button>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '12vw',
                cursor: 'pointer',
                marginTop: '12px',
                marginLeft: '20px',
              }}
              onClick={handleClick}
            />
          </div>

          <Form
            className="d-flex align-items-center position-relative"
            role="search"
            style={{ marginLeft: '-80px' }}
          >
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

          <div className="d-flex align-items-center justify-content-center gap-2">
            {currentUser ? (
              <>
                <div className="d-flex align-items-center" style={{ color: "white" }}>
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "8px",
                    }}
                  />
                  {currentUser.displayName}
                </div>
                <Button
                  variant="link"
                  onClick={handleSignOut}
                  style={{ color: "white", textDecoration: 'none' }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                variant="link"
                onClick={handleSignInShow}
                style={{ color: "white", textDecoration: 'none' }}
              >
                Sign In
              </Button>
            )}
          </div>
        </Container>
      </Navbar>

      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll
        backdrop
        placement="start"
        style={{
          background: "linear-gradient(to bottom,rgb(12, 12, 12) 30%,rgb(51, 48, 48) 100%)",
        }}
      >
        <Sidebar />
      </Offcanvas>

      {/* Sign In Modal */}
      <Modal show={showSignIn} onHide={handleSignInClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-2">
              Sign In
            </Button>

            <div className="text-center">
              <span>Don't have an account? </span>
              <Button variant="link" onClick={handleSignUpShow} style={{ padding: 0 }}>
                Sign Up
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Sign Up Modal */}
      <Modal show={showSignUp} onHide={handleSignUpClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignUp}>
            <Form.Group className="mb-3" controlId="formSignupName">
              <Form.Label>Full Name or Channel Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" name="name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSignupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSignupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Create password" name="password" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Re-enter password" name="confirmPassword" required />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mb-2">
              Sign Up
            </Button>

            <div className="text-center">
              <span>Already have an account? </span>
              <Button variant="link" onClick={handleSignInShow} style={{ padding: 0 }}>
                Sign In
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
