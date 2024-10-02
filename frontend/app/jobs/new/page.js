'use client';
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const jobTypes = [
  { value: 'full-time', label: 'Full-time' },
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
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    qualifications: '',
    experience: '',
    skills: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  // Validation function to check required fields
  const validateForm = () => {
    const errors = {};
    if (!jobData.title) errors.title = 'Title is required.';
    if (!jobData.company) errors.company = 'Company is required.';
    if (!jobData.location) errors.location = 'Location is required.';
    if (!jobData.type) errors.type = 'Job Type is required.';
    if (!jobData.description) errors.description = 'Description is required.';
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await axios.post('http://localhost:5000/jobs/new', jobData);
      if (response.status === 200) {
        alert('Job created successfully');
        router.push('/jobs');
      } else {
        alert('Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job');
    }
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
                name="type"
                select
                value={jobData.type}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.type}
                helperText={errors.type}
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
