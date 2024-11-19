/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/authSlice'
import { clearUserProfile } from '../../store/userSlice';
import logo from '../../assets/argentBankLogo.webp'
import '../../styles/main.css'
import 'font-awesome/css/font-awesome.min.css';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(logOut());
    dispatch(clearUserProfile()); // clean user profile
    navigate('/login');
  };

  const handleName = () => {
    // if username null or doesn't exist, we return firstName
    return profile?.userName || profile?.firstName || 'Nom non disponible';
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <div className="">
            <span className="main-nav-item-username">
              <i className="fa fa-user-circle"></i>
              <Link to="/profile">{handleName()}</Link>
            </span>
            <button onClick={handleSignOut} className="main-nav-item sign-out-button">
              <i className="fa fa-sign-out"></i> Sign Out
            </button>
          </div>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            <span className="main-nav-item-signin">Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;