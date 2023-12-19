import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Home";
import ReservationLanding from "./components/landing/Reservation";
import Testimoni from "./components/landing/Testimoni";
import ContactUs from "./components/landing/ContactUs";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/user/User";
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUser";
import Restaurant from "./components/restaurant/Restaurant";
import AddRestaurant from "./components/restaurant/AddRestaurant";
import EditRestaurant from "./components/restaurant/EditRestaurant";
import Menu from "./components/menu_item/Menu";
import AddMenu from "./components/menu_item/AddMenu";
import EditMenu from "./components/menu_item/EditMenu";
import Reservation from "./components/reservation/Reservation";
import AddReservation from "./components/reservation/AddReservation";
import EditReservation from "./components/reservation/EditReservation";
import Review from "./components/reviews/Review";
import AddReview from "./components/reviews/AddReview";
import EditReview from "./components/reviews/EditReview";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Chef from "./components/chef/Chef";
import AddChef from "./components/chef/AddChef";
import EditChef from "./components/chef/EditChef";
import Contact from "./components/contact/Contact";
import AddContact from "./components/contact/AddContact";
import EditContact from "./components/contact/EditContact";


function App() {
  return (
    <Router>
      <Switch>
        {/* HOME */}
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/reserv-user">
          <ReservationLanding />
        </Route>
        <Route path="/testimoni">
          <Testimoni />
        </Route>
        <Route path="/contact-us">
          <ContactUs />
        </Route>

        {/* AUTH */}
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Login />
        </Route>

        <Route exact path="/dashboard">
          <Dashboard />
        </Route>

        {/* USER */}
        <Route exact path="/users">
          <User />
        </Route>
        <Route exact path="/users/add">
          <AddUser />
        </Route>
        <Route exact path="/users/edit/:id">
          <EditUser />
        </Route>

        {/* RESTAURANT */}
        <Route exact path="/restaurant">
          <Restaurant />
        </Route>
        <Route exact path="/restaurant/add">
          <AddRestaurant />
        </Route>
        <Route exact path="/restaurant/edit/:id">
          <EditRestaurant />
        </Route>

        {/* MENU */}
        <Route exact path="/menu">
          <Menu />
        </Route>
        <Route exact path="/menu/add">
          <AddMenu />
        </Route>
        <Route exact path="/menu/edit/:id">
          <EditMenu />
        </Route>

        {/* RESERVATION */}
        <Route exact path="/reservation">
          <Reservation />
        </Route>
        <Route exact path="/reservation/add">
          <AddReservation />
        </Route>
        <Route exact path="/reservation/edit/:id">
          <EditReservation />
        </Route>

        {/* REVIEW */}
        <Route exact path="/review">
          <Review />
        </Route>
        <Route exact path="/review/add">
          <AddReview />
        </Route>
        <Route exact path="/review/edit/:id">
          <EditReview />
        </Route>

        {/* CHEF */}
        <Route exact path="/chef">
          <Chef />
        </Route>
        <Route exact path="/chef/add">
          <AddChef />
        </Route>
        <Route exact path="/chef/edit/:id">
          <EditChef />
        </Route>

        {/* MESSAGE */}
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/contact/add">
          <AddContact />
        </Route>
        <Route exact path="/contact/edit/:id">
          <EditContact />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
