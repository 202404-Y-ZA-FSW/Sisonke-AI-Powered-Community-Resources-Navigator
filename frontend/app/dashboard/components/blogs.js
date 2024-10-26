import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Paper, 
  Typography, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Grid,
  Box,
  CircularProgress,
  Snackbar,
  IconButton,
  Tooltip,
  useTheme,
  Card,
  CardContent,
  Fade,
  Zoom,
  TableSortLabel,
  Pagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import BookIcon from '@mui/icons-material/Book';
import { styled, keyframes } from '@mui/material/styles';

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.5); }
  50% { box-shadow: 0 0 25px rgba(99, 102, 241, 0.8); }
  100% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.5); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const ColoredPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: '20px',
  '&:hover': {
    transform: 'translateY(-5px) scale(1.01)',
    boxShadow: `0 15px 25px rgba(0, 0, 0, 0.3)`,
    animation: `${pulseAnimation} 3s infinite`,
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
  },
}));

const AnimatedIcon = styled('div')({
  animation: `${floatAnimation} 3s ease-in-out infinite`,
});

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('');
  const blogsPerPage = 10;
  const theme = useTheme();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/blogs/all");
      if (response.status === 200) {
        setBlogs(response.data);
      } else {
        showSnackbar("Failed to fetch blogs.");
      }
    } catch (err) {
      showSnackbar("Error fetching blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removeBlog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/blogs/delete`, { data: { blogId:id } });
      if (response.status === 200) {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
        showSnackbar("Blog deleted successfully.");
      } else {
        showSnackbar('Failed to delete blog');
      }
    } catch (error) {
      showSnackbar('Error deleting blog. Please try again.');
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedBlogs = React.useMemo(() => {
    let sortableBlogs = [...blogs];
    if (sortConfig !== null) {
      sortableBlogs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBlogs;
  }, [blogs, sortConfig]);

  const filteredAndSortedBlogs = React.useMemo(() => {
    return sortedBlogs.filter(
      (blog) =>
        (blog.title && blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (blog.author && typeof blog.author === 'string' && blog.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [sortedBlogs, searchQuery]);

  const paginatedBlogs = React.useMemo(() => {
    const start = (currentPage - 1) * blogsPerPage;
    return filteredAndSortedBlogs.slice(start, start + blogsPerPage);
  }, [filteredAndSortedBlogs, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedBlogs.length / blogsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalBlogs = blogs.length;

  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
    setDialogMode('view');
    setDialogOpen(true);
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBlog(null);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/blogs/update`, selectedBlog);
      if (response.status === 200) {
        setBlogs((prevBlogs) => prevBlogs.map(blog => blog._id === selectedBlog._id ? selectedBlog : blog));
        showSnackbar('Blog updated successfully');
        handleCloseDialog();
      } else {
        showSnackbar('Failed to update blog');
      }
    } catch (error) {
      showSnackbar('Error updating blog. Please try again.');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column', 
      gap: 4,
      background: `linear-gradient(135deg, #f6f7ff 0%, #e9eeff 100%)`,
      p: 4
    }}>
      <Fade in={true} timeout={800}>
        <ColoredPaper elevation={3} sx={{ p: 3, mb: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                Blog Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <AnimatedIcon>
                <BookIcon sx={{ fontSize: 40, color: 'white' }} />
              </AnimatedIcon>
            </Grid>
          </Grid>
        </ColoredPaper>
      </Fade>

      <Zoom in={true} timeout={800}>
        <GlassCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>Blog Statistics</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">Total Blogs: {totalBlogs}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </GlassCard>
      </Zoom>

      <Fade in={true} timeout={1000}>
        <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom>Search Blogs</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={fetchBlogs}>
                    <RefreshIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </Fade>

      <Fade in={true} timeout={1200}>
        <Paper elevation={3} sx={{ p: 3, flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>Blog Management</Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table stickyHeader aria-label="blog management table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={sortConfig.key === 'title'}
                          direction={sortConfig.direction}
                          onClick={() => handleSort('title')}
                        >
                          Title
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortConfig.key === 'author'}
                          direction={sortConfig.direction}
                          onClick={() => handleSort('author')}
                        >
                          Author
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortConfig.key === 'createdAt'}
                          direction={sortConfig.direction}
                          onClick={() => handleSort('createdAt')}
                        >
                          Date Published
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedBlogs.length > 0 ? (
                      paginatedBlogs.map((blog) => (
                        <TableRow key={blog._id}>
                          <TableCell>{blog.title}</TableCell>
                          <TableCell>{blog.author?.username || blog.author}</TableCell>
                          <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Tooltip title="View Blog">
                              <IconButton onClick={() => handleViewBlog(blog)} color="primary">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Blog">
                              <IconButton onClick={() => handleEditBlog(blog)} color="secondary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Blog">
                              <IconButton onClick={() => removeBlog(blog._id)} color="error">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
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
              <Stack spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
              </Stack>
            </>
          )}
        </Paper>
      </Fade>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogMode === 'view' ? 'View Blog' : 'Edit Blog'}</DialogTitle>
        <DialogContent>
          {selectedBlog && (
            <>
              <TextField
                fullWidth
                label="Title"
                value={selectedBlog.title}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2, mt: 2 }}
                onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
              />
              <TextField
                fullWidth
                label="Author"
                value={selectedBlog.author?.username || selectedBlog.author}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Date Published"
                value={new Date(selectedBlog.createdAt).toLocaleDateString()}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Content"
                value={selectedBlog.content}
                disabled={dialogMode === 'view'}
                multiline
                rows={4}
                sx={{ mb: 2 }}
                onChange={(e) => setSelectedBlog({ ...selectedBlog, content: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {dialogMode === 'edit' && <Button onClick={handleSaveEdit}>Save</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  );
}