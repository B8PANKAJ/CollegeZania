const Application = require("../models/Application");
const Job = require("../models/Job");

// Apply for a job
exports.applyForJob = async (req, res) => {
  const { jobId, coverLetter } = req.body;

  try {
    // Create a new application using applicantId
    const application = new Application({
      jobId,
      applicantId: req.user.id, // Assuming `req.user` is populated via JWT middleware
      coverLetter,
    });
    await application.save();

    // Add the application to the job's applications array
    await Job.findByIdAndUpdate(jobId, {
      $push: { applications: application._id },
    });

    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error applying for job", error: error.message });
  }
};
// Get all applications for a specific job
exports.getApplicationsByJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: { path: "applicantId", select: "name email" }, // Populate applicant details if needed
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job.applications);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching applications", error: error.message });
  }
};
