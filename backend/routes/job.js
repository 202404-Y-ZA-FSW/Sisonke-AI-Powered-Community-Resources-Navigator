const express = require('express');
const router = express.Router();

// JOB CONTROLLERS
const jobController = require('../controllers/job');

// MIDDLEWARE
const isAuthenticated = require('../middleware/isAuthenticated');

// VALIDATION
const jobValidation = require('../validation/job');

// ROUTES
router.post("new", isAuthenticated, jobValidation, jobController.newJob);
router.get("/all", jobController.getAllJobs);
router.get("/:id", jobController.getJob);
router.put("/:id", isAuthenticated, jobValidation, jobController.updateJob);
router.delete("/:id", isAuthenticated, jobController.deleteJob);

module.exports = router;
