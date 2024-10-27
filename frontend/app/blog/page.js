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
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImageIcon from "@mui/icons-material/Image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Subscribe from "../components/sections/Subscribe";
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/Navigation";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuthentication } from "../hooks/useAuthentication";
import { useTranslation } from 'react-i18next';


export default function BlogPage() {
  const { t } = useTranslation();
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuthentication();
  const canCreatePost =
    user && (user.user.role === "administrator" || user.user.role === "ngo");

  const router = useRouter();

  const [formData, setFormData] = useState({
    imageURI: '',
    title: '',
    author: '',
    postedBy: user ? user.user.id : null,
    content: '',
    readTime: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:5000/blogs/latest-blogs");
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.imageURI) errors.imageURI = t('blog.imageURIRequired');
    if (!formData.title) errors.title = t('blog.titleRequired');
    if (!formData.content) errors.content = t('blog.contentRequired');
    if (!formData.readTime) errors.readTime = t('blog.readTimeRequired');
    if (!formData.author) errors.author = t('blog.authorRequired');
    return errors;
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
  
    setFormErrors({});
    try {
      const response = await axios.post('http://localhost:5000/blogs/blog/new', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: t('blog.postCreatedSuccess'),  
          severity: 'success',
        });
        handleCloseModal();
        // Refresh the blog posts
        const updatedResponse = await fetch("http://localhost:5000/blogs/latest-blogs");
        const updatedData = await updatedResponse.json();
        setBlogPosts(updatedData);
        setFilteredPosts(updatedData);
      } else {
        setSnackbar({
          open: true,
          message: t('blog.postCreationFailed'),  
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error submitting blog post:', error);
      setSnackbar({
        open: true,
        message: t('blog.submitError'),  
        severity: 'error',
      });
    }
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
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
        {t("blog.explorePopularBlogs")} 
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 4,
          color: "text.secondary",
          fontSize: { xs: "1rem", md: "1.25rem" },
        }}
      >
        {t("blog.addInsightTips")} 
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
          placeholder={t("blog.searchPlaceholder")} 
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
    onClick={handleOpenModal}
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
    {t("blog.createNewPost")} 
  </Button>
) : (
  <Typography
    variant="body2"
    sx={{ marginBottom: 2, color: "#6c63ff" }}
  >
    {user
      ? t("blog.noPermissionToCreate")  
      : t("blog.loginToCreatePost")}  
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
              {post.readTime} {t("blog.minutesRead")} | {post.author.username}
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
              {t("blog.readMore")}  
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
) : (
  <Typography variant="body1">
    {t("blog.noPostsAvailable")}  
  </Typography>
)}
</Container>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="create-blog-post-modal"
        aria-describedby="modal-to-create-new-blog-post"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}>
         <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
  {t("blog.createNewBlogPost")}  
</Typography>
<Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
  <TextField
    name="author"
    placeholder={t("blog.authorPlaceholder")}  
    variant="outlined"
    fullWidth
    value={formData.author}
    onChange={handleFormChange}
    error={!!formErrors.author}
    helperText={formErrors.author}
    sx={{ mb: 2 }}
  />
  <TextField
    name="imageURI"
    placeholder={t("blog.imageURIPlaceholder")}  
    variant="outlined"
    fullWidth
    value={formData.imageURI}
    onChange={handleFormChange}
    error={!!formErrors.imageURI}
    helperText={formErrors.imageURI}
    sx={{ mb: 2 }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <ImageIcon />
        </InputAdornment>
      ),
    }}
  />
  <TextField
    name="title"
    label={t("blog.blogTitle")}  
    variant="outlined"
    fullWidth
    value={formData.title}
    onChange={handleFormChange}
    error={!!formErrors.title}
    helperText={formErrors.title && t(`blog.${formErrors.title}`)}  
    sx={{ mb: 2 }}
  />
  <TextField
    name="readTime"
    label={t("blog.readTime")}  
    placeholder={t("blog.readTimePlaceholder")}  
    variant="outlined"
    fullWidth
    value={formData.readTime}
    onChange={handleFormChange}
    error={!!formErrors.readTime}
    helperText={formErrors.readTime}
    sx={{ mb: 2 }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <AccessTimeIcon />
        </InputAdornment>
      ),
    }}
  />
  <TextField
    name="content"
    label={t("blog.blogContent")}  
    variant="outlined"
    fullWidth
    multiline
    rows={6}
    value={formData.content}
    onChange={handleFormChange}
    error={!!formErrors.content}
    helperText={formErrors.content}
        sx={{ mb: 2 }}
  />
  <Button type="submit" variant="contained" color="primary" fullWidth>
    {t("blog.submitBlogPost")}  {/* Translated button text */}
  </Button>
</Box>
</Box>
</Modal>
<Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
  <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
    {snackbar.message}
  </Alert>
</Snackbar>
<Subscribe />
<Footer />

    </React.Fragment>
  );
}
