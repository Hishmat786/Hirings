import React, { useState } from "react";
import {
  FaUserCircle,
  FaHome,
  FaBriefcase,
  FaListAlt,
  FaUser,
  FaEnvelopeOpenText,
  FaSignOutAlt,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import PostJobForm from "./PostJobForm";
import MyJobs from "./MyJobs";
import Dashboard from "./Dashboard";

function EmployeeDashboard() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const location = useLocation();
  const { employeeName, employeeMail } = location.state || {
    employeeName: "Guest",
    employeeMail: "Not Provided",
  };

  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear stored user data
    alert("You have been logged out!");
    navigate("/"); // Redirect to the login page
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-blue-700 text-white w-64 p-6 space-y-6">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-6">
          <FaUserCircle className="text-4xl" />
          <h2 className="text-xl font-bold">{employeeName}</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          {/* Overview Section */}
          <div>
            <h3 className="uppercase text-sm font-semibold text-gray-400">
              Overview
            </h3>
            <button
              className={`flex items-center w-full p-2 mt-2 text-lg ${
                activeSection === "Dashboard" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleNavigation("Dashboard")}
            >
              <FaHome className="mr-2" /> Dashboard
            </button>
          </div>

          {/* Manage Hiring Section */}
          <div>
            <h3 className="uppercase text-sm font-semibold text-gray-400">
              Manage Hiring
            </h3>
            <button
              className={`flex items-center w-full p-2 text-lg ${
                activeSection === "Post a Job" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleNavigation("Post a Job")}
            >
              <FaBriefcase className="mr-2" /> Post a Job
            </button>
            <button
              className={`flex items-center w-full p-2 text-lg ${
                activeSection === "My Job Posts" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleNavigation("My Job Posts")}
            >
              <FaListAlt className="mr-2" /> My Job Posts
            </button>
            <button
              className={`flex items-center w-full p-2 text-lg ${
                activeSection === "Applications" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleNavigation("Applications")}
            >
              <FaEnvelopeOpenText className="mr-2" /> Applications
            </button>
          </div>

          {/* Profile Section */}
          <div>
            <h3 className="uppercase text-sm font-semibold text-gray-400">
              Profile
            </h3>
            <button
              className={`flex items-center w-full p-2 text-lg ${
                activeSection === "My Profile" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleNavigation("My Profile")}
            >
              <FaUser className="mr-2" /> My Profile
            </button>

            {/* Logout Button */}
            <button
              className="flex items-center w-full p-2 text-lg  hover:bg-blue-400"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 bg-white">
        <h1 className="text-2xl font-bold mb-4">{activeSection}</h1>

        {/* Conditional Rendering Based on Active Section */}
        {activeSection === "Dashboard" && <Dashboard />}
        {activeSection === "Post a Job" && <PostJobForm employerEmail={employeeMail} />}
        {activeSection === "My Job Posts" && <MyJobs employeeMail={employeeMail} />}
        {activeSection === "Applications" && <p>View applications here.</p>}
        {activeSection === "My Profile" && <p>Manage your profile here.</p>}
      </main>
    </div>
  );
}

export default EmployeeDashboard;
