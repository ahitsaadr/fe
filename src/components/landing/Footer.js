import React from "react";
import "../style/Footer.css";
import fb from "../images/facebook.png";
import twitter from "../images/twitter.png";
import insta from "../images/ig.png";
import pinterest from "../images/pinterest.png";

const Footer = () => {
  return (
    <div className="bg-dark footer">
      <div className="sb__footer section__padding">
        <div className="sb__footer-links">
          <div className="sb__footer-link-div">
            <h4 className="font-weight-bold">For Bussiness</h4>
            <a href="/employer">
              <p>Employer</p>
            </a>
            <a href="/healtplan">
              <p>Health Plan</p>
            </a>
            <a href="/individual">
              <p>Individual</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4 className="font-weight-bold">Working Hours</h4>
            <a href="/resource">
              <p>Mon-Fri: 9.00AM - 20.00PM</p>
            </a>
            <a href="/resource">
              <p>Sat: 9.00 AM-20.00 PM</p>
            </a>
            <a href="/resource">
              <p>Sun: 9.00 AM-21.00 PM</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4 className="font-weight-bold">Partners</h4>
            <a href="/employer">
              <p>Resto Tech</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4 className="font-weight-bold">Contact</h4>
            <a href="/about">
              <p>Let's Dinner</p>
            </a>
            <a href="/press">
              <p>Call +628 9875 7340 </p>
            </a>
            <a href="/career">
              <p>dinnerlet's@gmail.com</p>
            </a>
            <a href="/contact">
              <p>@DinnerLet's</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4 className="font-weight-bold">Check Our Social Media on</h4>
            <div className="socialmedia">
              <p>
                <img src={fb} alt="" />
              </p>
              <p>
                <img src={twitter} alt="" />
              </p>
              <p>
                <img src={insta} alt="" />
              </p>
              <p>
                <img src={pinterest} alt="" />
              </p>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="sb__footer-below">
          <div className="sb__footer-copyright">
            <p>
              @{new Date().getFullYear()} © Copyright - Let’s Dinner | Platform
              booking restaurant Online.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
