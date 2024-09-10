const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog', 
    required: true
  },
  type: {
    type: String,
    enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'], 
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Reaction', reactionSchema);