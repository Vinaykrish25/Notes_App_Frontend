import React, { useEffect, useState } from 'react';
import './Styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Api from './Api';
import Loading from "../Components/Loading";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false); // Set default to false
  const [success, setSuccess] = useState(false); // Track login success
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    if (!data.email || !data.password) {
      setErr("Enter the credentials")
    }

    setLoading(true); // Start loading spinner when form is submitted
    try {
      const response = await axios.post(`https://notes-app-backend-five-gold.vercel.app/users/login`, data, { withCredentials: true });
      // const response = await Api.post(`/users/login`, data, { withCredentials: true });
      console.log(response.data);
      setErr("Login Successful✅");
      setSuccess(true); // Set success to true to show the success message

      // Simulate loading for 2 seconds before navigating to /notes
      setTimeout(() => {
        setLoading(false); // Stop loading
        navigate("/notes"); // Navigate to notes after success
      }, 1000);

    } catch (error) {
      console.error("Error in login", error);
      setErr("Login Failed ❌");

      // Simulate loading for 2 seconds before navigating back to /login
      setTimeout(() => {
        setLoading(false); // Stop loading
        // Optionally, you can keep the user on the same page or reset form
      }, 1000);
    }
  }

  // Verify user on component mount
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.post('https://notes-app-backend-five-gold.vercel.app/users/verify', {}, { withCredentials: true });
        // const response = await Api.post('/users/verify', {}, { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
          navigate('/notes');
        }
      } catch (error) {
        console.error('User not verified:', error.response?.data?.message || error.message);
      } finally {
        setLoading(false); // Ensure loading spinner stops after verification
      }
    };
    verifyUser();
  }, [navigate]);

  // Display the loading spinner when loading is true
  if (loading) {
    return <div><Loading /></div>;
  }

  if (isAuthenticated) {
    return <p>You are already logged in. Redirecting...</p>;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-heading" style={{ textAlign: "center" }}>Login</h2>
        {err && (
          <p
            className="login-error"
            role="alert"
            style={{ color: success ? "green" : "red", fontWeight: "bold" }}
          >
            {err}
          </p>
        )}
        <br />
        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
            placeholder="Enter your email"
            className="login-input"
            required
            disabled={loading} // Disable inputs when loading
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              id="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="login-input"
              required
              disabled={loading} // Disable inputs when loading
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
        <div className="log-but">
          <button type="submit" className="login-button" disabled={loading}>
            Login
          </button>
          <Link to="/signup"><h4>◀ Register</h4></Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
