import React, { useState } from 'react';
import './Styles/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Api from './Api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation Regex
  const userVal = /^[0-9A-Za-z]{5,20}$/;
  const emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordVal = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!userVal.test(data.username)) {
      setErr("Username must be 5-20 characters long and contain only letters and numbers.");
      return;
    }

    if (!emailVal.test(data.email)) {
      setErr("Please enter a valid email address.");
      return;
    }

    if (!passwordVal.test(data.password)) {
      setErr("Password must be 8 characters and include letters, numbers, or !@#$%^&*.");
      return;
    }

    if (data.password !== data.confirmpassword) {
      setErr("Passwords do not match.");
      return;
    }

    setLoading(true); 
    setErr("");

    try {
      // const response = await axios.post(
      //   "https://notes-app-backend-five-gold.vercel.app/users/register",
      const response = await Api.post(
        "/users/register",
        data,
        { withCredentials: true }
      );
      console.log(response.data);

      setErr("Registered Successfully! Please log in.");
      setLoading(false); 

      // Navigate to login page
      navigate('/login');

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErr(error.response.data.message); 
      } else {
        setErr("Error registering user. Please try again.");
      }
      console.error(error);
      setLoading(false); 
    }
  };

  // Show the loading component while loading is true
  if (loading) {
    return <Loading />;
  }

  return (
    <div className='signup-page'>
      <div className="signup-container">
        <center><h2>Sign Up</h2></center>
        <br />
        {err && (
          <p
            className="error-message"
            style={{ textAlign: "center", color: err.includes("Successfully") ? "green" : "red" }}
          >
            {err}
          </p>
        )}
        <br />
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              type="text"
              name="username"
              placeholder="Enter your username"
              required
              disabled={loading} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="text" 
              name="email"
              placeholder="Enter your email"
              required
              disabled={loading} // Disable inputs when loading
            />
          </div>

          {/* Password Field with Toggle Button */}
          <div className="form-group password-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                id="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                required
                disabled={loading} 
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={togglePasswordVisibility}
                disabled={loading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field with Toggle Button */}
          <div className="form-group password-group">
            <label htmlFor="confirmpassword">Confirm Password:</label>
            <div className="password-input-container">
              <input
                id="confirmpassword"
                value={data.confirmpassword}
                onChange={(e) => setData({ ...data, confirmpassword: e.target.value })}
                type={showPassword ? 'text' : 'password'}
                name="confirmpassword"
                placeholder="Confirm your password"
                required
                disabled={loading} 
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={togglePasswordVisibility}
                disabled={loading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="sig-but">
            <button type="submit" disabled={loading} id="register">
              Sign Up
            </button>
            <Link to="/login"><h4>◀ Login</h4></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
