import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login, removeError, removeSuccess } from '../features/user/userSlice';
import Navbar from '../components/Navbar';

function Login() {
    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("")
    const {error,loading,success,isAuthenticated}=useSelector(state=>state.user);
    
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get ( "redirect") || "/"
    const loginSubmit=(e)=>{
        e.preventDefault();
        dispatch(login({email:loginEmail,password:loginPassword}))
        
    }
     useEffect(()=>{
            if(error){
              toast.error(error,{position:'top-center',
                autoclose:3000 });
                dispatch(removeError());
               
            }
          },[dispatch,error])


    useEffect(()=>{
        if(isAuthenticated){
            navigate(redirect)
        }
    },[isAuthenticated])

    useEffect(()=>{
        if(success){
            toast.success('Login Successfully',{position:'top-center',
                autoclose:3000 })
                dispatch(removeSuccess())
        }
    })

  return (
      <div className="form-container container">
        <Navbar/>
        <div className="form-content">
            <form action="" className="form" onSubmit={loginSubmit} >
                <div className="input-group">
                    <input className='input-group'  type="email" placeholder='Email'  value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
                    <input className='input-group' type="password" placeholder='Password' value={loginPassword}  onChange={(e)=>setLoginPassword(e.target.value)}/>
                </div>
                <button className='authBtn' >Sign In </button>
                <p className='form-links'>Forgot your Password ?<Link to="/password/forgot" > Reset here </Link>  </p> 
                <p className='form-links'>Don't have an Account ?  <Link to="/register" >Sign up here </Link> </p>
            </form>
        </div>
        
    </div>
  )
}

export default Login