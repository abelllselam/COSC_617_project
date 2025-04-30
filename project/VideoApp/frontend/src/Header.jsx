import React, { useState, useEffect } from "react";
import "./Styles/Header.css";
import {
  Navbar,
  Container,
  Form,
  Button,
  Offcanvas,
  Modal,
} from "react-bootstrap";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Images/logo2.png";
import Sidebar from "./Sidebar";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import Upload_Button from "./Upload/Upload_Button";

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

  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  //connecting the backend search
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
  };

  console.log("nier", currentUser);

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
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=random`;
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
      <Navbar
        expand="lg"
        className="py-1"
        style={{ backgroundColor: "#121212", height: "60px" }}
      >
        <Container
          fluid
          className="d-flex align-items-center justify-content-between"
          style={{ height: "100%" }}
        >
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="link"
              onClick={handleShow}
              className="p-0 d-flex align-items-center"
              style={{ background: "none", border: "none", color: "white" }}
            >
              <RxHamburgerMenu size={24} />
            </Button>

            <img
              src={logo}
              alt="Logo"
              onClick={handleClick}
              style={{
                width: "120px",
                cursor: "pointer",
              }}
            />
          </div>
          <div
            className="position-relative flex-grow-1 mx-3"
            style={{ maxWidth: "500px" }}
          >
            <Form onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="search-input"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                style={{
                  width: "100%",
                  borderRadius: "25px",
                  paddingLeft: "40px",
                  height: "38px",
                }}
              />
              <Button
                type="submit"
                variant="link"
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "45%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: searchValue ? "black" : "gray",
                  zIndex: "2",
                  cursor: searchValue ? "pointer" : "default",
                  padding: 0,
                }}
              >
                <FaSearch size={18} />
              </Button>
            </Form>
          </div>
          <div className="d-flex align-items-center gap-2">
            {currentUser ? (
              <>
                <Upload_Button />
                <div className="d-flex align-items-center text-white">
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "6px",
                    }}
                  />
                  <span style={{ fontSize: "0.9rem" }}>
                    {currentUser.displayName}
                  </span>
                </div>
                <Button
                  variant="link"
                  onClick={handleSignOut}
                  className="text-white text-decoration-none p-0"
                  style={{ fontSize: "0.9rem" }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                variant="link"
                onClick={handleSignInShow}
                className="text-white text-decoration-none p-0"
                style={{ fontSize: "0.9rem" }}
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
          background:
            "linear-gradient(to bottom,rgb(12, 12, 12) 30%,rgb(51, 48, 48) 100%)",
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
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-2">
              Sign In
            </Button>

            <div className="text-center">
              <span>Don't have an account? </span>
              <Button
                variant="link"
                onClick={handleSignUpShow}
                style={{ padding: 0 }}
              >
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
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSignupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSignupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create password"
                name="password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                name="confirmPassword"
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mb-2">
              Sign Up
            </Button>

            <div className="text-center">
              <span>Already have an account? </span>
              <Button
                variant="link"
                onClick={handleSignInShow}
                style={{ padding: 0 }}
              >
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
