const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        enum: ['info', 'warning', 'critical'],
        required: true
    },
    Location: {
        type: String

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date
    }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
