import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, removeSuccess, resetPassword } from '../features/user/userSlice';
import { toast } from 'react-toastify';


function ResetPassword() {

        const { success, loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();


     const [password, setPassword] = useState("")
        const [confirmPassword, setConfirmPassword] = useState("");
        const {token} = useParams();

    const resetPasswordSubmit=(e)=>{
        e.preventDefault();
        const data={
            password,
          confirmPassword
        }
        dispatch(resetPassword({token,userData:data}))
    }

       useEffect(() => {
            if (error) {
                toast.error(error, {
                    position: 'top-center',
                    autoclose: 3000
                });
                dispatch(removeError())
            }
        }, [dispatch, error])
    
useEffect(() => {
        if (success) {
            toast.success("password Reset successfully", {
                position: 'top-center',
                autoclose: 3000
            });
            dispatch(removeSuccess())
            navigate("/login")
        }
    }, [dispatch, success])

  return (
    <>
    
    <PageTitle title='Reset Password ' />
            <div className="container update-container">
                <div className="form-content">
                    <form className="form" onSubmit={resetPasswordSubmit}>
                        <h2>Reset Password</h2>

                        <div className="input-group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name='password'
                                placeholder='Enter Your New  Password' />
                        </div>
                     
                        <div className="input-group">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                name='confirmPassword'
                                placeholder='confirm Password' />
                        </div>

                        <button className='authBtn'>
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
    
    </>
  )
}

export default ResetPassword