import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    alert('Please log in to access this page.');
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
