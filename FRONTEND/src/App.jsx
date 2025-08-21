import React, { useEffect } from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails.jsx'
import Products from './pages/Products.jsx'
import Register from './User/Register.jsx'
import Login from './User/Login.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './features/user/userSlice.js'
import UserDashboard from './User/userDashboard.jsx'
import Profile from './User/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import UpdateProfile from './User/UpdateProfile.jsx'
import UpdatePassword from './User/UpdatePassword.jsx'
import ForgotPassword from './User/ForgotPassword.jsx'
import ResetPassword from './User/ResetPassword.jsx'
import Cart from './cart/cart.jsx'
import Shipping from './cart/Shipping.jsx'
import OrderConfirm from './cart/OrderConfirm.jsx'
import Payment from './cart/Payment.jsx'
import PaymentSuccess from './cart/PaymentSuccess.jsx'
import MyOrders from './Orders/MyOrders.jsx'
import OrderDetails from './Orders/OrderDetails.jsx'
import Dashboard from './Admin/Dashboard.jsx'
import ProductsList from './Admin/ProductsList.jsx'
import CreateProduct from './Admin/CreateProduct.jsx'
import UpdateProduct from './Admin/UpdateProduct.jsx'
import UserList from './Admin/userList.jsx'
import UpdateRole from './Admin/UpdateRole.jsx'
import OrdersList from './Admin/OrdersList.jsx'
import UpdateOrder from './Admin/UpdateOrder.jsx'
import ReviewsList from './Admin/ReviewsList.jsx'
import AboutUs from './pages/AboutUs.jsx'
import ContactUs from './pages/ContactUs.jsx'



function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  // console.log("User details ",isAuthenticated,user);
  


  return (

    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about-us' element={<AboutUs/>} />
        <Route path='/contact-us' element={<ContactUs/>} />
        {/* <Route path='/profile'   element={<Profile/>} /> */}
        {/* <Route path='/profile/update'   element={<UpdateProfile/>}/> */}
        {/* <Route path='/password/update'   element={<UpdatePassword/>}/> */}
        <Route path='/profile' element={<ProtectedRoute  element={<Profile/>}/>}/>
        <Route path='/profile/update' element={<ProtectedRoute  element={<UpdateProfile/>}/>}/>
        <Route path='/password/update' element={<ProtectedRoute  element={<UpdatePassword/>}/>}/>
        {/* <Route path='/password/forgot' element={<ProtectedRoute  element={<ForgotPassword/>}/>}/> */}
         <Route path='/password/forgot'    element={<ForgotPassword/>}/>
         <Route path='/reset/:token'    element={<ResetPassword/>}/>
         <Route path='/cart'    element={<Cart/>}/>
         {/* <Route path='/shipping'    element={<Shipping/>}/> */}
             <Route path='/shipping' element={<ProtectedRoute  element={<Shipping/>}/>}/>
         {/* <Route path='/order/confirm'    element={<OrderConfirm/>}/> */}
        <Route path='/order/confirm' element={<ProtectedRoute  element={<OrderConfirm/>}/>}/>
        <Route path='/process/payment' element={<ProtectedRoute  element={<Payment/>}/>}/>
        <Route path='/paymentSuccess' element={<ProtectedRoute  element={<PaymentSuccess/>}/>}/>
        <Route path='/orders/user' element={<ProtectedRoute  element={<MyOrders/>}/>}/>
        <Route path='/order/:orderId' element={<ProtectedRoute  element={<OrderDetails/>}/>}/>
        <Route path='/admin/dashboard' element={<ProtectedRoute  element={<Dashboard/>}  adminOnly={true} />}/>
        <Route path='/admin/products' element={<ProtectedRoute  element={<ProductsList/>}  adminOnly={true} />}/>
        <Route path='/admin/product/create' element={<ProtectedRoute  element={<CreateProduct/>}  adminOnly={true} />}/>
        <Route path='/admin/product/:updateId' element={<ProtectedRoute  element={<UpdateProduct/>}  adminOnly={true} />}/>
        <Route path='/admin/users' element={<ProtectedRoute  element={<UserList/>}  adminOnly={true} />}/>
        <Route path='/admin/user/:userId' element={<ProtectedRoute  element={<UpdateRole/>}  adminOnly={true} />}/>
        <Route path='/admin/orders' element={<ProtectedRoute  element={<OrdersList/>}  adminOnly={true} />}/>
        <Route path='/admin/order/:orderId' element={<ProtectedRoute  element={<UpdateOrder/>}  adminOnly={true} />}/>
        <Route path='/admin/reviews' element={<ProtectedRoute  element={<ReviewsList/>}  adminOnly={true} />}/>
      </Routes>

      {isAuthenticated  && <UserDashboard  user={user}  /> }
    </Router>


  )
}

export default App