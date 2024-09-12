const mongoose = require('mongoose');

// Defining the schema for job listings
const jobListingsSchema = new mongoose.Schema({
  // Job title
  title: {
    type: String,
    required: true,
  },
  // Company name
  company: {
    type: String,
    required: true,
  },
  // Location of the job
  location: {
    type: String,
    required: true,
  },
  // Type of job 
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship', 'learnership'],
    required: true,
  },
  // Salary for the job
  salary: {
    type: Number,
  },
  // Description of the job
  description: {
    type: String,
    required: true,
  },
  // Date when the job was posted
  datePosted: {
    type: Date,
    default: Date.now,
  },
  // Qualifications required for the job
  qualifications: {
    type: [String],
  },
  // Experience level required
  experienceLevel: {
    type: String,
    enum: ['entry-level', 'mid-level', 'senior-level'],
  },
  // Education requirements for the job
  education: {
    type: [String],
  },
  // Required skills for the job
  requiredSkills: {
    type: [String],
  },
  // Link to the job application page or further details
  link: {
    type: String,
    validate: {
      validator: function(v) {
        // Simple URL validation
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: 'Invalid URL'
    },
  },
  // Users who are matched with this job
  matchedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  }],
  // Users who have saved this job listing
  savedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  }],
}, {
  // Include timestamps for creation and last update
  timestamps: true,
});

const JobListings = mongoose.model('JobListings', jobListingsSchema);

module.exports = JobListings;
