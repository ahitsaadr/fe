import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import Footer from "../landing/Footer.js";
import Header from "../landing/Header.js";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Reservation = () => {
  const [in_name, setInName] = useState("");
  const [restaurant_id, setRestaurantID] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [num_guest, setNumber] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const history = useHistory();

  // const [users, setUser] = useState([]);
  const [restaurants, setRestaurant] = useState([]);

  // COde sebelumnya di wa
  useEffect(() => {
    const fetchData = async () => {
      // await getUser();
      await getRestaurant();
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

  // const getUser = async () => {
  //   const users = await axios.get("http://localhost:8080/api/users");
  //   setUser(users.data);
  //   // console.log(users.data)
  // };

  const saveReservation = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/api/reserv-order", {
        // Menggunakan path relatif
        in_name: in_name,
        restaurant_id: restaurant_id,
        date: date,
        time: time,
        num_guest: num_guest,
      });

      setSubmitStatus("success");
      setTimeout(() => {
        history.push("/reserv-user");
      }, 3000);
    } catch (error) {
      console.error("Error saving reservation:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <div>
      <Header />
      <div className="reservation-page">
        <Container fluid className="reservation-content">
          <Row className="justify-content-center d-flex">
            <Col md={6}>
              <Card className="reservation-card mx-auto">
                <Card.Body>
                  <h3
                    className="text-center font-weight-bold mb-5"
                    style={{ fontSize: "22px" }}
                  >
                    Reservation Form
                  </h3>

                  {submitStatus === "success" && (
                    <div className="alert alert-success" role="alert">
                      Permintaan Reservasi berhasil dikirimkan!
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="alert alert-danger" role="alert">
                      Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.
                    </div>
                  )}

                  <Form onSubmit={saveReservation}>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={4}>
                        Nama User
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          name="in_name"
                          value={in_name}
                          placeholder="Nama"
                          onChange={(e) => setInName(e.target.value)}
                          required
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={4}>
                        Restaurant
                      </Form.Label>
                      <Col sm={8}>
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
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={4}>
                        Date for Reservation
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="date"
                          name="date"
                          value={date}
                          placeholder="Tanggal Reservasi"
                          onChange={(e) => setDate(e.target.value)}
                          required
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={4}>
                        Time for Reservation
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="time"
                          name="time"
                          value={time}
                          placeholder="Waktu Reservasi"
                          onChange={(e) => setTime(e.target.value)}
                          required
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={4}>
                        Number Guest
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="number"
                          name="num_guest"
                          value={num_guest}
                          placeholder="Number Guest"
                          onChange={(e) => setNumber(e.target.value)}
                          required
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col sm={{ span: 8, offset: 4 }}>
                        <Button variant="success" type="submit">
                          Submit
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer style={{ marginTop: "20px" }} />
    </div>
  );
};

export default Reservation;
