"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import ForumCard from "../forum/ForumCard";
import CreatePostForm from "../forum/CreatePostForm";
import { getPosts, createPost } from "../forum/lib/api";
import ForumSearch from "./Search";
import Navbar from "../components/sections/NavBar";
import Footer from "../components/sections/Footer";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);
    setIsLoading(false);
  };

  const handleCreatePost = async (newPost) => {
    const createdPost = await createPost(newPost);
    setPosts([createdPost, ...posts]);
    setIsCreating(false);
  };

  return (
    <React.Fragment>
      <Navbar />
      <ForumSearch />
      <Container sx={{ marginBottom: 10, marginTop: 10 }} maxWidth="lg">
        <Box sx={{ my: 4 }}>
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
          {isCreating && (
            <CreatePostForm
              onSubmit={handleCreatePost}
              onCancel={() => setIsCreating(false)}
            />
          )}
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            posts.map((post) => (
              <ForumCard key={post._id} post={post} onUpdate={fetchPosts} />
            ))
          )}
        </Box>
      </Container>
      <Footer/>
    </React.Fragment>
  );
}
