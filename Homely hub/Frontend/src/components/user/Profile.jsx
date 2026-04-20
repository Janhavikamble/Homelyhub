
import React from 'react';
import ProgressSteps from '../ProgressSteps';
import { Link } from 'react-router-dom';
import '../../css/Profile.css';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import moment from 'moment';

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  
  return (
    <>
      <ProgressSteps profile />
      {loading && <LoadingSpinner />}
      {user && !loading && (
        <div className="profile-container">
          <div className="profile-left">
            <div className="avatar-section">
              <figure className="avatar-profile">
                <img
                  className="rounded-circle"
                  src={user.avatar.url}
                  alt="avatar"
                />
              </figure>
              <h3 className="welcome-text">Welcome {user.name}</h3>
            </div>
          </div>

          <div className="profile-right">
            <div className="userinfo">
              <div className="info-item">
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>

              <div className="info-item">
                <h4>Email Address</h4>
                <p>{user.email}</p>
              </div>

              <div className="info-item">
                <h4>Joined On</h4>
                <p>{moment(user.createdAt).format('MMMM Do YYYY')}</p>
              </div>

              <div className="profile-buttons">
                <Link to="/editprofile" className="profile-btn edit-btn">
                  Edit Profile
                </Link>
                <Link to="/user/updatepassword" className="profile-btn password-btn">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
