import React from "react";
import { useTheme, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem("authToken"));

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
     

    <header className="text-gray-600 body-font">
  <div className="container mx-auto flex items-center justify-between p-5">
    <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span className="ml-3 text-xl text-indigo-700 font-bold">Quantum AI</span>
    </Link>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center space-x-4">
      <Link to="/" className="hover:text-gray-900">
        Home
      </Link>
      {isLoggedIn ? (
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <>
          <Link to="/register" className="hover:text-gray-900">
            Register
          </Link>
          <Link to="/login" className="hover:text-gray-900">
            Login
          </Link>
        </>
      )}
    </nav>
  </div>
</header>

  
  );
};

export default Navbar;