import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaAnglesRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading blogs...</p>;
  }

  return (
    <div className="min-h-screen text-black">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">All Blogs</h1>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">{blog.title}</h2>
                <p className="text-sm">
                  {new Date(blog.date).toLocaleDateString()} | By {blog.author}
                </p>
              </div>
              <p className="mb-4">{blog.description}</p>
              <Link
                to={`/blog-detail/${blog._id}`}
                className="flex items-center text-blue-500 hover:text-blue-400"
              >
                <span className="mr-2">Read More</span>
                <FaAnglesRight className="h-5 w-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
