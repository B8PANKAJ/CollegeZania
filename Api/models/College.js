const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  collegeName: { type: String, required: true, trim: true },
  mailId: { type: String, required: true, trim: true, lowercase: true },
  contactNo: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  coursesAvailable: { type: [String], required: true },
  websiteLink: { type: String },
  description: { type: String },
  password: { 
    type: String, 
    required: true, 
    minlength: 6  // Ensure the password has at least 6 characters
  }
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);
