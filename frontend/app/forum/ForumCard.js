"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { ThumbUp, Comment } from "@mui/icons-material";
import CommentSection from "./CommentSection";
import { likePost, getLikes } from "./utils/utils";

const ForumCard = ({ post, onUpdate, userId }) => {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesData = await getLikes(post._id);
        setLikes(likesData.count || 0);
        setLiked(Array.isArray(likesData.users) && likesData.users.includes(userId));
      } catch (err) {
        console.error("Error fetching likes:", err);
        setError("Failed to fetch likes");
      }
    };

    fetchLikes();
  }, [post._id, userId]);

  const handleLike = async () => {
    try {
      const updatedLikes = await likePost(post._id, userId);

      if (typeof updatedLikes === 'object' && updatedLikes !== null) {
        setLikes(updatedLikes.count || 0);
        setLiked(Array.isArray(updatedLikes.likes.user) && updatedLikes.user.includes(userId));
      } else {
        throw new Error("Invalid response from server");
      }

      onUpdate();
    } catch (err) {
      console.error("Error liking post:", err);
      setError("Failed to like post");
    }
  };

  return (
    <Card
      sx={{
        marginBottom: 2,
        background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
        boxShadow: "none",
        borderRadius: "16px",
        "&:hover": {
          transform: "scale(1.02)",
          transition: "all 0.3s",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ backgroundColor: "#6c63ff" }}
            alt={post.author.username}
          >
            {post.author.username[0]}
          </Avatar>
        }
        title={post.title}
        subheader={`Posted by ${post.author.username} on ${new Date(
          post.createdAt
        ).toLocaleDateString()}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label={liked ? "Unlike" : "Like"}
          onClick={handleLike}
          color={liked ? "primary" : "default"}
        >
          <ThumbUp />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {likes}
        </Typography>
        <Button
          startIcon={<Comment sx={{ fontSize: "9px" }} />}
          onClick={() => setShowComments(!showComments)}
          sx={{
            marginLeft: "auto",
            backgroundColor: "#ffffff",
            border: "1px solid #6c63ff",
            color: "#6c63ff",
            borderRadius: "16px",
            textTransform: "none",
          }}
        >
          {post.comments.length} Comments
        </Button>
      </CardActions>
      {error && (
        <Typography variant="body2" color="error" sx={{ padding: 2 }}>
          {error}
        </Typography>
      )}
      {showComments && (
        <CommentSection
          comments={post.comments}
          postId={post._id}
          onUpdate={onUpdate}
          forumId={post._id}
        />
      )}
    </Card>
  );
};

export default ForumCard;
