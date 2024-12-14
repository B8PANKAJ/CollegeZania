import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const JobPostingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    experienceRequired: "",
    salaryRangeMin: "",
    salaryRangeMax: "",
    city: "",
    description: "",
    requirements: "",
    jobType: "full-time",
    status: "active",
  });

  const validateForm = () => {
    if (!formData.description.trim()) {
      setError("Job description is required");
      return false;
    }

    if (parseInt(formData.salaryRangeMin) > parseInt(formData.salaryRangeMax)) {
      setError("Minimum salary cannot be greater than maximum salary");
      return false;
    }
    if (parseInt(formData.experienceRequired) < 0) {
      setError("Experience required cannot be negative");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user || !user.role) {
      setError("Please login as an employer first");
      navigate("/employer/login");
      return;
    }

    if (user.role !== "employer") {
      setError("Only employers can post jobs");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const requirementsArray = formData.requirements
      .split("\n")
      .filter((req) => req.trim() !== "");

    const jobData = {
      ...formData,
      description: formData.description.trim(),
      experienceRequired: parseInt(formData.experienceRequired),
      salaryRangeMin: parseInt(formData.salaryRangeMin),
      salaryRangeMax: parseInt(formData.salaryRangeMax),
      requirements: requirementsArray,
      employerId: user.id,
    };

    const requiredFields = [
      "companyName",
      "jobTitle",
      "description",
      "city",
      "experienceRequired",
      "salaryRangeMin",
      "salaryRangeMax",
    ];

    const missingFields = requiredFields.filter(
      (field) => !jobData[field] && jobData[field] !== 0
    );
    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/jobs",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        alert("Job posted successfully!");
        navigate("/my-jobs");
      }
    } catch (error) {
      console.error("Job posting error:", error.response?.data || error);
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to post job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-12">
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Post a New Job
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="experienceRequired"
              className="block text-sm font-medium text-gray-700"
            >
              Experience Required (years)
            </label>
            <input
              type="number"
              id="experienceRequired"
              name="experienceRequired"
              value={formData.experienceRequired}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="salaryRangeMin"
                className="block text-sm font-medium text-gray-700"
              >
                Salary Range (Min)
              </label>
              <input
                type="number"
                id="salaryRangeMin"
                name="salaryRangeMin"
                value={formData.salaryRangeMin}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="salaryRangeMax"
                className="block text-sm font-medium text-gray-700"
              >
                Salary Range (Max)
              </label>
              <input
                type="number"
                id="salaryRangeMax"
                name="salaryRangeMax"
                value={formData.salaryRangeMax}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter detailed job description"
            />
          </div>

          <div>
            <label
              htmlFor="requirements"
              className="block text-sm font-medium text-gray-700"
            >
              Requirements (one per line)
            </label>
            <textarea
              id="requirements"
              name="requirements"
              rows="4"
              value={formData.requirements}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job requirements (one per line)"
            />
          </div>

          <div>
            <label
              htmlFor="jobType"
              className="block text-sm font-medium text-gray-700"
            >
              Job Type
            </label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPostingForm;
