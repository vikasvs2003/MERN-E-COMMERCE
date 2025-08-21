import React, { useEffect } from 'react'
import '../OrderStyles/MyOrders.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import { LaunchOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMyOrders, removeErrors } from '../features/order/orderSlice';
import { toast } from 'react-toastify';




function MyOrders() {
    const {orders,loading,error}= useSelector(state=>state.order)
        
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllMyOrders())
        if(error){
              toast.error(error.message,{position:'top-center',
                autoclose:3000 });
                dispatch(removeErrors())
            }
    },[dispatch,error])

    return (
        <>
      <Navbar />
      <PageTitle title="User Orders" />

      <div className="my-orders-container">
        <h1>My Orders</h1>

        {orders && orders.length > 0 ? (
          <div className="table-responsive">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items Count</th>
                  <th>Status</th>
                  <th>Total Price</th>
                  <th>View Order</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.orderItems.length}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.totalPrice}/-</td>
                    <td>
                      <Link
                        to={`/order/${order._id}`}
                        className="order-link"
                      >
                        <LaunchOutlined />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // 👇 Empty State Page
          <div className="no-orders">
            <img
              src="/images/no-orders.png"
              alt="No Orders"
              className="no-orders-img"
            />
            <h2>No Orders Found</h2>
            <p>You haven’t placed any orders yet. Start shopping now!</p>
            <Link to="/products" className="shop-now-btn">
              Browse Products
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyOrders