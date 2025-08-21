import React from "react";
import '../pageStyles/AboutUs.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

const AboutUs = () => {
  return (
<>
    <Navbar />
    <PageTitle title="About-Us" />
    <div className="about-container">
      <div className="about-header">
        <h1>.</h1>
        <h1>About Us</h1>
        <p>Welcome to ShopKart – Your One-Stop Online Shopping Destination</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            ShopKart was created with a simple mission – to make online shopping
            easy, affordable, and accessible for everyone. We started as a demo
            project to showcase the power of technology in e-commerce, but our
            vision goes beyond just products – it’s about giving users the best
            shopping experience.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Wide range of products at affordable prices</li>
            <li>Seamless user-friendly shopping experience</li>
            <li>Secure checkout and multiple payment options</li>
            <li>Fast delivery & reliable support</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Choose ShopKart?</h2>
          <p>
            Unlike other platforms, ShopKart focuses on simplicity and ease of
            use. We believe shopping should be stress-free, fast, and reliable.
            Our platform is built with modern technologies like MERN Stack to
            deliver the best user experience.
          </p>
        </div>
      </div>

      <div className="about-footer">
        <p>
          Have questions? Contact us at{" "}
          <a href="mailto:shopkart@shopkart.com">shopkart@shopkart.com</a>
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
