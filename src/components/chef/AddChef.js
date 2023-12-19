import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const AddChef = () => {
  const [nama, setNama] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const saveChef = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("image", image);

      await axios.post("http://localhost:8080/api/chef", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history.push("/chef");
    } catch (error) {
      console.error("Error saving menu:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/chef">Chef</Breadcrumb.Item>
          <Breadcrumb.Item active>Add Chef</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Tambah Chef
              </h5>
            </div>
            <Form onSubmit={saveChef}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nama</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="nama"
                    value={nama}
                    placeholder="Nama"
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Image</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={(e) => handleFileChange(e)}
                    accept="image/*"
                  />
                </Col>
              </Row>

              <Col md="10" className="d-flex justify-content-end">
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Col>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AddChef;
