const Job = require("../models/Job");
const mongoose = require("mongoose");

// Get single job data
exports.getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    // Fetch job data by ID
    const job = await Job.findById(id).populate("employerId", "name email"); // Adjust fields as needed

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching job data", error: error.message });
  }
};

// Post a new job
exports.postJob = async (req, res) => {
  const {
    companyName,
    jobTitle,
    experienceRequired,
    salaryRangeMin,
    salaryRangeMax,
    city,
  } = req.body;

  try {
    // Create a new job using the request data
    const job = new Job({
      companyName,
      jobTitle,
      experienceRequired,
      salaryRangeMin,
      salaryRangeMax,
      city,
      employerId: req.user.id, // Use the employer ID from req.user (set by the auth middleware)
    });

    // Save the job to the database
    await job.save();

    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error posting job", error: error.message });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting job", error: error.message });
  }
};

// Add this to your existing JobController.js
exports.getJobsCount = async (req, res) => {
  try {
    const count = await Job.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
