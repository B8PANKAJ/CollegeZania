import React, { useState, useEffect } from "react";
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

// JobCard component
const JobCard = ({
  jobTitle,
  companyName,
  city,
  salaryRangeMax,
  experienceRequired,
  _id,
}) => {
  const navigate = useNavigate();

  const handleApply = () => {
    // Redirect to the JobApplyPage with jobId as a URL parameter
    navigate(`/job-apply/${_id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{jobTitle}</h3>
      <p className="text-gray-600 mb-4">{companyName}</p>
      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
        <div className="flex items-center mr-4 mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <span>{city}</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <FaMoneyBillWave className="mr-2" />
          <span>{salaryRangeMax}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaBriefcase className="mr-2" />
          <span>{experienceRequired}</span>
        </div>
      </div>
      <button
        onClick={handleApply}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
      >
        Apply Now
      </button>
    </div>
  );
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]); // Store the fetched jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch job listings from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        // Check response structure and extract data
        if (response.data && Array.isArray(response.data.jobs)) {
          setJobs(response.data.jobs); // Assuming the API returns { jobs: [...] }
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Top Jobs</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} {...job} /> // Use `_id` or appropriate unique key
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
