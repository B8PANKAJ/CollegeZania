import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // Make sure to import your Auth context

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Access login function from Auth context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/login", // Endpoint for employee login
        { email, password }
      );

      // Assuming the response contains employee data and a token
      login({
        id: response.data.employee._id,
        name: response.data.employee.name,
        email: response.data.employee.email,
        role: "employee",
        token: response.data.token,
      });

      // Redirect the employee to their dashboard or the appropriate page
      navigate("/employee/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-h-screen relative">
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-5">
            <h2 className="text-2xl font-bold text-[#002D74]">
              Employee Login
            </h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you have an account, please login
            </p>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
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
                  placeholder="Enter Password"
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
                aria-label="Log In"
              >
                Log In
              </button>
            </form>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don't have an account...</p>
              <Link to="/employee-register">
                <button
                  className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400"
                  aria-label="Register"
                >
                  Register
                </button>
              </Link>
            </div>
          </div>

          <div className="w-1/2 md:block hidden">
            <img
              src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1887&q=80"
              className="rounded-2xl"
              alt="Login Illustration"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeLogin;
