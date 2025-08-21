import React, { useEffect } from 'react'
import '../CartStyles/PaymentSuccess.css'
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader.jsx';

import { toast } from 'react-toastify'

import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, removeErrors, removeSuccess } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';
function PaymentSuccess() {

    // console.log(useSearchParams());
    const [searchParams]=useSearchParams()
    const reference = searchParams.get('reference')
    const {cartItems,shippingInfo}=useSelector(state=>state.cart)
    const { loading,success,error} = useSelector(state=>state.order)
    const dispatch = useDispatch();
    useEffect(()=>{

      const createOrderData= async()=>{
        try{

          const orderItem= JSON.parse(sessionStorage.getItem('orderItem'));
          if(!orderItem) return 
          const orderData={
            shippingInfo:{
              address:shippingInfo.address,
              city:shippingInfo.city,
              state:shippingInfo.state,
              country:shippingInfo.country,
              pinCode:shippingInfo.pinCode,
              phoneNumber:shippingInfo.phoneNumber,
            },
            orderItems:cartItems.map((item)=>({
              name:item.name,
              price:item.price,
              image:item.image,
              product:item.product,
              // product:item._id,
              quantity:item.quantity,
            })
          ),
          paymentInfo:{
            id:reference,
            status:'succeeded'
          },
          itemsPrice:orderItem.subtotal,
          taxPrice:orderItem.tax,
          shippingPrice:orderItem.shippingCharges,
          totalPrice:orderItem.total,
          }
          // console.log('Sending OrderData ',orderData);
          dispatch(createOrder(orderData))
          sessionStorage.removeItem('orderItem')
          

        }catch(error){
          // console.log('Order Creation Error',error.message);
          toast.error(error.message || 'order Creation Error' ,
            {position:'top-center',autoClose:3000}
          )
          
        }
      }
      createOrderData()

    },[dispatch,reference])
    useEffect(()=>{
      if(success){
        toast.success('Order Placed',{
          position:'top-center',
          autoClose:3000
        });
        dispatch(clearCart())
        dispatch(removeSuccess())
      }
    },[dispatch,success])
    useEffect(()=>{
      if(error){
        toast.success(error,{
          position:'top-center',
          autoClose:3000
        });
        dispatch(removeErrors())
      }
    },[dispatch,error])
    
    
  return (
    <>
  { loading ? ( <Loader/> ):( <>
<PageTitle title="Payment Status" />
        <Navbar/>
    <div className="payment-success-container">
      <div className="success-content">
        <div className="success-icon">
            <div className="checkmark">       </div>
        </div>
        <h1>Order Confirm</h1>
        <p>Your Payment was Successful. Reference Id <strong> {reference} </strong> </p>
        <Link className='explore-btn'  to='/orders/user' > View Orders </Link>
        </div>
    </div>
    <Footer/>

  </>)}
  </>
  )
}

export default PaymentSuccess