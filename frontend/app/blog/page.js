"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  TextField,
  InputAdornment,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Subscribe from "../components/sections/Subscribe";
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/Navigation";

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:5000/blogs/all");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts.");
        }
        const data = await response.json();
        console.log(data);

        // Ensure data is always an array of objects with _id property
        const formattedData = Array.isArray(data)
          ? data.filter((post) => post && typeof post === "object" && post._id)
          : Object.values(data).filter(
              (post) => post && typeof post === "object" && post._id
            );

        setBlogPosts(formattedData);
        setFilteredPosts(formattedData);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.author.username.toLowerCase().includes(term)
    );

    setFilteredPosts(filtered);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Navigation />
      <Box
        sx={{
          background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
          py: { xs: 4, md: 8 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.75rem" },
            }}
          >
            Explore Popular Blogs
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 4,
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Add insight to boost career growth and check out tips on company job
            vacancies
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                sx: { borderRadius: "16px", width: "100%" },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          textAlign: "center",
          mt: 5,
          px: 2,
        }}
      >
        {filteredPosts && filteredPosts.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    mb: 4,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #ddd",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="subtitle2" color="text.secondary">
                        By {post.author.username || "Unknown Author"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(post.createdAt).toLocaleDateString() ||
                          "Invalid Date"}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.content
                        ? post.content.substring(0, 100)
                        : "No content available"}
                      ...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={`/blog/${post._id}`} passHref legacyBehavior>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: "100%" }}
                      >
                        Read More
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">
            No blog posts available at the moment.
          </Typography>
        )}

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary">
            Browse All Blogs
          </Button>
        </Box>
      </Box>
      <Subscribe />
      <Footer />
    </React.Fragment>
  );
}
