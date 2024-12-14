const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const { registerEmployee, loginEmployee } = require('../Controllers/EmployeeController');

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only PDF or Word documents are allowed.'));
    }
    cb(null, true);
  },
});

const router = express.Router();

// Register route
router.post(
  '/register',
  upload.single('resume'),
  [
    body('employeeName').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .matches(/\d/).withMessage('Password must contain a number')
      .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter'),
    body('phone').matches(/^\d{10}$/).withMessage('Phone number must be 10 digits'),
  ],
  registerEmployee
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginEmployee
);

module.exports = router;
