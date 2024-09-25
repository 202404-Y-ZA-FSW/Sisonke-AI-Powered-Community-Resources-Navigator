import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Avatar, 
  IconButton, 
  Typography, 
  Button 
} from '@mui/material';
import { ThumbUp, Comment } from '@mui/icons-material';
import CommentSection from './CommentSection';
import { likePost } from '../lib/api';

const ForumCard = ({ post, onUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = async () => {
    const updatedLikes = await likePost(post._id);
    setLikes(updatedLikes);
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardHeader
        avatar={
          <Avatar src={post.author.avatar} alt={post.author.username}>
            {post.author.username[0]}
          </Avatar>
        }
        title={post.title}
        subheader={`Posted by ${post.author.username} on ${new Date(post.createdAt).toLocaleDateString()}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={handleLike}>
          <ThumbUp />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {likes}
        </Typography>
        <Button 
          startIcon={<Comment />} 
          onClick={() => setShowComments(!showComments)}
          sx={{ marginLeft: 'auto' }}
        >
          {post.comments.length} Comments
        </Button>
      </CardActions>
      {showComments && <CommentSection comments={post.comments} postId={post._id} onUpdate={onUpdate} />}
    </Card>
  );
};

export default ForumCard;