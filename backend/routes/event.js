const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');
const { validateEvent, handleValidationErrors } = require('../middleware/validation/eventValidation');

// Event Routes

// Create an event with validation
router.post('/', validateEvent, handleValidationErrors, eventController.createEvent);

// Get all events
router.get('/', eventController.getAllEvents);

// Get latest events
router.get('/latest', eventController.getRecentEvents);

// Get a single event by ID
router.get('/:id', handleValidationErrors, eventController.getEventById);

// Update an event by ID with validation
router.put('/:id', validateEvent, handleValidationErrors, eventController.updateEvent);

// Delete an event by ID
router.delete('/:id', handleValidationErrors, eventController.deleteEvent);

module.exports = router;