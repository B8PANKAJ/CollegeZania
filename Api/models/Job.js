const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    requirements: [
      {
        type: String,
      },
    ],
    experienceRequired: {
      type: Number,
      required: true,
    },
    salaryRangeMin: {
      type: Number,
      required: true,
    },
    salaryRangeMax: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
