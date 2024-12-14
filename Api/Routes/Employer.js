const express = require("express");
const { check } = require("express-validator");
const employerController = require("../Controllers/EmployerController");
const authMiddleware = require("../Middlewares/authMiddleware");

const router = express.Router();

// Register route
router.post(
  "/register",
  [
    check("mailId").isEmail().withMessage("Please include a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  employerController.registerEmployer
);

// Login route
router.post(
  "/login",
  [
    check("mailId").isEmail().withMessage("Please include a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  employerController.loginEmployer
);

// Route to get jobs and applications for the logged-in employer
router.get(
  "/jobs",
  authMiddleware,
  employerController.getEmployerJobsWithApplications
);

module.exports = router;
