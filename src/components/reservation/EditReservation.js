import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const EditReservation = () => {
  const { id } = useParams();
  const [user_id, setUserID] = useState("");
  const [restaurant_id, setRestaurantID] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [num_guest, setNumber] = useState("");
  const history = useHistory();

  const [users, setUser] = useState([]);
  const [restaurants, setRestaurant] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      await getRestaurant();
      await getReservationID();
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

  const getReservationID = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/reservation/${id}`
    );
    setUserID(response.data.user_id);
    setRestaurantID(response.data.restaurant_id);
    setDate(response.data.date);
    setTime(response.data.time);
    setNumber(response.data.num_guest);
  };

  const updateReservation = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`http://localhost:8080/api/reservation/${id}`, {
        // Menggunakan path relatif
        user_id: user_id,
        restaurant_id: restaurant_id,
        date: date,
        time: time,
        num_guest: num_guest,
      });
      history.push("/reservation");
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/reservation">Reservation</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Reservation</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Edit Reservation
              </h5>
            </div>
            <Form onSubmit={updateReservation}>
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
                  <Form.Label>Date for Reservation</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="date"
                    name="date"
                    value={date}
                    placeholder="Tanggal Reservasi"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Time for Reservation</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="time"
                    name="time"
                    value={time}
                    placeholder="Waktu Reservasi"
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Number Guest</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="number"
                    name="num_guest"
                    value={num_guest}
                    placeholder="Number Guest"
                    onChange={(e) => setNumber(e.target.value)}
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

export default EditReservation;
