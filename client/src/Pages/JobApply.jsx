import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const JobApply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in using AuthContext
    if (!user) {
      alert("Please login first");
      navigate("/student-login");
      return;
    }

    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/jobs/${jobId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch job details.");
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId, navigate, user]);

  const handleApplyClick = async () => {
    if (!user) {
      alert("Please login first to apply.");
      navigate("/student-login");
      return;
    }

    if (user.role !== "student" && user.role !== "employee") {
      alert("Only students and employees can apply for jobs");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/applications`,
        {
          jobId: job._id,
          applicantId: user.id,
          status: "pending",
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      alert("Application submitted successfully!");
      navigate(`/${user.role}/applications`);
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.response?.data?.message || "Failed to submit application");
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading job details...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  if (!job) {
    return <p className="text-center text-lg">No job details available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold mb-2">{job.jobTitle}</h2>
          <p className="text-xl text-gray-600 mb-2">{job.companyName}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FaMapMarkerAlt className="h-4 w-4" />
            <span>{job.city}</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-2">
            <FaIndianRupeeSign className="h-5 w-5 text-green-600" />
            <span className="text-lg font-semibold text-green-600">
              {job.salaryRangeMin} - {job.salaryRangeMax}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Experience Required</h3>
            <p>{job.experienceRequired} years</p>
          </div>

          {job.description && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Job Description</h3>
              <p className="text-gray-700">{job.description}</p>
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Requirements</h3>
              <ul className="list-disc pl-5">
                {job.requirements.map((req, index) => (
                  <li key={index} className="text-gray-700">
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            className="w-full bg-blue-600 text-white text-lg py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
            onClick={handleApplyClick}
            disabled={user?.role !== "student" && user?.role !== "employee"}
          >
            {user?.role !== "student" && user?.role !== "employee"
              ? "Only Students and Employees Can Apply"
              : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
