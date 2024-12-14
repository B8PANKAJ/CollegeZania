const Blog = require("../models/Blog");

// GET all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// POST create a new blog
exports.createBlog = async (req, res) => {
  const { title, description, content, author, tags } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !description || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const blog = new Blog({
      title,
      description,
      content,
      author,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      image,
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

// DELETE a blog by ID
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};

// GET a single blog by ID
exports.getSingleBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: error.message });
  }
};

// Add this to your existing BlogController.js
exports.getBlogsCount = async (req, res) => {
  try {
    const count = await Blog.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
