
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], 
    trim: true
  },
  subject: { 
    type: String, 
    trim: true 
  },
  message: { 
    type: String, 
    required: [true, 'Message is required'], 
    minlength: [10, 'Message must be at least 10 characters long'] 
  },
});

module.exports = mongoose.model('Contact', contactSchema);
