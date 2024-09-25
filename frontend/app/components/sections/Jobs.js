"use client";

import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Box, TextField, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import JobCard from '../JobCard';

// Display the list of job cards and the search functionality
const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recently added');

  const jobs = [
    {
      title: 'Lead Product Design',
      company: 'Slack',
      salaryRange: 'R54k - R89k',
      timeAgo: '10 hours ago',
      employmentType: 'Fulltime',
      remote: "Hybrid",
      description: 'Join Slack’s design team to create innovative experiences for millions of users globally.....',
    },
    {
      title: 'Mobile App Designer',
      company: 'UIHUT',
      salaryRange: 'R59k - R84k',
      timeAgo: '11 hours ago',
      employmentType: 'Fulltime',
      remote: "Remote",
      description: 'UIHUT is seeking a Mobile App Designer to craft sleek and user-friendly app interfaces.',
    },
    {
      title: 'Web Developer',
      company: 'Wix',
      salaryRange: 'R59k - R84k',
      timeAgo: '11 hours ago',
      employmentType: 'Fulltime',
      remote: "Remote",
      description: 'At Wix, we are looking for a Web Developer to build next-gen websites for businesses......',
    },
    {
      title: 'Webflow Developer',
      company: 'Webflow',
      salaryRange: 'R50k - R84k',
      timeAgo: '11 hours ago',
      employmentType: 'Fulltime',
      remote: "Hybrid",
      description: 'Help us create stunning websites with Webflow. Join our team of talented developers...',
    },
    {
      title: 'Senior Product Design',
      company: 'Behance',
      salaryRange: 'R59k - R84k',
      timeAgo: '11 hours ago',
      employmentType: 'Fulltime',
      remote: 'Hybrid',
      description: 'We are looking for a senior designer to help shape the future of Behance’s creative...',
    },
    {
      title: 'Senior Web Developer',
      company: 'Google',
      salaryRange: 'R59k - R84k',
      timeAgo: '11 hours ago',
      employmentType: 'Fulltime',
      remote: "Remote",
      description: 'Join Google’s engineering team as a Senior Web Developer. Help us build products.....',
    },
  ];
  

  // Filter jobs based on the search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort jobs based on the selected criteria
  const sortedJobs = filteredJobs.sort((a, b) => {
    if (sortBy === 'highest salary') {
      return b.salaryRange.localeCompare(a.salaryRange);
    } else if (sortBy === 'lowest salary') {
      return a.salaryRange.localeCompare(b.salaryRange);
    } else {
      return b.timeAgo.localeCompare(a.timeAgo);
    }
  });

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" align="center" sx={{ my: 1 }}>
        Explore the latest job <br/> opportunities
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Discover jobs most relevant to you by experience level, salary, location, job type, etc.
      </Typography>
      
      <Box display="flex" justifyContent="space-between" sx={{ mb: 4 }}>
        <input
          placeholder="Search Job Position or Company"
          style={{
            padding: '10px',
            borderRadius: '16px',
            border: '1px solid #ccc',
            width: '300px',
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        {sortedJobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <JobCard {...job}/>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button sx={{ borderRadius: '15px', backgroundColor: "#6c63ff", color: "#ffffff", textTransform: "none", padding: "8px 30px" }} size="large">
          Browse All
        </Button>
      </Box>
    </Container>
  );
};

export default Jobs;