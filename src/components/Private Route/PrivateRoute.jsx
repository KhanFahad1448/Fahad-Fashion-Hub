// src/Components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, loading, children }) => {
  if (loading) return null; // or a spinner
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
