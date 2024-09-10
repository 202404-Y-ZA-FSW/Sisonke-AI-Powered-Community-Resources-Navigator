const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        enum: ['Job Fair', 'Health Drive', 'Education', 'Community'],
        required: true
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String
    },
    isFree: {
        type: Boolean,
        default: true
    },
    eventUrl: {
        type: String
    },
    attendeeLimit: {
        type: Number,
        default: 0
    },
    registeredAttendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    media: [{
        fileUrl: String,
        fileType: String
    }],
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    address: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    contactPerson: {
        name: String,
        phone: String,
        email: String
    },
    sponsors: [{
        name: String,
        website: String
    }],
    isFeatured: {
        type: Boolean,
        default: false
    },
    eventType: {
        type: String,
        enum: ['In-person', 'Virtual', 'Hybrid'],
        default: 'In-person'
    },
    cost: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;