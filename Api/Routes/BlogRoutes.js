const express = require("express");
const router = express.Router();
const BlogController = require("../Controllers/BlogController"); // Adjust the path if needed
const upload = require("../Middlewares/multer"); // Import the upload middleware

// Define routes
router.get("/blogs", BlogController.getAllBlogs);
router.post("/blogs", upload.single("image"), BlogController.createBlog);
router.delete("/blogs/:id", BlogController.deleteBlog);
router.get("/blogs/:id", BlogController.getSingleBlog);
router.get("/count", BlogController.getBlogsCount);
module.exports = router;
