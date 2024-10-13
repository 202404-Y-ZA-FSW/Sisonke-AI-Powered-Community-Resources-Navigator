"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Snackbar,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs/all");
      if (response.status === 200) {
        setBlogs(response.data);
      } else {
        setError("Failed to fetch blogs.");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Error fetching blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removeBlog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
        setSnackbarMessage('Blog deleted successfully');
        setSnackbarOpen(true);
      } else {
        setError('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError('Error deleting blog. Please try again.');
    }
  };

  const filteredBlogs = (blogs || []).filter(
    (blog) =>
      (blog.title && blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.author && blog.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalBlogs = (blogs || []).length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ mb: 4, textAlign: 'center' }}>
        <CardHeader title="Blog Statistics" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Total Blogs: {totalBlogs}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, textAlign: 'center' }}>
        <CardHeader title="Search Blogs" />
        <CardContent>
          <InputBase
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              mb: 2,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, textAlign: 'center' }}>
        <CardHeader title="Blog Management" />
        <CardContent>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100px">
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Author</strong></TableCell>
                    <TableCell><strong>Date Published</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                      <TableRow key={blog._id}>
                        <TableCell>{blog.title}</TableCell>
                        <TableCell>{blog.author?.username || blog.author}</TableCell>
                        <TableCell>{new Date(blog.publishedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            startIcon={<DeleteIcon />}
                            onClick={() => removeBlog(blog._id)}
                            color="error"
                            variant="contained"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No blogs found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        message={error}
      />
    </Container>
  );
}
