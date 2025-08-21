import React, { useEffect, useState } from 'react'
import '../UserStyles/UpdatePassword.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeError, removeSuccess, updatePassword } from '../features/user/userSlice'
import { toast } from 'react-toastify'
function UpdatePassword() {
    const { success, loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword)
        myForm.set("confirmPassword", confirmPassword)

      
        dispatch(updatePassword(myForm))
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
            toast.success("password updated successfully", {
                position: 'top-center',
                autoclose: 3000
            });
            dispatch(removeSuccess())
            navigate("/profile")
        }
    }, [dispatch, success])


    return (
        <>
            <Navbar />
            <PageTitle title='Password Update' />
            <div className="container update-container">
                <div className="form-content">
                    <form className="form" onSubmit={updatePasswordSubmit}>
                        <h2>Update Password</h2>

                        <div className="input-group">
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                name='oldPassword'
                                placeholder='Old Password' />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                name='newPassword'
                                placeholder='New Password' />
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
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UpdatePassword