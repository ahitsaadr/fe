// AdminLayout.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Col,
  Row,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import Logo from "../images/logo.png";
import "../style/AdminLayout.css"; // Impor file CSS

const AdminLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <Navbar
        style={{
          backgroundColor: "gainsboro",
          borderBottom: "1px solid #ddd",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand
            href="#home"
            className="d-flex justify-content-begin align-items-center"
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "10%",
                padding: "3px",
                boxSizing: "border-box",
              }}
            />
            <h3>Lets Dinner</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <Button
              variant="dark"
              onClick={toggleSidebar}
              style={{ margin: "10px" }}
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavDropdown title="Guest" id="basic-nav-dropdown">
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Col
          sm={2}
          className={`sidebar ${sidebarVisible ? "d-block" : "d-none"}`}
        >
          <Nav className="flex-column">
            <Nav.Link
              href="/dashboard"
              className={`sidebar-link ${
                location.pathname === "/dashboard" ? "active" : ""
              } mt-3`}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              href="/users"
              className={`sidebar-link ${
                location.pathname.startsWith("/users") ? "active" : ""
              } mt-2`}
            >
              Users
            </Nav.Link>
            <Nav.Link
              href="/restaurant"
              className={`sidebar-link ${
                location.pathname.startsWith("/restaurant") ? "active" : ""
              } mt-2`}
            >
              Restaurant
            </Nav.Link>
            <Nav.Link
              href="/menu"
              className={`sidebar-link ${
                location.pathname.startsWith("/menu") ? "active" : ""
              } mt-2`}
            >
              Menu Item
            </Nav.Link>
            <Nav.Link
              href="/reservation"
              className={`sidebar-link ${
                location.pathname.startsWith("/reservation") ? "active" : ""
              } mt-2`}
            >
              Reservation
            </Nav.Link>
            <Nav.Link
              href="/review"
              className={`sidebar-link ${
                location.pathname.startsWith("/review") ? "active" : ""
              } mt-2`}
            >
              Reviews
            </Nav.Link>
            <Nav.Link
              href="/chef"
              className={`sidebar-link ${
                location.pathname.startsWith("/chef") ? "active" : ""
              } mt-2`}
            >
              Chef
            </Nav.Link>
            <Nav.Link
              href="/contact"
              className={`sidebar-link ${
                location.pathname.startsWith("/contact") ? "active" : ""
              } mt-2`}
            >
              Message
            </Nav.Link>
          </Nav>
        </Col>
        <Col
          sm={10}
          style={{
            marginLeft: sidebarVisible ? "0px" : "0px",
            transition: "margin 0.2s",
            height: "100%",
          }}
        >
          {children}
        </Col>
      </div>
    </>
  );
};

export default AdminLayout;
