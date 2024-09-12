const express = require('express');
const router = express.Router();
const { 
    createAlert, 
    getAllAlerts, 
    getAlertById, 
    updateAlert, 
    deleteAlert 
} = require('../controllers/alert');

const { validateAlert, handleValidationErrors } = require('../middleware/validation/alertValidation');

router.post('/', validateAlert, handleValidationErrors, createAlert);
router.get('/', getAllAlerts);
router.get('/:id', getAlertById);
router.put('/:id', validateAlert, handleValidationErrors, updateAlert);
router.delete('/:id', deleteAlert);

module.exports = router;
