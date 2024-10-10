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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/Navigation";
import Subscribe from "../components/sections/Subscribe";

const StyledCard = styled(Card)({
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  maxWidth: 340,
  height: 250,
  borderRadius: 16,
  boxShadow: "none",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.02)",
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

const getRandomSalary = () => {
  const min = 10000;
  const max = 100000;
  return `R ${Math.floor(Math.random() * (max - min + 1)) + min}`;
};

const JobCardDetails = ({
  title,
  company,
  salaryRange,
  timeAgo,
  description,
  redirectUrl,
}) => {
  const companyName = company?.display_name || "Unknown Company";
  const salary = salaryRange?.minimum
    ? `R${salaryRange.minimum} - R${salaryRange.maximum}`
    : getRandomSalary();

  return (
    <Link href={redirectUrl} target="_blank" underline="none">
      <StyledCard>
        <CardContent>
          <HeaderContainer>
            <Logo>{companyName[0]}</Logo>
            <Box sx={{ flex: 1, ml: 1, minWidth: 0 }}>
              {" "}
              {/* Add minWidth: 0 */}
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
            <Typography variant="body2" color="text.secondary">
              {timeAgo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {salary}
            </Typography>
          </FooterContainer>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recently added");
  const [page, setPage] = useState(1);

  const fetchJobs = async (query = [""], loadMore = false) => {
    try {
      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/us/search/${page}?app_id=21f6cc28&app_key=32909bbcc5e3765086cef6e4bb8954f7&results_per_page=20&what=${query}&where=United%20States&distance=1.0&content-type=application/json`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (loadMore) {
        setJobs((prevJobs) => [...prevJobs, ...(data.results || [])]);
      } else {
        setJobs(data.results || []);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs(searchTerm);
  }, [page, searchTerm]);

  const loadMoreJobs = () => {
    setPage((prevPage) => prevPage + 1);
    setDisplayedJobs(jobs.length);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedJobs = filteredJobs.sort((a, b) => {
    if (sortBy === "highest salary") {
      return (b.salary?.minimum || 0) - (a.salary?.minimum || 0);
    } else if (sortBy === "lowest salary") {
      return (a.salary?.minimum || 0) - (b.salary?.minimum || 0);
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
                onClick={() => fetchJobs(searchTerm)}
              >
                Explore Now
              </Button>
            </Box>
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
              <JobCardDetails
                title={job.title}
                company={job.company}
                salaryRange={job.salary}
                timeAgo={job.created}
                employmentType={job.employment_type}
                remote={job.remote}
                description={job.description}
                companyLogo={job.company?.logo}
                redirectUrl={job.redirect_url}
              />
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        <Box display="flex" justifyContent="center" mt={4}>
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
      </Container>
      <br />
      <Subscribe/>
      <Footer />
    </>
  );
};

export default Job;
