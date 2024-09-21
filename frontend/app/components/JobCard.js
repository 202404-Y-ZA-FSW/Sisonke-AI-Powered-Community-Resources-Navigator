"use client";

import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, CardActions, Typography, Button, Chip, Box, TextField, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

//  displays individual job details
const JobCardDetails = ({ title, company, salaryRange, timeAgo, employmentType, remote, description }) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 4, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.9)', border: 'ActiveBorder' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary">
            {employmentType}
          </Typography>
          {remote && <Chip label="Remote" size="small" color="primary" />}
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {company}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          {timeAgo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {salaryRange}
        </Typography>
      </CardActions>
    </Card>
  );
};

// Display the list of job cards and the search functionality
const JobCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recently added');

  const jobs = [
    {
      title: 'Lead Product Design',
      company: 'Slack',
      salaryRange: 'R54k - R89k',
      timeAgo: '10 hours ago',
      employmentType: 'Fulltime',
      remote: true,
      description: 'Join Slack’s design team to create innovative experiences for millions of users globally.....',
    },
    {
      title: 'Mobile App Designer',
      company: 'UIHUT',
      salaryRange: 'R59k - R84k',
      timeAgo: '11 hours ago',
      employmentType: 'Fulltime',
      remote: true,
      description: 'UIHUT is seeking a Mobile App Designer to craft sleek and user-friendly app interfaces.',
    },
    {
      title: 'Web Developer',
      company: 'Wix',
      salaryRange: 'R59k - R84k',
      timeAgo: '11 hours ago',
      employmentType: 'Fulltime',
      remote: true,
      description: 'At Wix, we are looking for a Web Developer to build next-gen websites for businesses......',
    },
    {
      title: 'Webflow Developer',
      company: 'Webflow',
      salaryRange: 'R50k - R84k',
      timeAgo: '11 hours ago',
      employmentType: 'Fulltime',
      remote: true,
      description: 'Help us create stunning websites with Webflow. Join our team of talented developers...',
    },
    {
      title: 'Senior Product Design',
      company: 'Behance',
      salaryRange: 'R59k - R84k',
      timeAgo: '11 hours ago',
      employmentType: 'Fulltime',
      remote: true,
      description: 'We are looking for a senior designer to help shape the future of Behance’s creative...',
    },
    {
      title: 'Senior Web Developer',
      company: 'Google',
      salaryRange: 'R59k - R84k',
      timeAgo: '11 hours ago',
      employmentType: 'Fulltime',
      remote: true,
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
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        Explore Popular Jobs
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 1 }}>
        Discover jobs most relevant to you by experience level,
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        salary, location, job type, etc.
      </Typography>

      
      <Box display="flex" justifyContent="space-between" sx={{ mb: 4 }}>
        <TextField
          label="Search job title or companies"
          variant="outlined"
          sx={{ flex: 1, mr: 2 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        
        <FormControl variant="outlined" sx={{ minWidth: 180 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
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
            <JobCardDetails {...job} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" size="large">
          Browse All
        </Button>
      </Box>
    </Container>
  );
};

export default JobCard;
