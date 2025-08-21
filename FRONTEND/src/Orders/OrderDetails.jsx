import React from 'react'
import '../OrderStyles/OrderDetails.css'
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getOrderDetails, removeErrors } from '../features/order/orderSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

// 68a1ab1d36bc8bbb7cc92c34

function OrderDetails() {
    const { orderId } = useParams();
    // console.log("orderid it is is ", orderId);

    const { order, loading, error } = useSelector((state) => state.order);
    // console.log("Redux order is", order);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrderDetails(orderId));

        if (error) {
            toast.error(error, {
                position: 'top-center', autoClose: 3000
            });
            dispatch(removeErrors())
        }
    }, [dispatch, error, orderId])



    return (



        <>
            <PageTitle title={orderId} />
            <Navbar />
            {loading ? (<Loader />) : (<div className="order-details-container">
                {/* Order Items */}
                <section className="order-section">
                    <h2>Order Items</h2>
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.orderItems && order?.orderItems?.length > 0 ? (
                                order?.orderItems?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="order-item-img"
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}/-</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                                        No items in this order
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </section>

                {/* Shipping Info */}
                <section className="order-section">
                    <h2>Shipping Info</h2>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <td><strong>Address</strong></td>
                                <td>{`${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.country} - ${order?.shippingInfo?.pincode}`}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone</strong></td>
                                <td>{order?.shippingInfo?.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* Order Summary */}
                <section className="order-section">
                    <h2>Order Summary</h2>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <td><strong>Order Status</strong></td>
                                <td>
                                    <span
                                        className={
                                            order?.orderStatus === "Processing"
                                                ? "status-badge processing"
                                                : "status-badge success"
                                        }
                                    >
                                        {order?.orderStatus}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Payment Status</strong></td>
                                <td>
                                    <span
                                        className={
                                            order?.paymentInfo?.status === "succeeded"
                                                ? "status-badge success"
                                                : "status-badge failed"
                                        }
                                    >
                                        {order?.paymentInfo?.status === "succeeded"
                                            ? "Paid"
                                            : "Not Paid"}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Paid At</strong></td>
                                <td>{new Date(order.paidAt).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td><strong>Items Price</strong></td>
                                <td>{order.itemsPrice}/-</td>
                            </tr>
                            <tr>
                                <td><strong>Tax</strong></td>
                                <td>{order.taxPrice}/-</td>
                            </tr>
                            <tr>
                                <td><strong>Shipping Price</strong></td>
                                <td>{order.shippingPrice}/-</td>
                            </tr>
                            <tr>
                                <td><strong>Total Price</strong></td>
                                <td><strong>{order.totalPrice}/-</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>)}
        </>
    );
};

export default OrderDetails;