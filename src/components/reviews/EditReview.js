import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const EditReview = () => {
  const { id } = useParams();
  const [user_id, setUserID] = useState("");
  const [restaurant_id, setRestaurantID] = useState("");
  const [comment, setComment] = useState("");
  const history = useHistory();

  const [users, setUser] = useState([]);
  const [restaurants, setRestaurant] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      await getRestaurant();
      await getReviewID();
    };

    fetchData();
  }, []);

  const getRestaurant = async () => {
    const restaurants = await axios.get(
      "http://localhost:8080/api/restaurants"
    );
    setRestaurant(restaurants.data);
    // console.log(restaurants.data)
  };

  const getUser = async () => {
    const users = await axios.get("http://localhost:8080/api/users");
    setUser(users.data);
    // console.log(users.data)
  };

  const getReviewID = async () => {
    const response = await axios.get(`http://localhost:8080/api/reviews/${id}`);
    setUserID(response.data.user_id);
    setRestaurantID(response.data.restaurant_id);
    setComment(response.data.comment);
  };

  const updateReview = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`http://localhost:8080/api/reviews/${id}`, {
        // Menggunakan path relatif
        user_id: user_id,
        restaurant_id: restaurant_id,
        comment: comment,
      });
      history.push("/reviews");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/review">Review</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Review</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Edit Review
              </h5>
            </div>
            <Form onSubmit={updateReview}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nama User</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="select"
                    name="user_id"
                    value={user_id}
                    onChange={(e) => setUserID(e.target.value)}
                    required
                  >
                    <option value="">Choose a user</option>
                    {users.map((user, index) => (
                      <option key={index} value={user.id}>
                        {user.nama}
                      </option>
                    ))}
                  </Form.Control>
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
                  <Form.Label>Comment</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="textarea"
                    name="comment"
                    placeholder="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
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

export default EditReview;
