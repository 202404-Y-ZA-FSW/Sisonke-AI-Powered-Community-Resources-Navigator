import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CreatePostForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Content"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        margin="normal"
        required
        multiline
        rows={4}
      />
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
          Create Post
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePostForm;