const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event'); 
const { validateEvent, validateId, handleValidationErrors } = require('../middleware/validation/eventValidation'); 


// Event Routes

// Create an event with validation
router.post('/create', validateEvent, handleValidationErrors, eventController.createEvent);

// Get all events
router.get('/', eventController.getAllEvents);

// Get a single event by ID
router.get('/:id', validateId, handleValidationErrors, eventController.getEventById);


// Update an event by ID with validation
router.put('/update/:id', validateId, validateEvent, handleValidationErrors, eventController.updateEvent);

// Delete an event by ID
router.delete('/delete/:id', validateId, handleValidationErrors, eventController.deleteEvent);

module.exports = router;