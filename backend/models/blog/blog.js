const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      minlength: [5, "Blog title must be at least 5 characters long"],
      maxlength: [100, "Blog title cannot be longer than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
      trim: true,
      minlength: [20, "Blog content must be at least 20 characters long"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
          validator: function (v) {
            return v.length > 0 && v.length <= 20;
          },
          message: "Each tag must be between 1 and 20 characters long",
        },
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogComment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogLike",
      },
    ],
  },
  { timestamps: true }
);

blogSchema.path("tags").validate(function (value) {
  const uniqueTags = [...new Set(value)];
  return uniqueTags.length === value.length;
}, "Tags must be unique");

blogSchema.path("likes").validate(function (value) {
  const uniqueLikes = [...new Set(value.map(String))];
  return uniqueLikes.length === value.length;
}, "Likes must be unique");

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
