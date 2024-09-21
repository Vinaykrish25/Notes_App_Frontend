// Signup.js
import React, { useState } from 'react';
import './Styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Validation Regex
  const userVal = /^[0-9A-Za-z]{5,20}$/;
  const emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordVal = /^[a-zA-Z0-9!@#$%^&*]{8}$/;

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Clear previous errors and success messages
    setErr("");
    setSuccess("");

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
      setErr("Password must be 8 characters and can include letters, numbers, and !@#$%^&*.");
      return;
    }

    if (data.password !== data.confirmpassword) {
      setErr("Passwords do not match.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        data,
        { withCredentials: true }
      );
      console.log(response.data);
      setSuccess("Registration successful! Redirecting to login...");
      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErr(error.response.data.message); // Display specific error from server
      } else {
        setErr("Error registering user. Please try again.");
      }
      console.error(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="signup-container">
      <center><h2>Sign Up</h2></center>
      
      {err && <p className="error-message">{err}</p>}
      {success && <p className="success-message">{success}</p>}
      
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            id="confirmpassword"
            value={data.confirmpassword}
            onChange={(e) => setData({ ...data, confirmpassword: e.target.value })}
            type="password"
            name="confirmpassword"
            placeholder="Confirm your password"
            required
          />
        </div>

        <button type="submit" disabled={loading} id="register">
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
