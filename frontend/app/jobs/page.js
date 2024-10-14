"use client";

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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; 
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; 
import { styled } from "@mui/system";
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/Navigation";
import Subscribe from "../components/sections/Subscribe";
import JobForm from "./new/page";

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

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recently added");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs/all");
      const data = await response.json();
      console.log("Fetched jobs:", data);

      // Check if the 'jobs' property exists and is an array
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

  const handleClickOutside = (e) => {
    if (e.target.id === "modalBackground") {
      setIsFormOpen(false);
    }
  };

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
              Find the job of your dreams in our curated list of jobs from
              verified companies, or search for a specific job title or company.
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

        {/* Job Sorting and Post Button flex */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 8, mt: 8 }}>
          {/* Sort By Dropdown */}
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

          {/* Post a Job Button */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#6c63ff",
              borderRadius: "16px",
              color: "#ffffff",
              textTransform: "none",
              padding: "10px 20px",
              "&:hover": { bgcolor: "#5A52D5" },
            }}
            onClick={() => setIsFormOpen(true)}
          >
            Post a Job
          </Button>
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
        {isFormOpen && (
          <Paper
            id="modalBackground"
            onClick={handleClickOutside}
            elevation={5}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                padding: 4,
                borderRadius: 2,
                width: { xs: "90%", sm: "60%", md: "40%" },
              }}
            >
              <JobForm />
              <IconButton
                sx={{ position: "absolute", top: 10, right: 10 }}
                onClick={() => setIsFormOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Paper>
        )}
      </Container>
      <br />
      <Subscribe/>
      <Footer />
    </>
  );
};

export default Job;
