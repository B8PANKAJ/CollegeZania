const College = require("../models/College");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Register a new college
exports.registerCollege = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    collegeName,
    mailId,
    password,
    address,
    coursesAvailable,
    contactNo,
    city,
  } = req.body;

  try {
    const existingCollege = await College.findOne({ mailId });
    if (existingCollege) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const college = new College({
      collegeName,
      mailId,
      password: hashedPassword, // Store hashed password
      address,
      coursesAvailable,
      contactNo,
      city,
    });

    await college.save();
    res.status(201).json({ message: "College registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login a college
exports.loginCollege = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { mailId, password } = req.body;

  try {
    const college = await College.findOne({ mailId });
    if (!college) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, college.password); // Compare password
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: college._id, mailId: college.mailId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getCollegesCount = async (req, res) => {
  try {
    const count = await College.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
