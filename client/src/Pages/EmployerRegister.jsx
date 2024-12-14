import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmployerRegister = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    employeeName: "",
    contactNo: "",
    mailId: "",
    gstNo: "",
    panNo: "",
    city: "",
    address: "",
    password: "", // Adding a password field
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/register",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess("Registration successful!");
        setFormData({
          companyName: "",
          employeeName: "",
          contactNo: "",
          mailId: "",
          gstNo: "",
          panNo: "",
          city: "",
          address: "",
          password: "",
        });
      }
    } catch (err) {
      console.error("Error details:", err); // Log the error details
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="max-h-screen relative">
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-5">
            <h2 className="text-2xl font-bold text-[#002D74]">
              Employer Register
            </h2>
            <p className="text-sm mt-4 text-[#002D74]">
              Please fill in the details to register your employer account
            </p>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mt-2">{success}</p>
            )}

            <form className="mt-6" onSubmit={handleRegister}>
              {/** Form Fields */}
              {[
                { label: "Company Name", name: "companyName", type: "text" },
                { label: "Person Name", name: "employeeName", type: "text" },
                { label: "Contact No.", name: "contactNo", type: "tel" },
                { label: "Mail ID", name: "mailId", type: "email" },
                { label: "G.S.T", name: "gstNo", type: "text" },
                { label: "PAN No.", name: "panNo", type: "text" },
                { label: "City", name: "city", type: "text" },
                { label: "Password", name: "password", type: "password" },
              ].map((field) => (
                <div className="mt-4" key={field.name}>
                  <label className="block text-gray-700" htmlFor={field.name}>
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={`Enter ${field.label}`}
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className="mt-4">
                <label className="block text-gray-700" htmlFor="address">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={formData.address}
                  onChange={handleChange}
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
              <Link to="/employer-login">
                <button
                  className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400"
                  aria-label="Login"
                >
                  Login
                </button>
              </Link>
            </div>
          </div>

          <div className="w-1/2 md:block hidden">
            <img
              src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1887&q=80"
              className="rounded-2xl"
              alt="Employer Register Illustration"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployerRegister;
