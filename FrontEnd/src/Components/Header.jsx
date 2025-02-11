import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Logo from "../assets/Logo.png";

function Header() {
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
            Dashboard
          </a>
          <a href="#" className="text-white text-2xl hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            Jobs
          </a>
        </div>

        {/* Right: Profile Icon */}
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-white text-4xl cursor-pointer hover:text-gray-200" />
        </div>
      </div>
    </nav>
  );
}

export default Header;
