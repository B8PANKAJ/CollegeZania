const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    companyName: { type: String, required: true, trim: true },
    personName: { type: String, required: true, trim: true },
    contactNo: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Validate 10-digit phone number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    mailId: { 
        type: String, 
        required: true, 
        trim: true, 
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validate email format
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    gstNo: { 
        type: String, 
        required: true, 
        trim: true, 
        validate: {
            // Example validation for Indian GST Number format: 15 alphanumeric characters
            validator: function(v) {
                return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A]{1}$/.test(v); 
            },
            message: props => `${props.value} is not a valid GST number!`
        }
    },
    panNo: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

module.exports = mongoose.model('Employer', employerSchema);
