const mongoose = require('mongoose');

const jobListingsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship'],
    required: true,
  },
  salary: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  qualifications: {
    type: [String],
  },
  experienceLevel: {
    type: String,
    enum: ['entry-level', 'mid-level', 'senior-level'],
  },
  education: {
    type: [String],
  },
  companySize: {
    type: String,
    enum: ['small', 'medium', 'large'],
  },
  requiredSkills: {
    type: [String],
  },
  applicationStatus: {
    type: String,
    enum: ['applied', 'in review', 'interview', 'offered', 'rejected'],
    default: 'applied',
  },
  matchedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  savedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  }],
}, {
  timestamps: true,
});

const JobListings = mongoose.model('JobListings', jobListingsSchema);

module.exports = JobListings;
