const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authMiddleware = require("../Middlewares/authMiddleware");
const roleMiddleware = require("../Middlewares/roleMiddleware");
const Job = require("../models/Job");
const jobValidation = require("../middlewares/jobValidation");

// IMPORTANT: Order matters - put specific routes before generic ones

// Get employer's jobs (authenticated)
router.get("/employer/jobs", authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized access",
      });
    }

    const jobs = await Job.find({ employerId: req.user.id })
      .select("jobTitle companyName city status applications createdAt")
      .populate({
        path: "applications",
        select: "status",
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      jobs: jobs.map((job) => ({
        _id: job._id,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        city: job.city,
        status: job.status,
        applicationsCount: job.applications?.length || 0,
        createdAt: job.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching employer jobs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch jobs",
    });
  }
});

// Get job applications (authenticated)
router.get(
  "/employer/jobs/:jobId/applications",
  authMiddleware,
  async (req, res) => {
    try {
      const { jobId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid job ID format",
        });
      }

      const job = await Job.findOne({
        _id: jobId,
        employerId: req.user.id,
      }).populate({
        path: "applications",
        populate: {
          path: "applicantId",
          select: "name email contactNo",
        },
      });

      if (!job) {
        return res.status(404).json({
          success: false,
          error: "Job not found",
        });
      }

      res.json({
        success: true,
        applications: job.applications,
      });
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch applications",
      });
    }
  }
);

// Delete job (authenticated)
router.delete(
  "/:jobId",
  [authMiddleware, roleMiddleware(["employer", "admin"])],
  async (req, res) => {
    try {
      const { jobId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid job ID format",
        });
      }

      const job = await Job.findOneAndDelete({
        _id: jobId,
        employerId: req.user.id,
      });

      if (!job) {
        return res.status(404).json({
          success: false,
          error: "Job not found or unauthorized",
        });
      }

      res.json({
        success: true,
        message: "Job deleted successfully",
      });
    } catch (error) {
      console.error("Delete job error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to delete job",
      });
    }
  }
);

// Update job status
router.patch("/:jobId/status", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid job ID format",
      });
    }

    const job = await Job.findOneAndUpdate(
      { _id: jobId, employerId: req.user.id },
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        error: "Job not found",
      });
    }

    res.json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update job status",
    });
  }
});

// Create new job
router.post(
  "/",
  [authMiddleware, roleMiddleware(["employer"]), jobValidation],
  async (req, res) => {
    try {
      const job = new Job({
        ...req.body,
        employerId: req.user.id,
      });
      await job.save();
      res.status(201).json({
        success: true,
        job,
      });
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Get all jobs (public)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({ status: "active" })
      .select("-applications")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch jobs",
    });
  }
});

// Get single job (public)
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).select("-applications");

    if (!job) {
      return res.status(404).json({
        success: false,
        error: "Job not found",
      });
    }

    res.json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch job",
    });
  }
});

module.exports = router;
