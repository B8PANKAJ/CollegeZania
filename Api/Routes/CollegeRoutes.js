const express = require("express");
const {
  registerCollege,
  loginCollege,
  getCollegesCount,
} = require("../Controllers/CollegeController");
const collegeValidationRules = require("../middlewares/collegeValidation");

const router = express.Router();

// Apply validation middleware for both register and login
router.post("/register", collegeValidationRules, registerCollege);
router.post("/login", collegeValidationRules, loginCollege);
router.get("/count", getCollegesCount);

module.exports = router;
