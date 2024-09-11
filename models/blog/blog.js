const mongoose = require('mongoose');
const shortid = require('shortid');
const blogSchema = new mongoose.Schema({
  _id: {
    type: String,
 default: shortid.generate
},
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
  }]
}, { timestamps: true }); 

module.exports = mongoose.model('Blog', blogSchema);
