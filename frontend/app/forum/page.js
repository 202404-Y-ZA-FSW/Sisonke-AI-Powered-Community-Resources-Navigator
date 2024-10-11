"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import ForumCard from "../forum/ForumCard";
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/Navigation";
import { useAuthentication } from "../hooks/useAuthentication";
import CreatePostForm from "./CreatePostForm";
import Subscribe from "../components/sections/Subscribe";

import SearchIcon from "@mui/icons-material/Search";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuthentication();
  const userID = user ? user.user.id : null;

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [searchTerm, posts]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/forums/");
      setPosts(response.data);
      setFilteredPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPosts = () => {
    const filtered = posts.filter((post) => {
      const titleMatch =
        post.title &&
        typeof post.title === "string" &&
        post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const authorMatch =
        post.author &&
        typeof post.author === "string" &&
        post.author.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || authorMatch;
    });
    setFilteredPosts(filtered);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

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
            Community forums
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 4,
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Communicate with community members, share resources, and ask
            questions.
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
              placeholder="Search"
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
      <Container sx={{ marginBottom: 10, marginTop: 10 }} maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {user ? (
            <Button
              color="primary"
              onClick={() => setIsCreating(true)}
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
              You need to login to create a new post.
            </Typography>
          )}
          {isCreating && (
            <CreatePostForm
              onCancel={() => setIsCreating(false)}
              onPostCreated={fetchPosts}
            />
          )}
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            filteredPosts.map((post) => (
              <ForumCard
                key={post._id}
                post={post}
                userId={userID}
                onUpdate={fetchPosts}
              />
            ))
          )}
        </Box>
      </Container>
      <Subscribe />
      <Footer />
    </React.Fragment>
  );
}
