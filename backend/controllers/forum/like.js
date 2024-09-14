const Like = require('../../models/forum/like')

exports.addLike = async (req, res) => {
    try {
        const forumPost = await Forum.findById(req.params.postId);

        if (!forumPost) {
            return res.status(404).json({ error: "Forum post not found" });
        }

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({
            user: req.user._id,
            forumPost: req.params.postId
        });

        if (existingLike) {
            return res.status(400).json({ error: "User already liked this post" });
        }

        const newLike = new Like({
            user: req.user._id,
            forumPost: forumPost._id
        });

        const savedLike = await newLike.save();

        // Add the like to the forum post's likes array
        forumPost.likes.push(savedLike._id);
        await forumPost.save();

        return res.status(201).json({ message: "Post liked successfully", like: savedLike });
    } catch (err) {
        return res.status(500).json({ error: "Error liking post", details: err });
    }
};

// Remove a like from a forum post
exports.removeLike = async (req, res) => {
    try {
        const forumPost = await Forum.findById(req.params.postId);

        if (!forumPost) {
            return res.status(404).json({ error: "Forum post not found" });
        }

        // Find and delete the like
        const like = await Like.findOneAndDelete({
            user: req.user._id,
            forumPost: req.params.postId
        });

        if (!like) {
            return res.status(404).json({ error: "Like not found" });
        }

        // Remove the like from the forum post's likes array
        forumPost.likes.pull(like._id);
        await forumPost.save();

        return res.status(200).json({ message: "Like removed successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Error removing like", details: err });
    }
};