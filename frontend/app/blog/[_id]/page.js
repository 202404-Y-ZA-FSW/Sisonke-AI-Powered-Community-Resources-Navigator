"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Box, Typography, CircularProgress, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import Navigation from "@/app/components/sections/Navigation";
import Subscribe from "@/app/components/sections/Subscribe";
import Footer from "@/app/components/sections/Footer";
import BlogTextToSpeech from "./play";

export default function SingleBlogPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!params._id) {
        console.log("No ID available yet");
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const id = params._id;
        const response = await axios.get(`http://localhost:5000/blogs/blog/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlog(response.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params._id]);

  const handlePlay = async (text) => {
    try {
      const response = await fetch("http://localhost:5000/blogs/blog/convert-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        audio.play();
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const formatContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <Typography variant="body1" paragraph key={index}>
        {paragraph}
      </Typography>
    ));
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box>
          <Typography variant="h4" color="error">
            Error: {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <Navigation />
      {blog ? (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
              padding: 3,
              borderRadius: 2,
              boxShadow: 2,
              marginBottom: 4,
            }}
          >
            {blog.imageUrl && (
              <Box
                component="img"
                src={blog.imageUrl}
                alt={blog.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  mb: 3,
                  boxShadow: 2,
                }}
              />
            )}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "2.5rem", md: "3.75rem" },
                }}
              >
                {blog.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 4,
                  color: "text.secondary",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                {blog.readTime} Minutes Read | Date: {new Date(blog.createdAt).toLocaleDateString()}
              </Typography>
              <IconButton
                size="large"
                sx={{
                  backgroundColor: "#6c63ff",
                  color: "#ffffff",
                  marginBottom: 2,
                }}
                onClick={() => handlePlay(blog.content)}
              >
                <PlayArrowIcon />
              </IconButton>
            </Box>
            <Box>
              {formatContent(blog.content)}
            </Box>
            <Typography variant="body2" sx={{ mt: 4, fontStyle: 'italic', color: "text.secondary" }}>
              Author: {blog.author.username}
            </Typography>
          </Box>
        </Container>
      ) : (
        <Typography variant="h4">Blog not found</Typography>
      )}
      <Subscribe />
      <Footer />
    </React.Fragment>
  );
}
