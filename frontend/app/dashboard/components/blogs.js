import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [filter, setFilter] = useState('');

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
      const response = await axios.delete(`http://localhost:5000/blogs/delete`, { data: { blogId:id } });
      if (response.status === 200) {
        setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== id));
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

  const filteredBlogs = blogs.filter(
    (blog) =>
      (blog.title && blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.author && typeof blog.author === 'string' && blog.author.toLowerCase().includes(searchQuery.toLowerCase()))
  ).filter(blog => !filter || blog.category === filter);

  const totalBlogs = blogs.length;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 2 }}>
      {/* Blog Statistics */}
      <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Blog Statistics</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">Total Blogs: {totalBlogs}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Search Blogs */}
      <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Search Blogs</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search by title or author"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              <MenuItem value="Category1">1</MenuItem>
              <MenuItem value="Category2">2</MenuItem>
              <MenuItem value="Category3">3</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Paper>

      {/* Blog Management */}
      <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Blog Management</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table stickyHeader>
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
                      <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
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
                      No blogs found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Snackbar for success or error messages */}
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
    </Box>
  );
}