const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');


// JOB CONTROLLERS
const jobController = require('../controllers/job');


// VALIDATION
const jobValidation = require('../middleware/validation/jobValidation');

// ROUTES
router.post("/new", jobValidation,isAuthenticated, jobController.newJob);
router.get("/all", jobController.getAllJobs);
router.get("/:id", jobController.getJob);
router.put("/:id", jobValidation, jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

module.exports = router;
