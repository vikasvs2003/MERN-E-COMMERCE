import React, { useState } from "react";
import '../pageStyles/ContactUs.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent! ");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
    <Navbar/>
        <PageTitle title="Contact-Us" />
    <div className="contact-container">
      <div className="contact-header">
        <h1>.</h1>
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Get in touch with ShopKart today.</p>
      </div>

      <div className="contact-content">
        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Email: <a href="mailto:shopkart.demo@gmail.com">shopkart.demo@gmail.com</a></p>
          <p>Phone: +91 9172000000</p>
          <p>Address: Pune, Maharashtra, India</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
