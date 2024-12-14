import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    email: "",
    password: "",
    phone: "",
    linkedinUrl: "",
    preferredCourses: [],
    coverLetter: "",
    resume: null,
  });

  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "preferredCourses" ? value.split(",") : value,
    }));

    if (name === "coverLetter") {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount <= 200) setWordCount(wordCount);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert("Only PDF or Word documents are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB.");
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        resume: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!formData.employeeName || !formData.email || !formData.password || !formData.phone) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }
  
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
  
    // Log form data to check if all fields are added
    for (let [key, value] of form.entries()) {
      console.log(key, value);
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/register",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      alert("Employee Registered Successfully!");
    } catch (error) {
      console.error("Error in registration", error.response.data);
      alert("There was an error during registration.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-full p-5 items-center">
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Employee Registration"
          />
        </div>

        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Employee Register</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="employeeName"
              className="p-2 mt-8 rounded-xl border"
              placeholder="Full Name"
              value={formData.employeeName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className="p-2 rounded-xl border"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              className="p-2 rounded-xl border"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              className="p-2 rounded-xl border"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="linkedinUrl"
              className="p-2 rounded-xl border"
              placeholder="LinkedIn Profile URL"
              value={formData.linkedinUrl}
              onChange={handleChange}
            />
            <input
              type="text"
              name="preferredCourses"
              className="p-2 rounded-xl border"
              placeholder="Preferred Courses (comma-separated)"
              value={formData.preferredCourses.join(", ")}
              onChange={handleChange}
            />
            <textarea
              name="coverLetter"
              className="p-2 rounded-xl border"
              placeholder="Cover Letter (Max 200 words)"
              value={formData.coverLetter}
              onChange={handleChange}
              maxLength={200}
            />
            <p className="text-sm text-gray-500 mb-4">Word Count: {wordCount} / 200</p>
            <input
              type="file"
              name="resume"
              className="p-2 rounded-xl border"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Already have an account?</p>
            <Link to="/employee-login">
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeRegister;
