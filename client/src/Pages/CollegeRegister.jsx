import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CollegeRegister = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    mailId: "",
    password: "", // New field
    address: "",  // New field
    city: "",     // New field
    coursesAvailable: [], // Changed to array
    contactNo: "",
    websiteLink: "",
    description: "",
  });

  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "coursesAvailable") {
      setFormData({
        ...formData,
        coursesAvailable: value.split(",").map((course) => course.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "description") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount <= 200) {
        setWordCount(wordCount);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/college/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("College registered successfully");
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error.response?.data || error.message);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-full p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">College Register</h2>
          <p className="text-xs mt-4 text-[#002D74]">Register your college here</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="collegeName"
              className="p-2 mt-8 rounded-xl border"
              placeholder="College Name"
              value={formData.collegeName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="mailId"
              className="p-2 rounded-xl border"
              placeholder="Mail ID"
              value={formData.mailId}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="p-2 rounded-xl border"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              className="p-2 rounded-xl border"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              className="p-2 rounded-xl border"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="coursesAvailable"
              className="p-2 rounded-xl border"
              placeholder="Courses (comma-separated)"
              value={formData.coursesAvailable.join(", ")}
              onChange={handleChange}
            />
            <input
              type="text"
              name="contactNo"
              className="p-2 rounded-xl border"
              placeholder="Contact No."
              value={formData.contactNo}
              onChange={handleChange}
            />
            <input
              type="url"
              name="websiteLink"
              className="p-2 rounded-xl border"
              placeholder="Website Link"
              value={formData.websiteLink}
              onChange={handleChange}
            />
            <textarea
              name="description"
              className="p-2 rounded-xl border resize-none"
              placeholder="Description (Max 200 words)"
              value={formData.description}
              onChange={handleChange}
              maxLength={200}
              rows="5"
            ></textarea>
            <p className="text-sm text-gray-500">Word Count: {wordCount} / 200</p>
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Register College
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Already have an account?</p>
            <Link to="/college-login">
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="College Registration"
          />
        </div>
      </div>
    </section>
  );
};

export default CollegeRegister;
