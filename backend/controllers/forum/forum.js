const Forum = require('../../models/forum/forum');
const ForumComment = require('../../models/forum/comment');
const ForumLike = require('../../models/forum/like');
const { validationResult } = require('express-validator');

// Create a new forum post
const createForum = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, body, author } = req.body;
        const newForum = new Forum({ title, body, author });

        await newForum.save();
        res.status(201).json({ message: 'Forum post created successfully', forum: newForum });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all forum posts
const getAllForums = async (req, res) => {
    try {
        const forums = await Forum.find().populate('author', 'username').populate('comments').populate('likes');
        res.status(200).json(forums);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific forum post by ID
const getForumById = async (req, res) => {
    try {
        const { forumId } = req.params;
        const forum = await Forum.findById(forumId)
            .populate('author', 'username')
            .populate({
                path: 'comments',
                populate: { path: 'author', select: 'username' }
            })
            .populate('likes');

        if (!forum) return res.status(404).json({ message: 'Forum post not found' });

        res.status(200).json(forum);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a forum post
const updateForum = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { forumId } = req.params;
        const { title, body } = req.body;

        const updatedForum = await Forum.findByIdAndUpdate(
            forumId,
            { title, body, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedForum) return res.status(404).json({ message: 'Forum post not found' });

        res.status(200).json(updatedForum);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a forum post
const deleteForum = async (req, res) => {
    try {
        const { forumId } = req.params;
        const forum = await Forum.findByIdAndDelete(forumId);

        if (!forum) return res.status(404).json({ message: 'Forum post not found' });

        // Optionally, delete associated comments and likes
        await ForumComment.deleteMany({ forumPost: forumId });
        await ForumLike.deleteMany({ forumPost: forumId });

        res.status(200).json({ message: 'Forum post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a comment on a forum post
const createComment = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { forumId } = req.params;
        const { body, author } = req.body;

        const newComment = new ForumComment({
            forumPost: forumId,
            body,
            author
        });

        await newComment.save();

        // Add the comment to the forum post
        await Forum.findByIdAndUpdate(forumId, {
            $push: { comments: newComment._id }
        });

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all comments for a specific forum post
const getCommentsByForumPost = async (req, res) => {
    try {
        const { forumId } = req.params;
        const comments = await ForumComment.find({ forumPost: forumId })
            .populate('author', 'username');
        
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a comment
const updateComment = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { commentId } = req.params;
        const { body } = req.body;

        const updatedComment = await ForumComment.findByIdAndUpdate(
            commentId,
            { body, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const deletedComment = await ForumComment.findByIdAndDelete(commentId);
        if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });

        // Optionally, remove the comment from the forum post
        await Forum.findByIdAndUpdate(deletedComment.forumPost, {
            $pull: { comments: commentId }
        });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Like a forum post
const likeForumPost = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { forumId } = req.params;
        const { userId } = req.body;

        const existingLike = await ForumLike.findOne({ forumPost: forumId, user: userId });
        if (existingLike) return res.status(400).json({ message: 'User already liked this post' });

        const newLike = new ForumLike({
            forumPost: forumId,
            user: userId
        });

        await newLike.save();

        // Add the like to the forum post
        await Forum.findByIdAndUpdate(forumId, {
            $push: { likes: newLike._id }
        });

        res.status(201).json({ message: 'Post liked successfully', like: newLike });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Unlike a forum post
const unlikeForumPost = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { forumId } = req.params;
        const { userId } = req.body;

        const existingLike = await ForumLike.findOneAndDelete({ forumPost: forumId, user: userId });
        if (!existingLike) return res.status(404).json({ message: 'Like not found' });

        // Remove the like from the forum post
        await Forum.findByIdAndUpdate(forumId, {
            $pull: { likes: existingLike._id }
        });

        res.status(200).json({ message: 'Post unliked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all likes for a specific forum post
const getLikesByForumPost = async (req, res) => {
    try {
        const { forumId } = req.params;
        const likes = await ForumLike.find({ forumPost: forumId }).populate('user', 'username');
        
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createForum,
    getAllForums,
    getForumById,
    updateForum,
    deleteForum,
    createComment,
    getCommentsByForumPost,
    updateComment,
    deleteComment,
    likeForumPost,
    unlikeForumPost,
    getLikesByForumPost
};