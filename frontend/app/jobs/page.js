"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Link,
} from "@mui/material";
import JobCard from "../components/JobCard"; 
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/Navigation";

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recently added");
  const [page, setPage] = useState(1);

  const fetchJobs = async (query = "", loadMore = false) => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/all`);
      const data = await response.json();
      if (loadMore) {
        setJobs((prevJobs) => [...prevJobs, ...(data.jobs || [])]);
      } else {
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs(searchTerm);
  }, [page]);

  const loadMoreJobs = () => {
    setPage((prevPage) => prevPage + 1);
    setDisplayedJobs(jobs.length);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedJobs = filteredJobs.sort((a, b) => {
    if (sortBy === "highest salary") {
      return (b.salary || 0) - (a.salary || 0);
    } else if (sortBy === "lowest salary") {
      return (a.salary || 0) - (b.salary || 0);
    } else {
      return new Date(b.created) - new Date(a.created);
    }
  });

  return (
    <>
      <Navigation />
      <Container>
        {/* Job Search Header */}
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
            <Typography variant="h3" component="h1" align="center" gutterBottom>
              Browse Latest Jobs
            </Typography>
            <Typography variant="subtitle1" align="center" paragraph>
              Searching for your dream job is now easier than ever. Just browse a job and apply if you need to.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <TextField
                variant="outlined"
                placeholder="Job title, Salary, or Companies..."
                sx={{ width: "50%", backgroundColor: "white", borderRadius: "4px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2, height: "56px", width: "150px" }}
                onClick={() => fetchJobs(searchTerm)}
              >
                Explore Now
              </Button>
            </Box>

            <Grid container justifyContent="center" sx={{ mt: 4 }}>
              <Typography variant="subtitle1" align="center" sx={{ mr: 1 }}>
                Popular Categories:
              </Typography>
              <Link href="#" underline="none" sx={{ mr: 2, mt: 1 }}>
                UX Designer
              </Link>
              <Link href="#" underline="none" sx={{ mr: 2, mt: 1 }}>
                Front-end Dev
              </Link>
              <Link href="#" underline="none" sx={{ mr: 2, mt: 1 }}>
                Back-end Dev
              </Link>
            </Grid>
          </Container>
        </Box>

        {/* Job Sorting */}
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

        {/* Job Cards */}
        <Grid container spacing={3} justifyContent="center">
          {sortedJobs.slice(0, displayedJobs).map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <JobCard
                title={job.title}
                company={job.company}
                salary={job.salary}
                type={job.type} 
                location={job.location} 
                experience={job.experience} 
                description={job.description}
                link={job.link} 
              />
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" color="primary" onClick={loadMoreJobs}>
            Load More
          </Button>
        </Box>
      </Container>
      <br />
      <Footer />
    </>
  );
};

export default Job;
