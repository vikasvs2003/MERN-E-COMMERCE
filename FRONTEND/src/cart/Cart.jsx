import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../CartStyles/Cart.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";


function Cart() {
    const { cartItems } = useSelector(state => state.cart)
    // console.log("CartItems it is =>", cartItems);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    // console.log( "subtotal it is =>",subtotal);

    const tax = (subtotal * 0.18)
    // console.log("tax it is ",tax);

    const shippingCharges = subtotal > 1000 ? 0 : 50
    // console.log("shipping it is ",shipping);

    const total = subtotal + tax + shippingCharges
    // console.log("total it is ",total);

    const navigate=useNavigate();
    const checkoutHandler=()=>{
        navigate(`/login?redirect=/shipping`)

    }



    return (

        <>
            <Navbar />

            <PageTitle title='Your cart' />
            {cartItems.length === 0 ? (
                <div className="empty-cart-container">
                    <p className="empty-cart-message">Your cart is empty</p>
                    <Link to="/products" className="viewProducts"  >   View Products </Link>
                </div>

            ) : (<>

                <div className="cart-page">
                    <div className="cart-items">
                        <div className="cart-items-heading">Your Cart</div>
                        <div className="cart-table">
                            <div className="cart-table-header">
                                <div className="header-product">Product</div>
                                <div className="header-quantity">Quantity</div>
                                <div className="header-total item-total-heading">Item total</div>
                                <div className="header-action">Actions</div>
                            </div>


                            {/* Cart Items */}
                            {cartItems && cartItems.map((item) => (<CartItem item={item} key={item.name} />))}
                        </div>
                    </div>


                    {/* PRICE SUMMARY */}
                    <div className="price-summary">
                        <h3 className="price-summary-heading"> Price Summary </h3>
                        <div className="summary-item">
                            <p className="summary-label">SubTotal  :</p>
                            <p className="summary-value">{subtotal} /- </p>
                        </div>


                        <div className="summary-item">
                            <p className="summary-label">Tax(18%)  :</p>
                            <p className="summary-value"> {tax} /- </p>
                        </div>


                        <div className="summary-item">
                            <p className="summary-label">Shipping :<br /> Free delivery  above 1000 </p>
                            <p className="summary-value">{shippingCharges} /- </p>
                        </div>
                        <div className="summary-total">
                            <p className="summary-label">Total    :</p>
                            <p className="summary-value">{total} </p>
                        </div>
                        <button className="checkout-btn"  onClick={checkoutHandler}> Proceed to Checkout  </button>
                    </div>
                </div>
                
            </>)}
            <Footer />
        </>
    );
};

export default Cart;
