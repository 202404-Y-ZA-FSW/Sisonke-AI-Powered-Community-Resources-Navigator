"use client";

import React, { useState, useEffect } from 'react';
import {Container, Grid, Card, CardContent, CardActions, Typography, Button, Chip, Box, TextField, Select, FormControl, InputLabel, MenuItem, Avatar, Link 
} from '@mui/material';


function JobSearchHeader({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <Box sx={{ py: 10, background: 'linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)', width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Browse Latest Jobs
        </Typography>
        <Typography variant="subtitle1" align="center" paragraph>
          Searching for your dream job is now easier than ever. Just browse a job and apply if you need to.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <TextField
            variant="outlined"
            placeholder="Job title, Salary, or Companies..."
            sx={{ width: '50%', backgroundColor: 'white', borderRadius: '4px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2, height: '56px', width: '150px' }}
            onClick={onSearch}
          >
            Explore Now
          </Button>
        </Box>

        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Typography variant="subtitle1" align="center" sx={{ mr: 1 }}>
            Popular Categories:
          </Typography>
          <Link href="#" underline="none" sx={{ mr: 2 }}>
            UX Designer
          </Link>
          <Link href="#" underline="none" sx={{ mr: 2 }}>
            Front-end Dev
          </Link>
          <Link href="#" underline="none">
            Back-end Dev
          </Link>
        </Grid>
      </Container>
    </Box>
  );
}


const getSalaryValue = (salaryRange) => {
  const salaryMatch = salaryRange.match(/\d+/g);
  return salaryMatch ? parseInt(salaryMatch[0], 10) : 0;
};

// Display individual job details
const JobCardDetails = ({ title, company, salaryRange, timeAgo, employmentType, remote, description, companyLogo, redirectUrl }) => {
  const companyName = company?.display_name || "Unknown Company";
  const salary = salaryRange?.minimum ? `$${salaryRange.minimum} - $${salaryRange.maximum}` : 'Salary not specified';

  return (
    <Link href={redirectUrl} target="_blank" underline="none" sx={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 345, mb: 4, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.9)', border: 'ActiveBorder', background: 'linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Avatar src={companyLogo || 'https://via.placeholder.com/50/0000FF/FFFFFF?text=No+Logo'} alt={`${companyName} logo`} sx={{ width: 50, height: 50 }} />
            <Typography variant="subtitle2" color="text.secondary">
              {employmentType}
            </Typography>
            {remote && <Chip label="Remote" size="small" color="primary" />}
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {companyName}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            {timeAgo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {salary}
          </Typography>
        </CardActions>
      </Card>
    </Link>
  );
};


const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recently added');
  const [page, setPage] = useState(1); 

  // Helper function to get salary value
  const getSalaryValue = (salaryRange) => {
    if (!salaryRange || !salaryRange.min) return 0;
    return salaryRange.min;
  };

  // Fetch jobs using the API 
  const fetchJobs = async (query = [''], loadMore = false) => {
    try {
      const response = await fetch(`https://api.adzuna.com/v1/api/jobs/us/search/${page}?app_id=21f6cc28&app_key=32909bbcc5e3765086cef6e4bb8954f7&results_per_page=20&what=${query}&where=United%20States&distance=1.0&content-type=application/json`, {
        method: 'GET'
      });
  
      const data = await response.json();
      console.log('API response:', data);
      if (loadMore) {
        setJobs((prevJobs) => [...prevJobs, ...data.results || []]);
      } else {
        setJobs(data.results || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };


  useEffect(() => {
    fetchJobs(searchTerm);
  }, [page, searchTerm]); 

  // Load more jobs when the button is clicked
  const loadMoreJobs = () => {
    setPage((prevPage) => prevPage +2); 
  
    setDisplayedJobs(jobs.length); 
  };

  // Filter jobs based on the search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort jobs based on the selected criteria
  const sortedJobs = filteredJobs.sort((a, b) => {
    if (sortBy === 'highest salary') {
      return getSalaryValue(b.salaryRange) - getSalaryValue(a.salaryRange);
    } else if (sortBy === 'lowest salary') {
      return getSalaryValue(a.salaryRange) - getSalaryValue(b.salaryRange);
    } else {
      return new Date(b.created) - new Date(a.created); 
    }
  });

  return (
    <Container>
      <JobSearchHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={() => fetchJobs(searchTerm)} /> 

      <Box display="flex" justifyContent="flex-end" sx={{ mb: 8, mt: 8 }}>
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
        {sortedJobs.slice(0, displayedJobs).map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <JobCardDetails
              title={job.title}
              company={job.company}
              salaryRange={job.salaryRange}
              timeAgo={job.created}
              employmentType={job.employment_type}
              remote={job.remote}
              description={job.description}
              companyLogo={job.company.logo}
              redirectUrl={job.redirect_url}  
            />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" size="large" onClick={loadMoreJobs}>
          Load more
        </Button>
      </Box>
    </Container>
  );
};

export default Job;
