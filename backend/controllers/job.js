// REQUIRED PACKAGE
const { validationResult } = require("express-validator");

// JOB MODEL
const jobModel = require("../models/job");

// NEW JOB CONTROLLER
exports.newJob = async (req, res) => {
  // INPUT VALIDATION
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const userID = req.userID;
    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      posted,
      qualifications,
      experience,
      skills,
    } = req.body;

    // CREATE NEW JOB
    const newJob = new jobModel({
      title,
      company,
      location,
      type,
      salary,
      description,
      posted,
      qualifications,
      experience,
      skills,
      user: userID,
    });

    // SAVE JOB
    await newJob.save();

    res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message:
          "An unexpected error has occured while trying to process your request",
      });
  }
};

// GET A SINGLE JOB
exports.getJob = async (req, res) => {
  try {
    const { jobID } = req.params;
    const job = await jobModel.findById(jobID);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({ job });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "An unexpected error has occured while trying to process your request",
      });
  }
};

// GET ALL JOBS CONTROLLER
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find();
    res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "An unexpected error has occured while trying to process your request",
      });
  }
};

// UPDATE JOB CONTROLLER
exports.updateJob = async (req, res) => {
  try {
    const { jobID } = req.params;
    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      posted,
      qualifications,
      experience,
      skills,
    } = req.body;

    // UPDATE JOB
    const updatedJob = await jobModel.findByIdAndUpdate(
      jobID,
      {
        title,
        company,
        location,
        type,
        salary,
        description,
        posted,
        qualifications,
        experience,
        skills,
      },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({ message: "Job updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "An unexpected error has occured while trying to process your request",
      });
  }
};

// DELETE JOB CONTROLLER
exports.deleteJob = async (req, res) => {
  try {
    const { jobID } = req.params;
    const deletedJob = await jobModel.findByIdAndDelete(jobID);
    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "An unexpected error has occured while trying to process your request",
      });
  }
};
