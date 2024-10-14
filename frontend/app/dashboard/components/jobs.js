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
  IconButton,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jobs/all");
      console.log("Response Data:", response.data); // Add this to check the structure
      if (response.status === 200) {
        setJobs(response.data.jobs || response.data || []); // Ensure it's an array
      } else {
        console.error("Failed to fetch jobs:", response.data);
        alert("Failed to fetch jobs.");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      alert("Error fetching jobs. Please try again later.");
    }
  };
  

  const removeJob = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/jobs/${id}`);
      if (response.status === 200) {
        alert('Job deleted successfully');
        setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
      } else {
        console.error('Error deleting job:', response.data);
        alert('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job. Please try again.');
    }
  };

  const filteredJobs = Array.isArray(jobs) ? jobs.filter(
    (job) =>
      (job.title && job.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.company && job.company.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];
  

  const totalJobs = (jobs || []).length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Jobs Management
      </Typography>

      {/* Job Statistics Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Job Statistics" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Total Jobs: {totalJobs}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Job Search Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Search Jobs" />
        <CardContent>
          <InputBase
            placeholder="Search by title or company"
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

      {/* Job Management Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Job Management" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Company</strong></TableCell>
                  <TableCell><strong>Date Posted</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <TableRow key={job._id}>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{new Date(job.datePosted).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeJob(job._id)} color="error">
                          <Delete />
                        </IconButton>
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
        </CardContent>
      </Card>
    </Container>
  );
}
