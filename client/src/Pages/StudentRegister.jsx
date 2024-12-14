import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const studentData = {
      fullName,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students/register",
        studentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration successful", response.data);
      alert("Registration successful");
      // Handle successful registration (e.g., redirect to login page)
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else {
        setError("Unable to register. Please try again later.");
      }
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="max-h-screen relative">
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-5">
            <h2 className="text-2xl font-bold text-[#002D74]">Student Registration</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              Please register to create an account
            </p>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <form className="mt-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-gray-700" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  aria-label="Full Name"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email Address"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Password"
                />
              </div>

              <button
                type="submit"
                className="w-full block bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                aria-label="Register"
              >
                Register
              </button>
            </form>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you already have an account...</p>
              <Link to="/student-login">
                <button
                  className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400"
                  aria-label="Log In"
                >
                  Log In
                </button>
              </Link>
            </div>
          </div>

          <div className="w-1/2 md:block hidden">
            <img
              src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1887&q=80"
              className="rounded-2xl"
              alt="Register Illustration"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentRegister;
