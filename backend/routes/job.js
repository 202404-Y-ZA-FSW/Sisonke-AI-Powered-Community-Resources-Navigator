const express = require('express');
const router = express.Router();

const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require('../controllers/job');
const { jobValidationRules } = require('../validators/job');
const validate = require('../middlewares/validate');

router.post('/jobs', jobValidationRules(), validate, createJob);
router.get('/jobs', getAllJobs);
router.get('/jobs/:id', getJobById);
router.put('/jobs/:id', jobValidationRules(), validate, updateJob);
router.delete('/jobs/:id', deleteJob);

module.exports = router;
