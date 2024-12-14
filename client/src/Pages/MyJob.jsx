import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import mongoose from "mongoose";

const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.token) {
      navigate("/employer-login");
      return;
    }

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "http://localhost:5000/api/jobs/employer/jobs",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.data.success) {
          setJobs(response.data.jobs);
        } else {
          setError(response.data.error || "Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error.response || error);
        setError(
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to fetch jobs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user, navigate]);

  const handleViewApplications = (jobId) => {
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      setError("Invalid job ID");
      return;
    }
    navigate(`/employer/jobs/${jobId}/applications`);
  };

  const handleDelete = async (jobId) => {
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      setError("Invalid job ID");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      setError("");

      const response = await axios.delete(
        `http://localhost:5000/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        alert("Job deleted successfully");
      } else {
        setError(response.data.error || "Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error.response || error);
      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to delete job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200 min-h-screen p-4">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Posted Jobs</h1>
        <button
          onClick={() => navigate("/employer/post-job")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Post New Job
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && jobs.length === 0 ? (
        <div className="text-center py-4">
          <p>No jobs posted yet.</p>
        </div>
      ) : (
        <div className="px-3 py-4">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Job Title</th>
                <th className="text-left p-3 px-5">Company Name</th>
                <th className="text-left p-3 px-5">Location</th>
                <th className="text-left p-3 px-5">Status</th>
                <th className="text-left p-3 px-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-b hover:bg-orange-100">
                  <td className="p-3 px-5">{job.jobTitle || "N/A"}</td>
                  <td className="p-3 px-5">{job.companyName || "N/A"}</td>
                  <td className="p-3 px-5">{job.city || "N/A"}</td>
                  <td className="p-3 px-5">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        job.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {job.status || "N/A"}
                    </span>
                  </td>
                  <td className="p-3 px-5 flex space-x-2">
                    <button
                      onClick={() => handleViewApplications(job._id)}
                      className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                    >
                      View Applications
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyJob;
