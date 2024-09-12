const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NotificationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    title: {
        type: String,
        required: true, 
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['job', 'event', 'forum', 'general'], 
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false, 
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    updatedAt: {
        type: Date,
        default: Date.now, 
    }
});


NotificationSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


module.exports = mongoose.model('Notification', NotificationSchema);
