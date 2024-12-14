const Employer = require("../models/Employer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Job = require("../models/Job");

// Register a new employer
exports.registerEmployer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    companyName,
    personName,
    contactNo,
    mailId,
    gstNo,
    panNo,
    city,
    address,
    password,
  } = req.body;

  try {
    const existingEmployer = await Employer.findOne({ mailId });
    if (existingEmployer) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employer = new Employer({
      companyName,
      personName,
      contactNo,
      mailId,
      gstNo,
      panNo,
      city,
      address,
      password: hashedPassword,
    });

    await employer.save();
    res.status(201).json({ message: "Employer registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login an employer
exports.loginEmployer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { mailId, password } = req.body;

  try {
    const employer = await Employer.findOne({ mailId });
    if (!employer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, employer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: employer._id,
        role: "employer",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      employer: {
        _id: employer._id,
        name: employer.name,
        email: employer.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs posted by the employer and their applications
exports.getEmployerJobsWithApplications = async (req, res) => {
  try {
    const employerId = req.user.id; // Log the ID
    console.log("Employer ID:", employerId);

    if (!employerId) {
      return res.status(400).json({ error: "Employer ID is missing" });
    }

    const jobs = await Job.find({ employer: employerId })
      .populate({
        path: "applications",
        populate: { path: "applicantId", select: "name email" },
      })
      .exec();

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for this employer" });
    }

    res.status(200).json({
      message: "Jobs and applications retrieved successfully",
      jobs,
    });
  } catch (error) {
    console.error("Error in getEmployerJobsWithApplications:", error);
    res.status(500).json({
      message: "Error fetching jobs and applications",
      error: error.message,
    });
  }
};
