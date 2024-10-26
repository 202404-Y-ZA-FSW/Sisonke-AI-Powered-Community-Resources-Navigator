"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import JobCard from "../JobCard";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next'; 

const Jobs = () => {
  const { t } = useTranslation(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recently added");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch jobs from database
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs/all");
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove duplicate jobs
  const uniqueJobs = filteredJobs.filter(
    (job, index, self) =>
      index ===
      self.findIndex((j) => j.title.toLowerCase() === job.title.toLowerCase())
  );

  // Sort jobs based on selected criteria
  const sortedJobs = uniqueJobs.sort((a, b) => {
    if (sortBy === "highest salary") {
      return b.salary - a.salary;
    } else if (sortBy === "lowest salary") {
      return a.salary - b.salary;
    } else {
      return new Date(b.posted) - new Date(a.posted);
    }
  });

  // Limit the jobs displayed to 6
  const displayedJobs = sortedJobs.slice(0, 6);

  if (loading) {
    return <Typography>{t('Jobs.Loading')}</Typography>; 
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ my: 1 }}
        gutterBottom
      >
        {t('Jobs.Title')} 
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        {t('Jobs.Subtitle')}
      </Typography>

      <Box display="flex" justifyContent="space-between" sx={{ mb: 4 }}>
        <TextField
          placeholder={t('Jobs.SearchPlaceholder')} 
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "300px" }}
          InputProps={{
            sx: { borderRadius: "16px" },
          }}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>{t('Jobs.SortBy')}</InputLabel>
          <Select
            value={sortBy}
            sx={{ borderRadius: "16px" }}
            onChange={(e) => setSortBy(e.target.value)}
            label={t('Jobs.SortBy')}
          >
            <MenuItem value="recently added">{t('Jobs.RecentlyAdded')}</MenuItem> 
            <MenuItem value="highest salary">{t('Jobs.HighestSalary')}</MenuItem>
            <MenuItem value="lowest salary">{t('Jobs.LowestSalary')}</MenuItem> 
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
            borderRadius: "15px",
            backgroundColor: "#6c63ff",
            color: "#ffffff",
            textTransform: "none",
            padding: "8px 30px",
          }}
          size="large"
          onClick={() => router.push("/jobs")}
        >
          {t('Jobs.BrowseAll')}
        </Button>
      </Box>
    </Container>
  );
};

export default Jobs;
