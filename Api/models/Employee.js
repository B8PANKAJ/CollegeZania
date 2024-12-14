const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
    employeeName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  linkedinUrl: { type: String },
  preferredCourses: { type: [String], required: true },
  coverLetter: { type: String, maxlength: 200 },
  resume: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Employee', employeeSchema);
