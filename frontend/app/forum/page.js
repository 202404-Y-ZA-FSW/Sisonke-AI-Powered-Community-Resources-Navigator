"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, CircularProgress, Typography, Button } from "@mui/material";
import ForumCard from "../forum/ForumCard";
import ForumSearch from "./Search";
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/Navigation";
import { useAuthentication } from "../hooks/useAuthentication";
import CreatePostForm from "./CreatePostForm";
import Subscribe from "../components/sections/Subscribe";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthentication();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/forums/");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Navigation />
      <ForumSearch />
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
            />
          )}
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            posts.map((post) => (
              <ForumCard key={post._id} post={post} userId={user.user.id} onUpdate={fetchPosts} />
            ))
          )}
        </Box>
      </Container>
      <Subscribe/>
      <Footer/>
    </React.Fragment>
  );
}
