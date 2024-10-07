import React, { useState } from "react";
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
import { likePost } from "../forum/lib/api";

const ForumCard = ({ post, onUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    const updatedLikes = await likePost(post._id);
    setLikes(updatedLikes);
    setLiked(!liked);
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
            src={post.author.avatar}
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
          backgroundColor={liked ? "#6c63ff" : "default"}
          aria-label={liked ? "Unlike" : "Like"}
          onClick={handleLike}
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
      {showComments && (
        <CommentSection
          comments={post.comments}
          postId={post._id}
          onUpdate={onUpdate}
        />
      )}
    </Card>
  );
};

export default ForumCard;
