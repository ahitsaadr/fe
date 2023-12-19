import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { Typewriter } from "react-simple-typewriter";
import hero from "./images/hero2.png";
import springroll from "./images/springroll.jpeg";
import spaghetti from "./images/spageti.jpeg";
import cake from "./images/kue.jpeg";
import cinnamon from "./images/drink.jpeg";
import steak from "./images/steak.jpeg";
import taliwang from "./images/ayam.jpeg";
import hotpot from "./images/hotpot.jpeg";
import chef1 from "./images/1chef.jpeg";
import chef2 from "./images/2chef.jpeg";
import chef3 from "./images/3chef.jpeg";
import Footer from "./landing/Footer.js";
import Header from "./landing/Header.js";
import "./style/Home.css";

const foodData = [
  { id: 1, image: springroll, foodName: "Spring Roll Meet" },
  { id: 2, image: spaghetti, foodName: "Spaghetti Carbonara" },
  { id: 3, image: cake, foodName: "Strawberry Cake" },
  { id: 4, image: cinnamon, foodName: "Lime Cinnamon Ice" },
];

const FoodCard = ({ image, foodName }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <div className="card-image-container">
        <Card.Img
          variant="top"
          src={`http://localhost:8080/images/menu/${image}`}
          alt={foodName}
          className="card-image"
        />
      </div>
      <Card.Body className="text-center">
        <Card.Title className="my-3">{foodName}</Card.Title>
        <Button variant="danger" className="my-3">
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

const MenuCard = ({ image, nama, description, restaurant, price }) => {
  return (
    <Card style={{ width: "22rem", height: "100%" }} className="mb-4">
      <Row noGutters>
        <Col md={4}>
          <Card.Img
            variant="top"
            src={`http://localhost:8080/images/menu/${image}`}
            className="rounded-left"
            style={{ height: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{nama}</Card.Title>
            <Card.Text style={{ fontSize: "10pt" }} className="mb-3">
              {description}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Text className="text-muted">{restaurant}</Card.Text>
              </div>
              <div>
                <Card.Text className="text-danger font-weight-bold">
                  Rp {price}
                </Card.Text>
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

const chefData = [
  { id: 1, image: chef1, chefName: "Marco Salim" },
  { id: 2, image: chef2, chefName: "Marina" },
  { id: 3, image: chef3, chefName: "Sam Halim" },
];

const ChefCard = ({ image, chefName }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <div >
        <Card.Img
          variant="top"
          src={`http://localhost:8080/images/chef/${image}`}
          alt={chefName}
          style={{ objectFit: "contain", height: "100%" }}
        />
      </div>
      <Card.Body className="text-center">
        <Card.Title>{chefName}</Card.Title>
      </Card.Body>
    </Card>
  );
};

const Home = () => {
  const [menus, setMenu] = useState([]);
  const [food, setFood] = useState([]);
  const [chef, setChef] = useState([]);

  // useEffect(() => {
  //   getMenu();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      await getMenu();
      await getFood();
      await getChef();
    };

    fetchData();
  }, []);

  const getMenu = async () => {
    const response = await axios.get(`http://localhost:8080/api/menu`);
    setMenu(response.data);
  };

  const getFood = async () => {
    const response = await axios.get(`http://localhost:8080/api/food`);
    setFood(response.data);
  };

  const getChef = async () => {
    const response = await axios.get(`http://localhost:8080/api/chef`);
    setChef(response.data);
  };

  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Content */}
      {/* <Container className="mt-5"> */}
      {/* Heading */}
      {/* <Container> */}
      <section className="mt-5 p-4">
        <Row className="head align-items-center py-5 my-5">
          {/* Teks di sebelah kiri */}
          <Col md={6}>
            <h3 className="mb-3">Welcome to Let's Dinner</h3>
            <h1 className="mb-5">
              Your choice to find the best restaurant experience !
            </h1>
            <h2>
              an
              <span>
                <Typewriter
                  words={[" online restaurant booking platform."]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h2>

            <p>Nikmati Kemudahan Reservasi Retoran Secara Online</p>
          </Col>

          {/* Gambar di sebelah kanan */}
          <Col md={6}>
            <img src={hero} alt="Restaurant" className="img-fluid mb-5" />
          </Col>
        </Row>
        {/* </Container> */}

        {/* Our Menu */}
        {/* <Row> */}
        <Container className="mt-5">
          <div className="scrollable-cards-container py-5">
            <Row className="flex-nowrap my-5">
              {food.map((food) => (
                <Col key={food.id} className="mr-3">
                  <FoodCard image={food.image} foodName={food.nama} />
                </Col>
              ))}
            </Row>
          </div>
        </Container>

        <Container className="my-5 py-5">
          <h2 className="menu-title my-5">Our Menu</h2>
          <Row>
            {menus.map((menu) => (
              <Col key={menu.id} className="mb-3">
                <MenuCard
                  image={menu.image}
                  nama={menu.nama}
                  description={menu.description}
                  restaurant={menu.nama_restaurant}
                  price={menu.price}
                />
              </Col>
            ))}
          </Row>
        </Container>

        {/* </Row> */}

        {/* Our Chef */}
        <Container className="mt-5 py-5">
          <h2 className="menu-title my-5">Our Chef</h2>
          <div className="scrollable-cards-container">
            <Row className="flex-nowrap">
              {chef.map((chef) => (
                <Col key={chef.id} className="mr-3">
                  <ChefCard image={chef.image} chefName={chef.nama} />
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>
      {/* </Container> */}

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
