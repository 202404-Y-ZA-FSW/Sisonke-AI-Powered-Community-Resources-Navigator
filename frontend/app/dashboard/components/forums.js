'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Snackbar,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
  Fade,
  Zoom,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  Stack,
  TableSortLabel,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ForumIcon from '@mui/icons-material/Forum';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
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

export default function Forums() {
  const [forums, setForums] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedForum, setSelectedForum] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('');
  const forumsPerPage = 10;

  useEffect(() => {
    fetchUsers();
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/forums");
      if (response.status === 200) {
        setForums(response.data);
      } else {
        showSnackbar("Failed to fetch forums.");
      }
    } catch (err) {
      showSnackbar("Error fetching forums. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/account/users");
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data.users && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        showSnackbar("Failed to fetch users. Expected an array.");
      }
    } catch (err) {
      showSnackbar("Error fetching users. Please try again later.");
    }
  };

  const removeForum = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/forums/${id}`);
      if (response.status === 200) {
        setForums((prevForums) => prevForums.filter((forum) => forum._id !== id));
        showSnackbar("Forum deleted successfully.");
      } else {
        showSnackbar("Failed to delete forum");
      }
    } catch (error) {
      showSnackbar("Error deleting forum. Please try again.");
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

  const sortedForums = React.useMemo(() => {
    let sortableForums = [...forums];
    if (sortConfig !== null) {
      sortableForums.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableForums;
  }, [forums, sortConfig]);

  const getUsernameById = (author) => {
    if (typeof author === 'object' && author.username) {
      return author.username;
    } else {
      const user = users.find((user) => user._id === author);
      return user ? user.username : "Unknown";
    }
  };

  const filteredAndSortedForums = React.useMemo(() => {
    return sortedForums.filter(
      (forum) =>
        (forum.title && forum.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (getUsernameById(forum.author) && getUsernameById(forum.author).toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [sortedForums, searchQuery, users]);

  const paginatedForums = React.useMemo(() => {
    const start = (currentPage - 1) * forumsPerPage;
    return filteredAndSortedForums.slice(start, start + forumsPerPage);
  }, [filteredAndSortedForums, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedForums.length / forumsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalForums = forums.length;

  const handleViewForum = (forum) => {
    setSelectedForum(forum);
    setDialogMode('view');
    setDialogOpen(true);
  };

  const handleEditForum = (forum) => {
    setSelectedForum(forum);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedForum(null);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/forums/${selectedForum._id}`, selectedForum);
      if (response.status === 200) {
        setForums((prevForums) =>
          prevForums.map((forum) =>
            forum._id === selectedForum._id ? selectedForum : forum
          )
        );
        showSnackbar("Forum updated successfully.");
        handleCloseDialog();
      } else {
        showSnackbar("Failed to update forum");
      }
    } catch (error) {
      showSnackbar("Error updating forum. Please try again.");
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
                Forum Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <AnimatedIcon>
                <ForumIcon sx={{ fontSize: 40, color: 'white' }} />
              </AnimatedIcon>
            </Grid>
          </Grid>
        </ColoredPaper>
      </Fade>

      <Zoom in={true} timeout={800}>
        <GlassCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>Forum Statistics</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">Total Forums: {totalForums}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </GlassCard>
      </Zoom>

      <Fade in={true} timeout={1000}>
        <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom>Search Forums</Typography>
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
                  <IconButton onClick={fetchForums}>
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
          <Typography variant="h6" gutterBottom>Forum Management</Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table stickyHeader aria-label="forum management table">
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
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedForums.length > 0 ? (
                      paginatedForums.map((forum) => (
                        <TableRow key={forum._id}>
                          <TableCell>{forum.title}</TableCell>
                          <TableCell>{getUsernameById(forum.author)}</TableCell>
                          <TableCell>
                            <Tooltip title="View Forum">
                              <IconButton onClick={() => handleViewForum(forum)} color="primary">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Forum">
                              <IconButton onClick={() => handleEditForum(forum)} color="secondary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Forum">
                              <IconButton onClick={() => removeForum(forum._id)} color="error">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No forums found
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
        <DialogTitle>{dialogMode === 'view' ? 'View Forum' : 'Edit Forum'}</DialogTitle>
        <DialogContent>
          {selectedForum && (
            <>
              <TextField
                fullWidth
                label="Title"
                value={selectedForum.title}
                onChange={(e) => setSelectedForum({...selectedForum, title: e.target.value})}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                fullWidth
                label="Author"
                value={getUsernameById(selectedForum.author)}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={selectedForum.description}
                onChange={(e) => setSelectedForum({...selectedForum, description: e.target.value})}
                disabled={dialogMode === 'view'}
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Created At"
                value={new Date(selectedForum.createdAt).toLocaleString()}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Updated At"
                value={new Date(selectedForum.updatedAt).toLocaleString()}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Total Posts"
                value={selectedForum.totalPosts || 0}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Last Post Date"
                value={selectedForum.lastPostDate ? new Date(selectedForum.lastPostDate).toLocaleString() : 'N/A'}
                disabled
                sx={{ mb: 2 }}
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