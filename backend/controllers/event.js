const Event = require('../models/Event');

// Create a new event
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, organizer, category } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            organizer,
            category
        });

        const savedEvent = await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: savedEvent });
    } catch (err) {
        res.status(500).json({ error: 'Error creating event', message: err.message });
    }
};

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching events', message: err.message });
    }
};

// Get a single event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching event', message: err.message });
    }
};

// Update an event by ID
const updateEvent = async (req, res) => {
    try {
        const { title, description, date, location, organizer, category } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, date, location, organizer, category },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (err) {
        res.status(500).json({ error: 'Error updating event', message: err.message });
    }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);

        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting event', message: err.message });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};