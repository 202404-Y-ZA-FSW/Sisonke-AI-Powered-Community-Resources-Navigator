const mongoose = require('mongoose');
//const shortid = require('shortid');

const blogSchema = new mongoose.Schema({
 
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }]
}, { timestamps: true }); 

module.exports = mongoose.model('Blog', blogSchema);
