// Login.js
import React, { useEffect, useState } from 'react';
import './Styles/Login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Api from './Api'; // Assuming Api is an Axios instance

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault(); // Prevent default form submission
    setErr("");
    setSuccess("");
    setLoading(true);
    try{
      const response = await Api.post(`/users/login`, data, {withCredentials: true});
      console.log(response.data);
      setSuccess("Login successful! Redirecting...");
      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate("/notes"); // Replace with your desired route
      }, 2000);
    } catch(error){
      console.error("Error in login", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErr(error.response.data.message);
      } else {
        setErr("Login Failed. Please try again.");
      }
    }
  }

  // Verify user on component mount
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await Api.post('/users/verify',{}, { withCredentials: true });
        if(response.status === 200){
          setIsAuthenticated(true);
          navigate('/notes');
        }
      } catch (error) {
        console.error('User not verified:', error.response?.data?.message || error.message);
      }
      finally {
      setLoading(false);
    }
    };
    verifyUser();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
}

if (isAuthenticated) {
    return <p>You are already logged in. Redirecting...</p>;
}

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      {err && <p className="login-error" role="alert">{err}</p>}
      {success && <p className="login-success" role="status">{success}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={data.email}
            onChange={(e) => setData({...data, email: e.target.value})}
            type="email"
            placeholder="Enter your email"
            className="login-input"
            required
            disabled={loading}
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={data.password}
            onChange={(e) => setData({...data, password: e.target.value})}
            type="password"
            placeholder="Enter your password"
            className="login-input"
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
