import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavItems = () => {
    // For debugging
    console.log("Current user:", user);

    if (!user) {
      return (
        <>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/all-blogs" className="nav-link">
            Blogs
          </Link>
          <Link to="/colleges" className="nav-link">
            Colleges
          </Link>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </>
      );
    }

    switch (user.role) {
      case "admin":
        return (
          <>
            <Link to="/admin/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/all-blogs" className="nav-link">
              Blogs
            </Link>
            <Link to="/colleges" className="nav-link">
              Colleges
            </Link>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </>
        );
      case "student":
        return (
          <>
            <Link to="/all-blogs" className="nav-link">
              Blogs
            </Link>
            <Link to="/colleges" className="nav-link">
              Colleges
            </Link>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
            <Link to="/student/applications" className="nav-link">
              My Applications
            </Link>
          </>
        );
      case "employee":
        return (
          <>
            <Link to="/all-blogs" className="nav-link">
              Blogs
            </Link>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
            <Link to="/employee/applications" className="nav-link">
              My Applications
            </Link>
          </>
        );
      case "employer":
        return (
          <>
            <Link to="/job-post" className="nav-link">
              Post Job
            </Link>
            <Link to="/my-jobs" className="nav-link">
              My Jobs
            </Link>
          </>
        );
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              CollegeZania
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {getNavItems()}
          </div>

          <div className="flex items-center">
            {!user ? (
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Login/Register
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <FaUserCircle className="w-6 h-6" />
                  <span>{user.name || user.email}</span>
                </button>

                {isProfileModalOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                      Logged in as {user.role}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login/Register Modal */}
      {isProfileModalOpen && !user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-80">
            <h3 className="text-2xl font-bold mb-6 text-center">Select Role</h3>
            {["Student", "Employee", "College", "Employer", "Admin"].map(
              (role) => (
                <Link
                  key={role}
                  to={`/${role.toLowerCase()}-${
                    role === "Admin" ? "login" : "register"
                  }`}
                  className="block w-full py-3 mb-3 text-center text-gray-800 hover:bg-blue-50 rounded-lg"
                  onClick={() => setIsProfileModalOpen(false)}
                >
                  {role}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
