import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const EditMenu = () => {
  const { id } = useParams();
  const [nama, setNama] = useState("");
  const [restaurant_id, setRestaurantID] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // Use null to differentiate between no change and a new image
  const [oldImage, setOldImage] = useState(""); // Initialize with the existing image URL
  const history = useHistory();

  const [restaurants, setRestaurant] = useState([]);

  const updateMenu = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("restaurant_id", restaurant_id);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);

      await axios.post(`http://localhost:8080/api/menu/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history.push("/menu");
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getMenuById();
      await getRestaurant();
    };

    fetchData();
  }, []);

  const getMenuById = async () => {
    const response = await axios.get(`http://localhost:8080/api/menu/${id}`);
    setNama(response.data.nama);
    setRestaurantID(response.data.restaurant_id);
    setDescription(response.data.description);
    setPrice(response.data.price);
    setOldImage(response.data.image);
  };

  const getRestaurant = async () => {
    const restaurants = await axios.get(
      "http://localhost:8080/api/restaurants"
    );
    setRestaurant(restaurants.data);
    console.log(restaurants.data);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/menu">Menu</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Menu</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Edit Menu
              </h5>
            </div>
            <Form onSubmit={updateMenu}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nama</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="nama"
                    value={nama}
                    placeholder="Nama Menu"
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
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Price</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="number"
                    name="price"
                    value={price}
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Restaurant</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="select"
                    name="restaurant_id"
                    value={restaurant_id}
                    onChange={(e) => setRestaurantID(e.target.value)}
                    required
                  >
                    <option value="">Choose a restaurant</option>
                    {restaurants.map((restaurant, index) => (
                      <option key={index} value={restaurant.id}>
                        {restaurant.nama_restaurant}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Current Image</Form.Label>
                </Col>
                <Col md="8">
                  {oldImage && (
                    <img
                      src={`http://localhost:8080/images/menu/${oldImage}`}
                      alt="Current Menu Image"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>New Image</Form.Label>
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

export default EditMenu;
