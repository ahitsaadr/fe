import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "./images/logo-web.png";
import sidebg from "./images/register-side2.png";

const RegisterPage = () => {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const saveUser = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/api/users", {
        // Menggunakan path relatif
        nama: nama,
        username: username,
        password: password,
        email: email,
      });
      history.push("/login");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <Row className="d-flex justify-content-between">
      <Col md={5}>
        <Image src={sidebg} alt="Register" fluid />
      </Col>

      <Col md={4} style={{ marginTop: "50px" }} className="mx-5">
        <div className="d-flex align-items-center justify-content-center">
          <Image src={logo} alt="Logo" />
        </div>

        <hr style={{ borderTop: "2px solid gray" }}></hr>

        <Form onSubmit={saveUser}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              autoFocus
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ backgroundColor: "#F4EEE0", borderColor: "gray" }}
            />
          </Form.Group>

          <Form.Group controlId="formNama" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nama"
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              style={{ backgroundColor: "#F4EEE0", borderColor: "gray" }}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ backgroundColor: "#F4EEE0", borderColor: "gray" }}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}"
              title="Password minimal 8 karakter, terdiri dari huruf kapital, angka, dan karakter khusus."
              required
              style={{ backgroundColor: "#F4EEE0", borderColor: "gray" }}
            />
          </Form.Group>

          <Button
            style={{
              backgroundColor: "#393646",
              borderRadius: "20px",
              borderColor: "#393646",
            }}
            type="submit"
            className="w-100 mt-3"
          >
            Register
          </Button>
        </Form>

        <div className="my-3 text-center">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </Col>
      <Col md={1}></Col>
    </Row>
    // </Container>
  );
};

export default RegisterPage;
