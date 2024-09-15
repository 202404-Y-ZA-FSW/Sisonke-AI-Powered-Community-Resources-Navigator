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
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship'],
    required: true,
  },
  salary: {
    type: Number,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  posted: {
    type: Date,
    default: Date.now,
  },
  qualifications: {
    type: [String],
    validate: {
      validator: v => Array.isArray(v) && v.length <= 10,
      message: 'Cannot have more than 10 qualifications',
    },
  },
  experience: {
    type: String,
    enum: {
      values: ['entry-level', 'mid-level', 'senior-level'],
      message: '{VALUE} is not a valid experience level',
    },
  },
  skills: {
    type: [String],
    validate: {
      validator: v => Array.isArray(v) && v.length <= 10,
      message: 'Cannot have more than 10 skills',
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 30*24*60*60*1000,
  },
}, {
  timestamps: true,
});

jobListingsSchema.index({ company: 1, location: 1 });

const JobListings = mongoose.model('JobListings', jobListingsSchema);

module.exports = JobListings;

