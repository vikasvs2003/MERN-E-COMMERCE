import React, { useEffect, useState } from 'react'
import '../AdminStyles/UpdateOrder.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../features/order/orderSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { removeErrors, removeSuccess, updateOrderStatus } from '../features/admin/adminSlice'
function UpdateOrder() {
    const [status, setStatus] = useState("")
    const { orderId } = useParams();
    const { order, loading: orderLoading } = useSelector(state => state.order);
    const { success, error, loading: adminLoading } = useSelector(state => state.admin);
    // console.log(order);

    const dispatch = useDispatch();

    const loading = orderLoading || adminLoading;

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId]);

    const {
        shippingInfo = {},
        orderItems = [],
        paymentInfo = {},
        orderStatus,
        totalPrice
    } = order;

    const paymentStatus =
        paymentInfo.status === "succeeded" ? "Paid" : "Not Paid";

    const finalOrderStatus =
        paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;

    // ✅ Hook top level pe rakho
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 3000,
            });
            dispatch(removeErrors());
        }

        if (success) {
            toast.success("Order Status Updated Successfully", {
                position: "top-center",
                autoClose: 3000,
            });
            dispatch(removeSuccess());
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, error, success, orderId]);

    const handleStatusUpdate = () => {
        if (!status) {
            toast.error("Please Select a Status", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }
        dispatch(updateOrderStatus({ orderId, status }));
    };



    return (
        <>
            <Navbar />
            <PageTitle title="Update Order" />
            {loading ? (<Loader />) : (<div className="order-container">


                <h1 className="order-title">Update Order</h1>

                {/* ORDER DETAILS  */}
                <div className="order-details">
                    <h2>Order Information</h2>
                    <p> <strong> Order ID :</strong> {orderId}</p>
                    <p> <strong>Shipping Address :</strong> {shippingInfo.address},{shippingInfo.city},{shippingInfo.state},{shippingInfo.country},{shippingInfo.pinCode}</p>
                    <p> <strong> Phone NO :</strong> {shippingInfo.phoneNumber}</p>
                    <p> <strong> Order Status :</strong> {finalOrderStatus}</p>
                    <p> <strong>Payment Status :</strong> {paymentStatus} </p>
                    <p> <strong>Total Price : </strong> 5632/-</p>
                </div>

                {/* ORDER ITEMS  */}
                <div className="order-items">
                    <h2>Order Items</h2>
                    <table className="order-table">
                        <thead>
                            <tr>
                                <td>Image</td>
                                <td>Name</td>
                                <td>Quantity</td>
                                <td>Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((item) => (
                                <tr key={item._id} >
                                    <td> <img src={item.image} alt={item.name} className='order-item-image' /> </td>
                                    <td>{item.name}</td>
                                    <td> {item.quantity}</td>
                                    <td>{item.price}/-</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Update Order Status  */}
                <div className="order-status">
                    <h2>Update Status</h2>
                    <select className='status-select' value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading || orderStatus ==='Delivered'}  >
                        <option value="">Select Status</option>
                        <option value="Shipped">Shipped</option>
                        <option value="On The Way">On the Way</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                    <button className='update-button' onClick={handleStatusUpdate} disabled={loading || !status ||orderStatus ==='Delivered'}  > Update Status</button>
                </div>



            </div>)}
            <Footer />

        </>
    )
}

export default UpdateOrder