import React, { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  TextField, 
  Button, 
  Box 
} from '@mui/material';
import { addComment } from '../forum/lib/api';

const CommentSection = ({ comments, postId, onUpdate }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(postId, newComment);
    setNewComment('');
    onUpdate();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment._id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={comment.author.avatar} alt={comment.author.username}>
                {comment.author.username[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.author.username}
              secondary={comment.body}
            />
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ marginBottom: 1 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Post Comment
        </Button>
      </form>
    </Box>
  );
};

export default CommentSection;