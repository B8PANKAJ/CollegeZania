const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Register an employee
exports.registerEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: errors.array() });
  }

  const {
    employeeName,
    email,
    password,
    phone,
    linkedinUrl,
    preferredCourses,
    coverLetter,
  } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const employee = new Employee({
      employeeName,
      email,
      password, // Don't hash here, the pre-save hook will handle it
      phone,
      linkedinUrl,
      preferredCourses,
      coverLetter,
      resume: req.file ? req.file.path : null, // File upload handling
    });

    await employee.save();
    res.status(201).json({
      message: "Employee registered successfully",
      employee: {
        id: employee._id,
        employeeName: employee.employeeName,
        email: employee.email,
      },
    });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(400).json({ message: "Email already registered" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login an employee
exports.loginEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: employee._id, email: employee.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({
        message: "Login successful",
        token,
        employee: { id: employee._id, employeeName: employee.employeeName },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
