const mongoose = require('mongoose');
//const shortid = require('shortid');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true 
  },
  author: {
    type: String,
    ref: 'User', 
    required: true 
  }
}, { timestamps: true }); 
module.exports = mongoose.model('BlogComment', commentSchema);
