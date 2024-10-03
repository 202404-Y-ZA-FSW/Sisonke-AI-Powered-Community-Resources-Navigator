'use client';
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const jobTypes = [
  { value: 'full-time', label: 'full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Internship' }
];

const experienceLevels = [
  { value: 'entry-level', label: 'Entry-level' },
  { value: 'mid-level', label: 'Mid-level' },
  { value: 'senior-level', label: 'Senior-level' }
];

const JobForm = () => {
  const router = useRouter();

  const [jobData, setJobData] = useState({
    user: '',
    title: '',
    company: '',
    location: '',
    employmentType: '',
    salary: '',
    description: '',
    qualifications: '',
    experience: '',
    skills: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!jobData.title) errors.title = 'Title is required.';
    if (!jobData.company) errors.company = 'Company is required.';
    if (!jobData.location) errors.location = 'Location is required.';
    if (!jobData.employmentType) errors.employmentType = 'Job Type is required.';
    if (!jobData.description) errors.description = 'Description is required.';
    return errors;
  };

  const handleJobSubmit = async (jobData) => {
    //e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await axios.post(`http://localhost:5000/jobs/new`, jobData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.status === 201) {
        alert('Job created successfully');
        router.push('/jobs/new');
      } else {
        alert('Failed to create job');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error creating job:', error.response.data); // This will show the server's validation error
        alert(`Failed to create job: ${error.response.data.message || 'Unknown error'}`);
      } else {
        console.error('Error creating job:', error);
        alert('Failed to create job');
      }
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    handleJobSubmit(jobData);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
          Post a Job
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Company"
                name="company"
                value={jobData.company}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.company}
                helperText={errors.company}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.location}
                helperText={errors.location}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Job Type"
                name="employmentType"
                select
                value={jobData.employmentType}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.employmentType}
                helperText={errors.employmentType}
              >
                {jobTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Salary"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={jobData.description}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Qualifications"
                name="qualifications"
                value={jobData.qualifications}
                onChange={handleChange}
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Experience Level"
                name="experience"
                select
                value={jobData.experience}
                onChange={handleChange}
                fullWidth
              >
                {experienceLevels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Skills"
                name="skills"
                value={jobData.skills}
                onChange={handleChange}
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, p: 1.5, bgcolor: 'primary.main' }}
          >
            Create Job
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobForm;
