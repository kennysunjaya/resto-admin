import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="flex justify-between items-center bg-black p-4">
      {/* Admin Panel */}
      <h1 className="font-serif text-white text-3xl">Admin Panel</h1>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <Link to={"/"} className="font-serif text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200">
          {" "}
          <span>Home</span>
        </Link>
        <Link to={"/categories"} className="font-serif text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200">
          <span>Categories</span>
        </Link>
        <Link to={"/add-user"} className="font-serif text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200">
          <span>Add User</span>
        </Link>
        <button className="font-serif text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
