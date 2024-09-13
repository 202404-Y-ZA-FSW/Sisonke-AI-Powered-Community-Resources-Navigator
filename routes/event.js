const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');
const { validateEvent, validateId, handleValidationErrors } = require('../validation/event');

// Event Routes

// Create an event with validation
router.post('/events', validateEvent, handleValidationErrors, eventController.createEvent);

// Get all events
router.get('/events', eventController.getAllEvents);

// Get a single event by ID
router.get('/events/:id', validateId, handleValidationErrors, eventController.getEventById);

// Update an event by ID with validation
router.put('/events/:id', validateId, validateEvent, handleValidationErrors, eventController.updateEvent);

// Delete an event by ID
router.delete('/events/:id', validateId, handleValidationErrors, eventController.deleteEvent);

module.exports = router;