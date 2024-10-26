"use client"
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Link,
  InputAdornment,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { styled } from "@mui/system";
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/Navigation";
import Subscribe from "../components/sections/Subscribe";
import { useAuthentication } from "../hooks/useAuthentication"; 
import { useRouter } from 'next/navigation';
import axios from 'axios';

const StyledCard = styled(Card)({
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  maxWidth: 400,
  margin: "auto",
  borderRadius: 16,
  boxShadow: "none",
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  "&:hover": {
    transform: "scale(1.02)",
    transition: "all 0.3s",
  },
});

const HeaderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 8,
});

const Logo = styled("div")({
  width: 50,
  height: 50,
  borderRadius: 8,
  backgroundColor: "#6c63ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
  fontSize: 24,
});

const FooterContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 16,
});

const InfoItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginRight: 16,
});

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

const JobCardDetails = ({
  title,
  company,
  salary,
  type,
  description,
  link,
  location,
  experience,
}) => {
  const companyName = company || "Unknown Company";

  const formatSalary = (salary) => {
    if (salary === null || salary === undefined) return "N/A";
    return `R ${salary.toLocaleString()}`;
  };

  return (
    <Link href={link} target="_blank" underline="none">
      <StyledCard>
        <CardContent>
        <HeaderContainer>
            <Logo>{companyName[0]}</Logo>
            <Box sx={{ flex: 1, ml: 1, minWidth: 0 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {companyName}
              </Typography>
            </Box>
          </Box>
          </HeaderContainer>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 2,
              height: 40,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </Typography>

          <FooterContainer>
            <Chip label={location} variant="outlined" />
            <Chip label={experience} variant="outlined" />
          </FooterContainer>

          <FooterContainer>
            <InfoItem>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {type}
              </Typography>
            </InfoItem>
            <InfoItem>
              <AttachMoneyIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {formatSalary(salary)}
              </Typography>
            </InfoItem>
          </FooterContainer>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

const JobForm = ({ open, handleClose }) => {
  const router = useRouter();

  const initialJobData = {
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
    if(name === 'qualifications' || name === 'skills'){
      setJobData((prevData) => ({
        ...prevData,
        [name]: value.split(',').map(item => item.trim()),
      }));
    } else {
      setJobData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
        router.push('/jobs');
        handleClose();
      } else {
        alert('Job not created. Please try again.');
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
    handleJobSubmit(jobData);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Post a Job
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
                label="Qualifications (comma-separated)"
                name="qualifications"
                value={jobData.qualifications}
                onChange={handleChange}
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Skills (comma-separated)"
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: "#6c63ff",
            color: "#ffffff",
            "&:hover": { bgcolor: "#5A52D5" },
          }}
        >
          Create Job
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recently added");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { user } = useAuthentication();
  const canPostAJob =
    user && (user.user.role === "administrator" || user.user.role === "ngo");
    
  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs/all");
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      console.log("Fetched jobs:", data);

      if (Array.isArray(data.jobs)) {
        setJobs(data.jobs);
      } else {
        console.error("Expected an array under 'jobs' but got:", data.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueJobs = filteredJobs.filter(
    (job, index, self) =>
      index ===
      self.findIndex((j) => j.title.toLowerCase() === job.title.toLowerCase())
  );

  const sortedJobs = uniqueJobs.sort((a, b) => {
    if (sortBy === "highest salary") {
      return (b.salary || 0) - (a.salary || 0);
    } else if (sortBy === "lowest salary") {
      return (a.salary || 0) - (b.salary || 0);
    } else {
      return new Date(b.posted) - new Date(a.posted);
    }
  });

  const loadMoreJobs = () => {
    setDisplayedJobs((prev) => prev + 5);
  };

  return (
    <>
      <Navigation />
      <Container>
        <Box
          sx={{
            py: 10,
            background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
            width: "100vw",
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.75rem" },
                textAlign: "center",
              }}
            >
              Browse Jobs In Your Community
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 4,
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.25rem" },
                textAlign: "center",
              }}
            >
              Find the job of your dreams in our curated list of jobs from verified companies, or search for a specific job title or company.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <TextField
                variant="outlined"
                placeholder="Search"
                InputProps={{
                  sx: { borderRadius: "16px", width: "100%" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                size="large"
                sx={{
                  bgcolor: "#6c63ff",
                  borderRadius: "16px",
                  padding: "15px 24px",
                  color: "#ffffff",
                  textTransform: "none",
                  marginLeft: "10px",
                  "&:hover": { bgcolor: "#5A52D5" },
                  px: 4,
                }}
                onClick={fetchJobs}
              >
                Explore Now
              </Button>
            </Box>
          </Container>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 8, mt: 8 }}>
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

          {canPostAJob ? (
            <Button
              variant="contained"
              sx={{
                bgcolor: "#6c63ff",
                borderRadius: "16px",
                color: "#ffffff",
                textTransform: "none",
                padding: "15px 30px",
                "&:hover": { bgcolor: "#5A52D5" },
              }}
              onClick={() => setIsFormOpen(true)}
            >
              Post a Job
            </Button>
          ) : (
            <Typography variant="subtitle1" color="blue">
              You need to login to post a job.
            </Typography>
          )}
        </Box>

       {/* Job Cards */}
       <Grid container spacing={3}>
          {sortedJobs.slice(0, displayedJobs).map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCardDetails
                title={job.title}
                company={job.company}
                salary={job.salary}
                type={job.type}
                description={job.description}
                link={job.link}
                location={job.location}
                experience={job.experience}
              />
            </Grid>
          ))}
        </Grid>
        {displayedJobs < sortedJobs.length && (
          <Box display="flex" justifyContent="center" my={4}>
           <Button
          sx={{
            borderRadius: "15px",
            backgroundColor: "#6c63ff",
            color: "#ffffff",
            textTransform: "none",
            padding: "8px 30px",
          }}
          size="large"
          onClick={loadMoreJobs}>
              Load More
            </Button>
          </Box>
        )}

        {/* Job Posting Form Modal */}
        <JobForm open={isFormOpen} handleClose={() => setIsFormOpen(false)} />
      </Container>
      <br />
      <Subscribe/>
      <Footer />
    </>
  );
};

export default Job;
