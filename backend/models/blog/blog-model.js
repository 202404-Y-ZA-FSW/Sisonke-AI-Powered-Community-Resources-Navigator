const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// BLOG MODEL
const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
    trim: true,
    minlength: [5, "Blog title must be at least 5 characters long"],
  },
  content: {
    type: String,
    required: [true, "Blog content is required"],
    trim: true,
    minlength: [10, "Blog content must be at least 10 characters long"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel = mongoose.model("BlogModel", blogSchema);
module.exports = BlogModel;
