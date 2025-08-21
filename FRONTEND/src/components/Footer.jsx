import React from 'react'
import { Phone, Email,  LinkedIn, Instagram, Facebook } from '@mui/icons-material'
import '../componentStyles/Footer.css'
import { BsGithub } from 'react-icons/bs'
function footer() {
    return (
        <footer className="footer">
  <div className="footer-container">
    {/* Company Info */}
    <div className="footer-section company">
      <h3>Shopkart</h3>
      <p>ShopKart is your one-stop online store for Electronics, Furniture, Groceries, and more. We focus on providing customers with the best shopping experience through quality products, secure payments, and reliable delivery. Our mission is to make shopping convenient, affordable, and trustworthy.</p>
    </div>

    {/* Quick Links */}
    <div className="footer-section links">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/products">Shop</a></li>
        <li><a href="/about-us">About Us</a></li>
        <li><a href="/">Privacy Policy</a></li>
        <li><a href="/">Terms & Conditions</a></li>
      </ul>
    </div>

    {/* Customer Support */}
    {/* <div className="footer-section support">
      <h3>Customer Support</h3>
      <ul>
        <li><a href="/faq">FAQs</a></li>
        <li><a href="/returns">Returns</a></li>
        <li><a href="/shipping">Shipping Info</a></li>
        <li><a href="/track">Track Order</a></li>
      </ul>
    </div> */}

    {/* Newsletter */}
    <div className="footer-section newsletter">
      <h3>About </h3>
      <p>support@shopkart.com</p>
      <p>+91 9172100000</p>
      

      {/* Social Media */}
      <div className="social-links">
        <a href="https://www.linkedin.com/in/vikasbhonde/"><LinkedIn className="social-icon" /></a>
        <a href="https://github.com/vikasvs2003"><BsGithub className="social-icon" /></a>
        <a href="https://instagram.com/vikass.bhonde"><Instagram className="social-icon" /></a>
        <a href="#"><Facebook className="social-icon" /></a>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="footer-bottom">
    <p>&copy; 2025 ShopKart. All Rights Reserved.</p>
    {/* <div className="payment-icons">
      <img src="/images/visa.png" alt="Visa" />
      <img src="/images/mastercard.png" alt="MasterCard" />
      <img src="/images/paypal.png" alt="PayPal" />
    </div> */}
  </div>
</footer>

    )
}

export default footer