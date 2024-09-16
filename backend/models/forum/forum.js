const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ForumSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ForumComment',
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ForumLike',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});


ForumSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


module.exports = mongoose.model('Forum', ForumSchema);
