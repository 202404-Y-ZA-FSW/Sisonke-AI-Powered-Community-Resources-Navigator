const Joi = require('joi');
const Forum = require('../models/Forum'); 
const Comment = require('../models/Comment'); 
const Like = require('../models/Like'); 

// Define validation schema for forum posts
const forumPostSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    body: Joi.string().min(10).required(),
});

// Create a new forum post with validation
exports.createForumPost = async (req, res) => {
    try {
        // Validate request data
        const { error } = forumPostSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { title, body } = req.body;
        const newPost = new Forum({
            title,
            body,
            author: req.user._id 
        });

        const savedPost = await newPost.save();
        return res.status(201).json({ message: "Forum post created successfully", post: savedPost });
    } catch (err) {
        return res.status(500).json({ error: "Error creating forum post", details: err });
    }
};

// Get all forum posts with pagination and basic query validation
exports.getAllForumPosts = async (req, res) => {
    const schema = Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).default(10)
    });

    const { error, value } = schema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { page, limit } = value;

    try {
        const posts = await Forum.find()
            .populate('author', 'name') 
            .populate('comments') 
            .populate('likes') 
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPosts = await Forum.countDocuments();
        return res.status(200).json({ total: totalPosts, posts });
    } catch (err) {
        return res.status(500).json({ error: "Error fetching forum posts", details: err });
    }
};

// Get a specific forum post by ID with validation
exports.getForumPostById = async (req, res) => {
    const schema = Joi.object({
        id: Joi.string().hex().length(24).required()
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: "Invalid Forum ID" });
    }

    try {
        const post = await Forum.findById(req.params.id)
            .populate('author', 'name')
            .populate('comments')
            .populate('likes');

        if (!post) {
            return res.status(404).json({ error: "Forum post not found" });
        }

        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ error: "Error fetching forum post", details: err });
    }
};

// Update a forum post with validation
exports.updateForumPost = async (req, res) => {
    const { error } = forumPostSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { title, body } = req.body;
        const updatedPost = await Forum.findByIdAndUpdate(
            req.params.id,
            { title, body, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ error: "Forum post not found" });
        }

        return res.status(200).json({ message: "Forum post updated successfully", post: updatedPost });
    } catch (err) {
        return res.status(500).json({ error: "Error updating forum post", details: err });
    }
};

// Delete a forum post with validation
exports.deleteForumPost = async (req, res) => {
    const schema = Joi.object({
        id: Joi.string().hex().length(24).required()
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: "Invalid Forum ID" });
    }

    try {
        const post = await Forum.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Forum post not found" });
        }

        return res.status(200).json({ message: "Forum post deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Error deleting forum post", details: err });
    }
};
