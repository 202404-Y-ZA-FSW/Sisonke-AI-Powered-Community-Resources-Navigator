const Forum = require('../../models/forum/forum');


// Create a new forum post with validation
exports.createForumPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const newPost = new Forum({
            title,
            body,
            author: req.user._id // Assuming req.user contains the logged-in user info
        });

        const savedPost = await newPost.save();
        return res.status(201).json({ message: "Forum post created successfully", post: savedPost });
    } catch (err) {
        return res.status(500).json({ error: "Error creating forum post", details: err });
    }
};

// Get all forum posts with pagination
exports.getAllForumPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const posts = await Forum.find()
            .populate('author', 'name') // Populate the author's name
            .populate('comments') // Populate comments
            .populate('likes') // Populate likes
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalPosts = await Forum.countDocuments();
        return res.status(200).json({ total: totalPosts, posts });
    } catch (err) {
        return res.status(500).json({ error: "Error fetching forum posts", details: err });
    }
};

// Get a specific forum post by ID with validation
exports.getForumPostById = async (req, res) => {
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