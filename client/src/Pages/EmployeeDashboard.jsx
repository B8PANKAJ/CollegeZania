import React from "react";
import { useAuth } from "../contexts/AuthContext";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome, {user?.name || "Employee"}
          </h1>
          <p className="text-gray-600">
            This is your dashboard where you can manage your job applications
            and profile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                View Available Jobs
              </button>
              <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                My Applications
              </button>
              <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
                Update Profile
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">No recent activity to show.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
