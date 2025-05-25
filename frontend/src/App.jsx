import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddCandidate from "./pages/AddCandidate";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddCandidate />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
