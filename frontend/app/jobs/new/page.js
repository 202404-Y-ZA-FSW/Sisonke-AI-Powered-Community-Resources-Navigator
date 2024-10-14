'use client';
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

  const initialJobData = {
    // user: '',
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    qualifications: '',
    experience: '',
    skills: '',
    link: '',
  };

  const [jobData, setJobData] = useState(initialJobData);
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
    if (!jobData.type) errors.type = 'Job Type is required.';
    if (!jobData.description) errors.description = 'Description is required.';
    if (jobData.link && !/^(ftp|http|https):\/\/[^ "]+$/.test(jobData.link)) {
      errors.link = 'Invalid URL.';
    }
    return errors;
  };

  const handleJobSubmit = async (jobData) => {
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
        console.error('Error creating job:', error.response.data); 
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

  const handleClose = () => {
    setJobData(initialJobData); 
    setErrors({}); 
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 1, maxWidth: 600, width: '100%', height: '80vh', overflow: 'auto', position: 'relative', background: 'linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)' }}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <CloseIcon />
        </IconButton>
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
            <Grid item xs={12}>
              <TextField
                label="Application Link"
                name="link"
                value={jobData.link}
                onChange={handleChange}
                fullWidth
                error={!!errors.link}
                helperText={errors.link}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ bgcolor: "#6c63ff",
              borderRadius: "16px",
              color: "#ffffff",
              textTransform: "none",
              padding: "12px 24px", 
              fontSize: "1rem", 
              "&:hover": { bgcolor: "#5A52D5" },mt:2 }}
          >
            Create Job
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobForm;
