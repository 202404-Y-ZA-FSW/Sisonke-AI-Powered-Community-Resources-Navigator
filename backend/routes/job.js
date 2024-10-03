const express = require('express');
const router = express.Router();

// JOB CONTROLLERS
const jobController = require('../controllers/job');


// VALIDATION
const jobValidation = require('../middleware/validation/jobValidation');

// ROUTES
router.post("/new", jobValidation, jobController.newJob);
router.get("/all", jobController.getAllJobs);
router.get("/:id", jobController.getJob);
router.put("/:id", jobValidation, jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

module.exports = router;
