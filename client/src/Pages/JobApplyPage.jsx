import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const JobApplyPage = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        setJobDetails(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!jobDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Apply for {jobDetails.jobTitle}</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{jobDetails.jobTitle}</h2>
          <p className="text-gray-600 mb-4">{jobDetails.companyName}</p>
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
            <div className="flex items-center mr-4 mb-2">
              <span>{jobDetails.city}</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <span>{jobDetails.salaryRangeMax}</span>
            </div>
            <div className="flex items-center mb-2">
              <span>{jobDetails.experienceRequired}</span>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApplyPage;
