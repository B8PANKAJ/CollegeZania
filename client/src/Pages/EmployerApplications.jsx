import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { jobId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/applications/job/${jobId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/applications/${applicationId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      fetchApplications();
    } catch (error) {
      console.error("Error updating application:", error);
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
        <h1 className="text-3xl font-bold mb-8">Job Applications</h1>
        <div className="grid gap-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {application.applicant.name}
                  </h2>
                  <p className="text-gray-600">{application.applicant.email}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    application.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : application.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {application.status}
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold">Resume</h3>
                  <a
                    href={application.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold">Cover Letter</h3>
                  <p className="text-gray-700">{application.coverLetter}</p>
                </div>

                {application.status === "pending" && (
                  <div className="flex space-x-4">
                    <button
                      onClick={() =>
                        updateApplicationStatus(application._id, "accepted")
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        updateApplicationStatus(application._id, "rejected")
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerApplications;
