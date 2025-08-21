import React, { useEffect } from 'react'
import '../AdminStyles/UsersList.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { Link, useNavigate } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, deleteUser, fetchUsers, removeErrors } from '../features/admin/adminSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
function UserList() {
    const { users, loading, error, message } = useSelector(state => state.admin)
    const dispatch = useDispatch();
    const navigate=useNavigate();
    // console.log("Available Users ", users);

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: 'top-center',
                autoClose: 3000
            });
            dispatch(removeErrors())
        }
    }, [dispatch, error])

    const handleDelete = (userId) => {
        const confirm = window.confirm('Are you sure you want to delete this user ? ')
        if (confirm) {
            dispatch(deleteUser(userId))
        
        }

    }


    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: 'top-center',
                autoClose: 3000
            });
            dispatch(removeErrors())
        }

        if (message) {
            toast.error(error.message, {
                position: 'top-center',
                autoClose: 3000
            });
            dispatch(clearMessage())
                navigate('/admin/users')

        }
    }, [dispatch, error, message])



    return (
        <>
            {loading ? (<Loader />) : (<>
                <Navbar />
                <PageTitle title='All Users' />
                <div className="usersList-container">
                    <h1 className='usersList-title'>All Users</h1>
                    <div className="usersList-table-container">
                        <table className="usersList-table">
                            <thead>
                                <tr>
                                    <th>S . No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id} >
                                        <th>{index + 1}</th>
                                        <th>{user.name} </th>
                                        <th> {user.email}</th>
                                        <th> {user.role} </th>
                                        <th> {new Date(user.createdAt).toLocaleDateString()} </th>
                                        <th> <Link to={`/admin/user/${user._id}`} className='action-icon edit-icon' > <Edit /></Link>
                                            <button className='action-icon delete-icon' onClick={() => handleDelete(user._id)}  > <Delete /> </button> </th>
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

export default UserList