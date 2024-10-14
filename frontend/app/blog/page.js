"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

import { useAuthentication } from "../hooks/useAuthentication";

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuthentication();
  const canCreatePost =
    user && (user.user.role === "administrator" || user.user.role === "ngo");

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

  const limitContent = (content, lines = 3) => {
    const words = content.split(" ");
    const lineHeight = 1.5;
    const maxHeight = lineHeight * lines;
    let result = "";
    let currentHeight = 0;

    for (let word of words) {
      const testString = result + word + " ";
      const testHeight =
        (testString.split("\n").length +
          (testString.match(/\S+/g) || []).length / 10) *
        lineHeight;

      if (testHeight > maxHeight) {
        return result.trim() + "...";
      }

      result = testString;
      currentHeight = testHeight;
    }

    return result.trim();
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
      <Container
        maxWidth="lg"
        sx={{
          mt: 5,
          px: 2,
        }}
      >
        {canCreatePost ? (
          <Button
            color="primary"
            href="/blog/new"
            sx={{
              mb: 2,
              backgroundColor: "#6c63ff",
              color: "#ffffff",
              borderRadius: "16px",
              padding: "15px 24px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#5A52D5" },
            }}
          >
            Create New Post
          </Button>
        ) : (
          <Typography
            variant="body2"
            sx={{ marginBottom: 2, color: "#6c63ff" }}
          >
            {user
              ? "You don't have permission to create a new post."
              : "You need to login to create a new post."}
          </Typography>
        )}
        {filteredPosts && filteredPosts.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    boxShadow: "none",
                    background:
                      "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
                    "&:hover": {
                      transform: "scale(1.02)",
                      transition: "all 0.3s",
                    },
                  }}
                >
                  <Image
                    height="200"
                    width="361"
                    src={post.imageURI}
                    alt={post.title}
                    style={{ borderRadius: "16px", objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {post.readTime} Minutes Read | {post.author.username}
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {limitContent(post.content, 3)}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ marginLeft: 1 }}>
                    <Button
                      size="small"
                      href={`/blog/${post._id}`}
                      sx={{
                        borderRadius: "16px",
                        backgroundColor: "#ffffff",
                        color: "#6c63ff",
                        border: "1px solid #6c63ff",
                        textTransform: "none",
                        padding: "5px 15px",
                      }}
                    >
                      Read More
                    </Button>
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
      </Container>
      <Subscribe />
      <Footer />
    </React.Fragment>
  );
}
