const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LikeSchema = new Schema({
    forumPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model('ForumLike', LikeSchema);
