import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddCandidate from "./pages/AddCandidate";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminRoute from "./component/AdminRoute";
const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <AdminRoute requiredRole="admin">
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path="/add" element={<AddCandidate />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
