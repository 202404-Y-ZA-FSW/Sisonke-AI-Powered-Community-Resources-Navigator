const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    forumPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
        required: true,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});


CommentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


module.exports = mongoose.model('ForumComment', CommentSchema);
