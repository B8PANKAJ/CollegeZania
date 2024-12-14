import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  const fetchEmployerJobs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/jobs/employer/${user.id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Posted Jobs</h1>
          <Link
            to="/job-post"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Post New Job
          </Link>
        </div>

        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
                  <p className="text-gray-600">{job.companyName}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    job.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-gray-600">
                  <p>Location: {job.city}</p>
                  <p>Experience: {job.experienceRequired}</p>
                  <p>
                    Salary: ₹{job.salaryRangeMin} - ₹{job.salaryRangeMax}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Link
                    to={`/employer/applications/${job._id}`}
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-200"
                  >
                    View Applications ({job.applications?.length || 0})
                  </Link>
                  <button
                    onClick={() => handleStatusToggle(job._id, job.status)}
                    className={`px-4 py-2 rounded ${
                      job.status === "active"
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}
                  >
                    {job.status === "active" ? "Close Job" : "Reopen Job"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
