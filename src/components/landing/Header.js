import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; 
import "../style/Home.css";
import logo from "../images/logo.png";

const Header = () => {
  // Dapatkan path saat ini dari useLocation
  const currentPath = useLocation().pathname;

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#f4eee0", position: "fixed" }} fixed="top">
      <Navbar.Brand href="#home">
        <img
          src={logo}
          alt="Resto Booking Logo"
          width="10%" // Sesuaikan dengan tinggi yang diinginkan
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" className={currentPath === "/" ? "active" : ""}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/reserv-user" className={currentPath === "/reserv-user" ? "active" : ""}>
            Reservation
          </Nav.Link>
          <Nav.Link as={Link} to="/testimoni" className={currentPath === "/testimoni" ? "active" : ""}>
            Testimoni
          </Nav.Link>
          <Nav.Link as={Link} to="/contact-us" className={currentPath === "/contact-us" ? "active" : ""}>
            Contact Us
          </Nav.Link>
          <Button variant="light" as={Link} to="/login" className="mx-2">
            Login
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

