'use client';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, Snackbar, Alert } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { useAuthentication } from '@/app/hooks/useAuthentication';

const BlogForm = () => {
  const router = useRouter();

  const { user } = useAuthentication();
  const userID = user ? user.user.id : null;

  const [formData, setFormData] = useState({
    imageURI: '',
    title: '',
    author: userID,
    content: '',
    readTime: ''
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.imageURI) errors.imageURI = 'Image URI is required';
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.content) errors.content = 'Content is required';
    if (!formData.readTime) errors.readTime = 'Read time is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const response = await axios.post('http://localhost:5000/blogs/blog/new', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: 'Blog post created successfully!',
          severity: 'success'
        });
        setTimeout(() => {
          router.push('/blog');
        }, 2000);
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to create the blog post.',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error submitting blog post:', error);
      setSnackbar({
        open: true,
        message: 'An error occurred while submitting the blog post.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, bgcolor: '#f5f5f5', p: 3, borderRadius: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Create a New Blog Post
      </Typography>

      <TextField
        name="imageURI"
        placeholder="Image URI"
        variant="outlined"
        fullWidth
        value={formData.imageURI}
        onChange={handleChange}
        error={!!errors.imageURI}
        helperText={errors.imageURI}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ImageIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        name="title"
        label="Blog Title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        sx={{ mb: 2 }}
      />

      <TextField
        name="readTime"
        label="Read Time"
        placeholder="e.g., 5 min"
        variant="outlined"
        fullWidth
        value={formData.readTime}
        onChange={handleChange}
        error={!!errors.readTime}
        helperText={errors.readTime}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTimeIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        name="content"
        label="Blog Content"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        value={formData.content}
        onChange={handleChange}
        error={!!errors.content}
        helperText={errors.content}
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit Blog Post
      </Button>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BlogForm;
