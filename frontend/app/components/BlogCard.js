'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link';

const ReadMoreButton = styled(Button)({
  backgroundColor: '#3f51b5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#283593',
  },
});

export default function BlogCards() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await fetch('http://localhost:5000/blogs/');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts.');
        }
        const data = await response.json();
        
        // Ensure the data is an array before setting state
        const formattedData = Array.isArray(data) ? data : Object.values(data);
        
        setBlogPosts(formattedData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchBlogPosts();
  }, []);
  

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', textAlign: 'center', mt: 5 }}>
      <Grid container spacing={1}>
        {Array.isArray(blogPosts) && blogPosts.length > 0 ? (
          blogPosts.map((card) => (
            <Grid item xs={12} md={4} key={card._id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia component="img" height="160" image={card.image} alt={card.title} />
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {card.readTime}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {card.description}
                  </Typography>
                  <Link href={`/blog/${card._id}`} underline="none">
                    <ReadMoreButton fullWidth>Read More</ReadMoreButton>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No blog posts available.</Typography>
        )}
      </Grid>
      <Link href="/blog" underline="none">
        <Button variant="outlined" sx={{ mt: 4, px: 4 }}>
          Browse All
        </Button>
      </Link>
    </Box>
  );
} 