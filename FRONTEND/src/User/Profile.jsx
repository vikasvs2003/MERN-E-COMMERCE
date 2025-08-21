import React, { useEffect } from 'react'
import '../UserStyles/Profile.css'
import '../UserStyles/ProfileWarning.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../features/user/userSlice';
import PageTitle from '../components/PageTitle';
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function Profile() {
  const dispatch = useDispatch();

  const { error, loading, success, isAuthenticated, user } = useSelector(state => state.user);
  // console.log("user hai  ",user);

  //  Call loadUser on mount

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, [dispatch]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="profile-warning-container">
        <div className="profile-warning-card">
          <h2 className="profile-warning-title">Access Denied</h2>
          <p className="profile-warning-text">
            You must be <span>logged in</span> to view your profile.
          </p>
          <a href="/login" className="profile-warning-btn">
            Login Now
          </a>
        </div>
      </div>
    );
  }


  return (

    <>
     <Navbar />
      {loading ? (<Loader />) : (<div className="profile-container">
        <PageTitle title={`${user.name.split(" ")[0]} profile`} />
        <div className="profile-image">
          <h1 className="profile-heading">My Profile</h1>
          <img src={user.avatar.url ? user.avatar.url : './images/profile.jpg'} alt="User Profile" className="profile-image" />
          <Link to="/profile/update" >Edit Profile</Link>
        </div>

        <div className="profile-details">
          <div className="profile-detail">
            <h2>Username:</h2>
            <p>{user.name}</p>
          </div>
          <div className="profile-detail">
            <h2>Email:</h2>
            <p>{user.email}</p>
          </div>
          <div className="profile-detail">
            <h2>Joined on :</h2>
            <p>{new Date(user.createdAt).toLocaleDateString('en-CA')}</p>

          </div>
        </div>

        <div className="profile-buttons">
          <Link to="/orders/user">My Orders</Link>
          <Link to="/password/update">  Change Password </Link>

        </div>

      </div>
      )}
      <Footer />
    </>


  )
}

export default Profile