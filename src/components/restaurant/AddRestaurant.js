import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const AddRestaurant = () => {
  const [nama_restaurant, setNama] = useState("");
  const [description_restaurant, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const history = useHistory();

  const saveRestaurant = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/api/restaurants", {
        // Menggunakan path relatif
        nama_restaurant: nama_restaurant,
        description_restaurant: description_restaurant,
        location: location,
      });
      history.push("/restaurant");
    } catch (error) {
      console.error("Error saving restaurants:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/restaurant">Restaurant</Breadcrumb.Item>
          <Breadcrumb.Item active>Add Restaurant</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Tambah Restaurant
              </h5>
            </div>
            <Form onSubmit={saveRestaurant}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nama Restaurant</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="nama_restaurant"
                    value={nama_restaurant}
                    placeholder="Nama Restaurant"
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Description</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="textarea"
                    name="description_restaurant"
                    placeholder="Description"
                    value={description_restaurant}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Location</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="location"
                    value={location}
                    placeholder="Location"
                    onChange={(e) => setLocation(e.target.value)}
                    required
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

export default AddRestaurant;
