/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/argentBankLogo.png'
import '../../styles/main.css'
import 'font-awesome/css/font-awesome.min.css';

const Header = () => {
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
        <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          <span className="main-nav-item-signin">Sign In</span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;