// REQUIRED MODELS AND PACKAGES
const Blog = require("../../models/blog/blog-model");
const { validationResult } = require("express-validator");
const textToSpeech = require("@google-cloud/text-to-speech");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const util = require("util");

// CREATE A NEW BLOG POST
exports.newBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, author, imageURI, readTime } = req.body;

    if (!title || !content || !author || !imageURI || !readTime) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    if (typeof content !== "string") {
      return res.status(400).json({ message: "Content must be a string" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!author) {
      return res.status(400).json({ message: "Author is required" });
    }
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    if (!imageURI) {
      return res.status(400).json({ message: "Tags are required" });
    }
    if (!readTime) {
      return res.status(400).json({ message: "Read time is required" });
    }

    const newBlog = new Blog({ title, content, author, imageURI, readTime });
    const savedBlog = await newBlog.save();
    res
      .status(201)
      .json({ message: "Your blog has been created successfully", savedBlog });
  } catch (error) {
    console.error("Error in creating a new comment", error);
    res
      .status(500)
      .json({ message: "An error while trying to create a new blog", error });
  }
};

// GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username")
      .populate("comments")
      .populate("likes");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error while trying to get all blogs", error });
  }
};

// GET A SINGLE BLOG
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
      })
      .populate("likes");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error while trying to get a blog", error });
  }
};

// UPDATE A BLOG POST
exports.updateBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { blogId } = req.params;
    const { title, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error while trying to update a blog", error });
  }
};

// DELETE A BLOG POST
exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error while trying to delete a blog", error });
  }
};
