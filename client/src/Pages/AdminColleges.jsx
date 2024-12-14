import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminColleges = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/college");
      setColleges(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/college/${id}`);
      fetchColleges();
    } catch (error) {
      console.error("Error deleting college:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Colleges</h1>
        <div className="grid gap-6">
          {colleges.map((college) => (
            <div
              key={college._id}
              className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{college.collegeName}</h2>
                <p className="text-gray-600">{college.city}</p>
              </div>
              <button
                onClick={() => handleDelete(college._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminColleges;
