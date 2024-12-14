import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBlog, FaUniversity, FaBriefcase, FaUsers } from "react-icons/fa";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    colleges: 0,
    jobs: 0,
    users: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogs, colleges, jobs, users] = await Promise.all([
        axios.get("http://localhost:5000/api/blogs/count"),
        axios.get("http://localhost:5000/api/college/count"),
        axios.get("http://localhost:5000/api/jobs/count"),
        axios.get("http://localhost:5000/api/admin/users/count"),
      ]);

      setStats({
        blogs: blogs.data.count,
        colleges: colleges.data.count,
        jobs: jobs.data.count,
        users: users.data.count,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const dashboardItems = [
    {
      title: "Manage Blogs",
      count: stats.blogs,
      link: "/admin/blogs",
      icon: FaBlog,
      color: "blue",
    },
    {
      title: "Manage Colleges",
      count: stats.colleges,
      link: "/admin/colleges",
      icon: FaUniversity,
      color: "green",
    },
    {
      title: "Manage Jobs",
      count: stats.jobs,
      link: "/admin/jobs",
      icon: FaBriefcase,
      color: "purple",
    },
    {
      title: "Manage Users",
      count: stats.users,
      link: "/admin/users",
      icon: FaUsers,
      color: "red",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, Admin
          </h1>
          <p className="text-gray-600">Manage your platform from one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardItems.map((item) => (
            <DashboardCard key={item.title} {...item} />
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionButton
              title="Create New Blog"
              link="/blog-post"
              bgColor="bg-blue-500"
            />
            <QuickActionButton
              title="Review Applications"
              link="/admin/applications"
              bgColor="bg-green-500"
            />
            <QuickActionButton
              title="View Reports"
              link="/admin/reports"
              bgColor="bg-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, count, link, icon: Icon, color }) => {
  const colorClasses = {
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
    red: "text-red-500",
  };

  return (
    <Link
      to={link}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-full ${colorClasses[color]} bg-opacity-10`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>{count}</p>
    </Link>
  );
};

const QuickActionButton = ({ title, link, bgColor }) => {
  return (
    <Link
      to={link}
      className={`${bgColor} hover:opacity-90 text-white p-4 rounded-lg shadow-md transition-opacity duration-200`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
    </Link>
  );
};

export default AdminDashboard;
