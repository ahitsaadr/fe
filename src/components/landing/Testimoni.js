import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card, CardGroup, ListGroup } from "react-bootstrap";
import "../style/Home.css";
import Footer from "../landing/Footer.js";
import Header from "../landing/Header.js";

const Testimoni = () => {

  const [testimonial, setTestimoni] = useState([]);
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
      await getTestimoni();
    };

    fetchData();
  }, []);

  const getRestaurant = async () => {
    const restaurants = await axios.get(
      "http://localhost:8080/api/restaurants"
    );
    setRestaurant(restaurants.data);
    console.log(restaurants.data);
  };

  const getUser = async () => {
    const users = await axios.get("http://localhost:8080/api/users");
    setUser(users.data);
    console.log(users.data);
  };

  const saveReview = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/api/reviews", {
        user_id: user_id,
        restaurant_id: restaurant_id,
        comment: comment,
      });
  
      // Setelah berhasil menyimpan testimonial, panggil kembali fungsi getTestimoni
      getTestimoni();
  
      // Kembali ke halaman testimoni setelah menyimpan testimonial
      history.push("/testimoni");
    } catch (error) {
      console.error("Error saving reviews:", error);
    }
  };
  

  // const getTestimoni = async () => {
  //   const response = await axios.get(`http://localhost:8080/api/reviews`);
  //   setTestimoni(response.data);
  // };
  const getTestimoni = async () => {
    try {
      // Mengatur batas data yang diambil, misalnya 10 testimoni terbaru
      const response = await axios.get("http://localhost:8080/api/reviews?limit=5");
      const sortedTestimoni = response.data.sort((a, b) => b.id - a.id);
      setTestimoni(sortedTestimoni);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };
  
  
  
  
  

  return (
    <div>
      <Header />
      {/* Banner dan Tulisan Testimonial */}
      <div className="testimonial-banner">
        <h1 className="testimonial-heading">Testimonial</h1>
      </div>

      <Container className="mt-5 py-5">
        <Row>
          {/* Form Testimoni */}
          <Col md={7}>
            <div>
            <h3
                style={{
                  fontFamily: "Bebas Neu",
                  fontSize: "30px",
                  color: "#CC3333",
                }}
                className="mb-3"
              >
                Send Your Testimoni Here!
              </h3>
              <Form onSubmit={saveReview}>
                <Form.Group controlId="formFullName" className="mb-3">
                  <Form.Label>Nama User</Form.Label>
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
                </Form.Group>
                
                <Form.Group controlId="formFullName" className="mb-3">
                  <Form.Label>Restaurant</Form.Label>
                  <Form.Control
                      as="select"
                      name="restaurant_id"
                      value={restaurant_id}
                      onChange={(e) => setRestaurantID(e.target.value)}
                      required>
                      <option value="">Choose a restaurant</option>
                      {restaurants.map((restaurant, index) => (
                        <option key={index} value={restaurant.id}>
                          {restaurant.nama_restaurant}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formFullName" className="mb-3">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                      as="textarea"
                      name="comment"
                      placeholder="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="mb-3">
                  Send
                </Button>
              </Form>
            </div>
          </Col>

          {/* Card Testimoni */}
          <Col md={5}>
            <h4
              style={{
                fontFamily: "Bebas Neu",
                fontSize: "30px",
                color: "#000080",
                textAlign: "center",
              }}
              className="mb-3"
            >
              The Testimoni Here!
            </h4>
            <ListGroup style={{ overflowY: "auto", maxHeight: "400px", width: "100%" }}>
              {testimonial.map((testimoni) => (
                <ListGroup.Item key={testimoni.id}>
                  <CardGroup>
                    <Card>
                      <Card.Body>
                        <Card.Title>{testimoni.nama}</Card.Title>
                        <Card.Text>{testimoni.comment}</Card.Text>
                      </Card.Body>
                    </Card>
                  </CardGroup>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Testimoni;
