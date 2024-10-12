const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  }
}, { timestamps: true }); 
const commentModel = mongoose.model('BlogComment', commentSchema);
module.exports = commentModel;
