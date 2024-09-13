const JobListings = require('../models/job.js');

// Create a new job listing
const createJob = async (req, res) => {
  try {
    const job = new JobListings(req.body); // Receives validated data from middleware
    const savedJob = await job.save();
    res.status(201).json({ message: 'Job created successfully', job: savedJob });
  } catch (err) {
    console.error('Error creating job:', err.message);
    res.status(500).json({ error: 'Error creating job', message: err.message });
  }
};

// Get all job listings
const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobListings.find(); 
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err.message);
    res.status(500).json({ error: 'Error fetching jobs', message: err.message });
  }
};

// Get a job listing by ID
const getJobById = async (req, res) => {
  try {
    const job = await JobListings.findById(req.params.id); 
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (err) {
    console.error('Error fetching job:', err.message);
    res.status(500).json({ error: 'Error fetching job', message: err.message });
  }
};

// Update a job listing
const updateJob = async (req, res) => {
  try {
    const updatedJob = await JobListings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Ensures that the updated job is returned and validators are run
    );

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
  } catch (err) {
    console.error('Error updating job:', err.message);
    res.status(500).json({ error: 'Error updating job', message: err.message });
  }
};

// Delete a job listing
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await JobListings.findByIdAndDelete(req.params.id); // Delete job by ID
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Error deleting job:', err.message);
    res.status(500).json({ error: 'Error deleting job', message: err.message });
  }
};

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };
