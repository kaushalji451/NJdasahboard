import React, { useContext } from "react";
import { AuthContext } from "../context/context";
import { Navigate } from "react-router-dom";
const useAuth = () => useContext(AuthContext);
const AdminRoute = ({ children, requiredRole }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;
  if (user.role !== requiredRole) return <Navigate to="/unauthorized" />;
  return children;
};

export default AdminRoute;
