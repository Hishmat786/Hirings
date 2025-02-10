import React from 'react';
import { FaSearch } from 'react-icons/fa';
import Logo from "../assets/Logo.png";

function Navbar() {
  return (
    <nav className="bg-blue-400 p-4">
      <div className="container mx-auto flex justify-between items-center gap-x-8">
        {/* Left: Logo and Name */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-8 h-8" />
          <div className="text-white font-serif text-3xl font-bold">Hirings</div>
        </div>

        {/* Middle: Navigation Links with Scale Effect */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-white text-2xl hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            Home
          </a>
          <a href="#" className="text-white text-2xl hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            About
          </a>
          <a href="#" className="text-white text-2xl hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            Services
          </a>
          <a href="#" className="text-white text-2xl hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            Contact
          </a>
        </div>

        {/* Right: Search Field */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="bg-white text-blue-500 p-2 rounded-lg hover:bg-blue-200">
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
