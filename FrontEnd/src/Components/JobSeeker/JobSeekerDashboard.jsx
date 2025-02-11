import React, { useState } from "react";
import { FaUserCircle, FaTachometerAlt, FaComments, FaClipboardList, FaSuitcase, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ApplyForJobs from "./ApplyForJobs";
import AppliedJobs from "./AppliedJobs";

import Dashboard from "./Dashboard";


function JobSeekerDashboard() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  const { employeeName, employeeMail } = location.state || {
    employeeName: "Guest",
    employeeMail: "Not Provided",
  };

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
              <FaTachometerAlt className="mr-2" /> Dashboard
            </button>
          </div>

          {/* Manage Hiring Section */}
          <div>
            <h3 className="uppercase text-sm font-semibold text-gray-400">
              Manage Hiring
            </h3>
            <button
              className={`flex items-center w-full p-2 text-lg ${
                activeSection === "Apply For Jobs" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleNavigation("Apply For Jobs")}
            >
              <FaClipboardList className="mr-2" /> Apply For Jobs
            </button>
            <button
              className={`flex items-center w-full p-2 text-lg ${
                activeSection === "Applied Jobs" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleNavigation("Applied Jobs")}
            >
              <FaSuitcase className="mr-2" /> Applied Jobs
            </button>
          </div>

          {/* Settings Section */}
          <div>
            <h3 className="uppercase text-sm font-semibold text-gray-400">
              Settings
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
        {activeSection === "Dashboard" && <Dashboard employeeMail={employeeMail}/>}
        {activeSection === "Apply For Jobs" && <ApplyForJobs employeeMail={employeeMail}/>}
        {activeSection === "Applied Jobs" && <AppliedJobs employeeMail={employeeMail}/>}
        {activeSection === "My Profile" && <p>Profile</p>}
      </main>
    </div>
  );
}

export default JobSeekerDashboard;
