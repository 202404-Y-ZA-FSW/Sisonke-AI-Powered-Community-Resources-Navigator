"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Button, Box, TextField, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import JobCard from '../JobCard';
import { useRouter } from 'next/navigation';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recently added');
  const [jobs, setJobs] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jobs/all');  
        setJobs(response.data.jobs);  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  const uniqueJobs = jobs.filter(
    (job, index, self) =>
      index === self.findIndex((j) => j.title.toLowerCase() === job.title.toLowerCase())
  );

  const sortedJobs = uniqueJobs.sort((a, b) => {
    if (sortBy === 'highest salary') {
      return b.salary - a.salary; 
    } else if (sortBy === 'lowest salary') {
      return a.salary - b.salary; 
    } else {
      return new Date(b.posted) - new Date(a.posted); 
    }
  });

  const displayedJobs = sortedJobs.slice(0, 6);

  if (loading) {
    return <Typography>Loading jobs...</Typography>;
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" align="center" sx={{ my: 1 }} gutterBottom>
        Explore the latest job opportunities
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        Discover jobs most relevant to you by experience level, salary, location, job type, etc.
      </Typography>
      
      <Box display="flex" justifyContent="space-between" sx={{ mb: 4 }}>
        <TextField
          placeholder="Search Job Position or Company"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
        />
        
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            sx={{ borderRadius: '16px'}}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="recently added">Recently Added</MenuItem>
            <MenuItem value="highest salary">Highest Salary</MenuItem>
            <MenuItem value="lowest salary">Lowest Salary</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {displayedJobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <JobCard {...job} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button
          sx={{
            borderRadius: '16px',
            backgroundColor: "#6c63ff",
            color: "#ffffff",
            padding: "8px 30px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
            marginRight: "10px" 
          }}
          size="large"
          onClick={() => {/* Implement load more functionality here */}} 
        >
          Load More
        </Button>
        <Button
          sx={{
            borderRadius: '16px',
            backgroundColor: "#6c63ff",
            color: "#ffffff",
            padding: "8px 30px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
          size="large"
          onClick={() => router.push('/jobs')} 
        >
          Browse All
        </Button>
      </Box>
    </Container>
  );
};

export default Jobs;
