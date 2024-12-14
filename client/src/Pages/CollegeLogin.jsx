import React, { useState } from "react";
import { Link } from "react-router-dom";

const CollegeLogin = () => {
  const [mailId, setMailId] = useState(""); // Updated to match API field
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/college/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mailId, password }), // Updated to use mailId
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);
        alert("Login successful");
        // Redirect or perform other actions (e.g., saving a token, navigating)
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Unable to login. Please try again later.");
    }
  };

  return (
    <div className="max-h-screen relative">
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-5">
            <h2 className="text-2xl font-bold text-[#002D74]">College Login</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you have an account, please login
            </p>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <form className="mt-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={mailId}
                  onChange={(e) => setMailId(e.target.value)} // Updated to use mailId
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full block bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don't have an account...</p>
              <Link to="/college-register">
                <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400">
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

export default CollegeLogin;
