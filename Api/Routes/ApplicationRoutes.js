const express = require('express');
const { applyForJob, getApplicationsByJob } = require('../Controllers/ApplicationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, applyForJob); // Authenticated students can apply
router.get('/:jobId', authMiddleware, getApplicationsByJob); // Employers can view applications for a job

module.exports = router;
