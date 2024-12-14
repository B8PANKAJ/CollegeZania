import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading blog details...</p>;
  }

  if (!blog) {
    return <p className="text-center text-red-500">Blog not found.</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div
        className="bg-cover bg-center h-64 rounded-lg"
        style={{
          height: "450px",
          backgroundImage: `url(${`http://localhost:5000/uploads/${blog.image}`})`,
        }}
        title={blog.title}
      ></div>
      <div className="max-w-2xl mx-auto">
        <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div className="mt-5 text-center">
            <div className="text-xs text-indigo-600 uppercase font-medium hover:text-gray-900 transition duration-500 ease-in-out">
              {blog.category?.map((cat, index) => (
                <span key={index}>
                  {cat}
                  {index < blog.category.length - 1 && ", "}
                </span>
              ))}
            </div>
            <h1 className="text-gray-900 font-bold text-3xl mb-2">
              {blog.title}
            </h1>
            <p className="text-gray-700 text-xs mt-2">
              Written By:{" "}
              <span className="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                {blog.author}
              </span>
            </p>
          </div>
          <div>
            <p className="text-base leading-8 my-5 font-semibold">
              {blog.description}
            </p>
            <p className="text-base leading-8 my-5">{blog.content}</p>
            <div>
              {blog.tags?.map((tag, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                  #{tag}
                  {index < blog.tags.length - 1 && ", "}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
