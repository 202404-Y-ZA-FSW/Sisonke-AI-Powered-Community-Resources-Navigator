const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog', 
    required: true
  }
}, { timestamps: true });

const BlogLike = mongoose.model('Like', likeSchema);
module.exports = BlogLike;