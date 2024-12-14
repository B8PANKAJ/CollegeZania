const { check } = require('express-validator');

const collegeValidationRules = [
  check('mailId', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

module.exports = collegeValidationRules;
