import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Api from './Api';
import Loading from './Loading';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates loading

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.post('https://notes-app-backend-five-gold.vercel.app/users/verify', {}, { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication verification failed:', error);
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />; // Or any loading indicator
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
