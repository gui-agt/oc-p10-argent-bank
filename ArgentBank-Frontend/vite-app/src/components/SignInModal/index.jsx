/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../store/authSlice';
import { fetchUserProfile } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const SignInModal = () => {
  // state to store username, password and "remember me" option
  const [username, setUsername] = useState(localStorage.getItem('rememberedEmail') || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, status } = useSelector((state) => state.auth);

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Auth action
    dispatch(logIn({ username, password, rememberMe }));
  };

  //  handle redirection once authentificated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
      navigate('/profile');
    }
  }, [isAuthenticated, dispatch, navigate]);

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='on' />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            name="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)} />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button
          className="sign-in-button"
          disabled={status === 'loading'}>
          Sign In
        </button>
        {error && <p className="signInError">{error}</p>}
      </form>
    </section>
  );
}

export default SignInModal;