const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const { registerStudent, loginStudent } = require('../Controllers/StudentController');

// Route to register a student
router.post(
  '/register',
  [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  registerStudent
);

// Route to login a student
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginStudent
);

module.exports = router;
