import React, { useEffect } from 'react'
import '../AdminStyles/OrdersList.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, deleteOrder, fetchAllOrders, removeErrors, removeSuccess } from '../features/admin/adminSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

function OrdersList() {
    const { orders, loading, error, success, message } = useSelector(state => state.admin);
    // console.log("all the orders ", orders);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllOrders())
    }, [dispatch])


    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this order ? ");
        if (confirm) {
            dispatch(deleteOrder(id))
        }
    }



    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: 'top-center',
                autoClose: 3000
            });
            dispatch(removeErrors());
        }

        if (success) {
            toast.success(message, {
                position: 'top-center',
                autoClose: 3000
            });
            dispatch(removeSuccess());
            dispatch(clearMessage());
            dispatch(fetchAllOrders());
        }
    }, [dispatch, error, success]);


    if (orders && orders.length === 0) {
        return (
            <div className="no-orders-container">
                <p>No Order Found</p>

            </div>
        )
    }

    return (

        <>
            {loading ? (<Loader />) : (<>
                <Navbar />
                <PageTitle title='All Orders' />

                <div className="ordersList-container">

                    <h1 className='ordersList-title' >All Orders</h1>
                    <div className="ordersList-table-container">
                        <table className="ordersList-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Order ID</th>
                                    <th>Status</th>
                                    <th>Total Price</th>
                                    <th>Number Of Items</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((ord, index) => (

                                    <tr>
                                        <th>{index + 1}</th>
                                        <th> {ord.orderItems[0]?.name} </th>
                                        <th>{ord._id}</th>
                                        <th className={`order-status ${ord.orderStatus.toLowerCase()}`} >{ord.orderStatus}</th>
                                        <th> {ord.totalPrice.toFixed(2)} /- </th>
                                        <th> {ord.orderItems.length} </th>
                                        <th>
                                            <Link to={`/admin/order/${ord._id}`} className='action-icon edit-icon' >  <Edit /> </Link>
                                            <button className="action-btn delete-icon" onClick={() => handleDelete(ord._id)} ><Delete /></button>
                                        </th>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                <Footer />
            </>)}
        </>
    )
}

export default OrdersList