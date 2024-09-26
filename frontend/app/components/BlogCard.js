"use client";

import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import axios from 'axios';

// Component to display individual blog details
const BlogCardDetails = ({ title, content, author, timePosted }) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 4, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', border: '1px solid #ddd' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary">
            By {author}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {timePosted}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content ? content.substring(0, 100) : 'No content available'}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

// Main component to display blog cards and dynamic fetching
const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);  // Capture API error

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blogs');
        const data = Array.isArray(response.data) ? response.data : Object.values(response.data); // Ensure it's an array
        setBlogs(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return <Typography>No blog posts available.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        Latest Blog Posts
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {blogs.map((blog, index) => (
          <Grid item xs={6} sm={3} md={4} key={index}>
            <BlogCardDetails 
              title={blog.title} 
              content={blog.content} 
              author={blog.author} 
              timePosted={new Date(blog.createdAt).toLocaleDateString()}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogPosts;
