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

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jobs");
      if (response.status === 200) {
        setJobs(response.data);
      } else {
        setError("Unexpected data format. Expected an array.");
      }
    } catch (err) {
      setError("Error fetching jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removeJob = async (id) => {
    setIsDeleting(true); 
    try {
      const response = await axios.delete(`http://localhost:5000/jobs/${id}`);
      if (response.status === 200) {
        setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
        setSnackbarMessage('Job deleted successfully');
        setSnackbarOpen(true);
      } else {
        setError('Failed to delete job');
      }
    } catch (error) {
      setError('Error deleting job. Please try again.');
    } finally {
      setIsDeleting(false); 
    }
  };

  const filteredJobs = (jobs || []).filter(
    (job) =>
      (job.title && job.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.company && job.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalJobs = (jobs || []).length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ mb: 4, textAlign: 'center' }}>
        <CardHeader title="Jobs Statistics" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Total Jobs: {jobs.length}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, textAlign: 'center' }}>
        <CardHeader title="Search Jobs" />
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
        <CardHeader title="Jobs Management" />
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
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <TableRow key={job._id}>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.location?.username || job.location}</TableCell>
                        <TableCell>{new Date(job.publishedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            startIcon={<DeleteIcon />}
                            onClick={() => removeJob(job._id)}
                            color="error"
                            variant="contained"
                            disabled={isDeleting} 
                          >
                            {isDeleting ? <CircularProgress size={20} /> : 'Delete'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No jobs found</TableCell>
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
