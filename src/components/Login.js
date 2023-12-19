import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "./images/logo-web.png";
import sidebg from "./images/login-side.png";

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const getUser = async (e) => {
    try {
      e.preventDefault()
      await axios.post('http://localhost:8080/api/login', {
        username: username,
        password: password,
      })
      history.push('/')
    } catch (error) {
      alert('Login failed! Please check your credentials.')
    }
  }

  return (
    // <Container className="mt-5">
    <Row className="d-flex justify-content-between">
      {/* Gambar di sisi kiri */}
      <Col md={5}>
        <Image src={sidebg} alt="Register" fluid />
      </Col>

      {/* Form di sisi kanan */}
      <Col md={4} style={{ marginTop: "50px" }} className="mx-5">
        <div className="d-flex align-items-center justify-content-center">
          <Image src={logo} alt="Logo" />
        </div>

        {/* <h2 className="text-center mb-4">Register</h2> */}
        <hr style={{ borderTop: "2px solid gray" }}></hr>

        <Form onSubmit={getUser}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control type="text" value={username}
                        onChange={(e) => setUsername(e.target.value)} placeholder="Username" style={{ backgroundColor: "#F4EEE0", borderColor:"gray" }} autoFocus required/>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ backgroundColor: "#F4EEE0", borderColor:"gray" }} required/>
          </Form.Group>

          <Button style={{ backgroundColor: "#393646", borderRadius: "20px", borderColor: "#393646" }} type="submit" className="w-100 mt-3">
            Login
          </Button>
        </Form>

        <div className="my-3 text-center">
          <p>
            Create new account? <a href="/register">Register</a>
          </p>
        </div>
      </Col>
      <Col md={1}></Col>
    </Row>
    // </Container>
  );
};

export default LoginPage;
