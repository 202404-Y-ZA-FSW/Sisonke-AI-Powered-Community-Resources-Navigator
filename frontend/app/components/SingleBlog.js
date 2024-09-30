'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/navigation';

async function getBlogPost(id) {
  const res = await fetch(`http://localhost:5000/blogs/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blog post');
  }

  return res.json();
}

export default async function BlogPostPage({ params }) {
  const { id } = params || {};
  const router = useRouter();

  if (!id) {
    return (
      <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 5, textAlign: 'center' }}>
        <Typography variant="h5">Blog post not found.</Typography>
        <Typography variant="body1">
          The blog post you are looking for does not exist.
        </Typography>
      </Box>
    );
  }

  try {
    const blogPost = await getBlogPost(id);

    return (
      <Box component="main" sx={{ maxWidth: '800px', mx: 'auto', mt: 5, px: 2 }}>
        <Card elevation={3}>
          <Box sx={{ position: 'relative', width: '100%', height: 300 }}>
            <Image
              src={blogPost.image || '/placeholder.svg'}
              alt={blogPost.title}
              layout="fill"
              objectFit="cover"
            />
          </Box>
          <CardContent>
            <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
              {blogPost.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {blogPost.readTime || 'No read time available'}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {blogPost.description || blogPost.content}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  } catch (error) {
    router.push('/404');
    return null;
  }
}
