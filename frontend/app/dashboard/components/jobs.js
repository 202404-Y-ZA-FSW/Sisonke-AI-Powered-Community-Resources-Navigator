"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
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
  Paper,
  CircularProgress,
  Snackbar,
  IconButton,
  Tooltip,
  useTheme,
  Card,
  CardContent,
  Fade,
  Zoom,
  Pagination,
  Stack,
  TableSortLabel,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import WorkIcon from '@mui/icons-material/Work';
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

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'posted', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('');
  const jobsPerPage = 10;
  const theme = useTheme();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/jobs/all");
      if (Array.isArray(response.data.jobs)) {
        setJobs(response.data.jobs);
      } else {
        showSnackbar("Unexpected data format. Expected an array.");
      }
    } catch (err) {
      showSnackbar("Error fetching jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removeJob = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/jobs/${id}`);
      if (response.status === 200) {
        setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
        showSnackbar("Job deleted successfully.");
      } else {
        showSnackbar('Failed to delete job');
      }
    } catch (error) {
      showSnackbar('Error deleting job. Please try again.');
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

  const sortedJobs = React.useMemo(() => {
    let sortableJobs = [...jobs];
    if (sortConfig !== null) {
      sortableJobs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableJobs;
  }, [jobs, sortConfig]);

  const filteredAndSortedJobs = React.useMemo(() => {
    return sortedJobs.filter(
      (job) =>
        (job.title && job.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.company && job.company.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [sortedJobs, searchQuery]);

  const paginatedJobs = React.useMemo(() => {
    const start = (currentPage - 1) * jobsPerPage;
    return filteredAndSortedJobs.slice(start, start + jobsPerPage);
  }, [filteredAndSortedJobs, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedJobs.length / jobsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalJobs = jobs.length;

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setDialogMode('view');
    setDialogOpen(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedJob(null);
  };

  const handleSaveEdit = async () => {
    // Implement the logic to save the edited job
    // This is just a placeholder
    showSnackbar("Job updated successfully.");
    handleCloseDialog();
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
                Job Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <AnimatedIcon>
                <WorkIcon sx={{ fontSize: 40, color: 'white' }} />
              </AnimatedIcon>
            </Grid>
          </Grid>
        </ColoredPaper>
      </Fade>

      <Zoom in={true} timeout={800}>
        <GlassCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>Job Statistics</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">Total Jobs: {totalJobs}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </GlassCard>
      </Zoom>

      <Fade in={true} timeout={1000}>
        <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom>Search Jobs</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by title or company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={fetchJobs}>
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
          <Typography variant="h6" gutterBottom>Job Management</Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table stickyHeader aria-label="job management table">
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
                          active={sortConfig.key === 'company'}
                          direction={sortConfig.direction}
                          onClick={() => handleSort('company')}
                        >
                          Company
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortConfig.key === 'posted'}
                          direction={sortConfig.direction}
                          onClick={() => handleSort('posted')}
                        >
                          Date Posted
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedJobs.length > 0 ? (
                      paginatedJobs.map((job) => (
                        <TableRow key={job._id}>
                          <TableCell>{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>{new Date(job.posted).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Tooltip title="View Job">
                              <IconButton onClick={() => handleViewJob(job)} color="primary">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Job">
                              <IconButton onClick={() => handleEditJob(job)} color="secondary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Job">
                              <IconButton onClick={() => removeJob(job._id)} color="error">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No jobs found
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
        <DialogTitle>{dialogMode === 'view' ? 'View Job' : 'Edit Job'}</DialogTitle>
        <DialogContent>
          {selectedJob && (
            <>
              <TextField
                fullWidth
                label="Title"
                value={selectedJob.title}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                fullWidth
                label="Company"
                value={selectedJob.company}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Date Posted"
                value={new Date(selectedJob.posted).toLocaleDateString()}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={selectedJob.description || "No description available"}
                disabled={dialogMode === 'view'}
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Location"
                value={selectedJob.location || "No location specified"}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Salary"
                value={selectedJob.salary || "Not specified"}
                disabled={dialogMode === 'view'}
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