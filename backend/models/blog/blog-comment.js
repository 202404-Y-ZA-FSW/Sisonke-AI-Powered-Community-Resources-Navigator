const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// BLOG COMMENT MODEL
const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true 
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CommentModel = mongoose.model('Comment', commentSchema);
module.exports = CommentModel;