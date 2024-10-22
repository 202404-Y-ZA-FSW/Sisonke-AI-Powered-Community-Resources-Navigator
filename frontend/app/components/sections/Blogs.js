import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import Image from "next/image";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/blogs/latest-blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const handleBrowseAll = () => {
    // Fetch all blogs
    axios
      .get("http://localhost:5000/blogs/all")
      .then((response) => {
        setBlogs(response.data);
        setShowAll(true);
      })
      .catch((error) => {
        console.error("Error fetching all blogs:", error);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Latest news about career advice
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        paragraph
      >
        Add insight to boost career growth and check out tips on company job vacancies
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {blogs.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                boxShadow: "none",
                background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "all 0.3s",
                },
              }}
            >
              <Image
                height="200"
                width="361"
                src={post.imageURI || "/placeholder.jpg"}
                alt={post.title}
                style={{ borderRadius: "16px", objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {post.readTime} min Read
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content.substring(0, 100)}...
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
      {!showAll && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            sx={{
              borderRadius: "15px",
              backgroundColor: "#6c63ff",
              color: "#ffffff",
              textTransform: "none",
              padding: "8px 30px",
            }}
            size="large"
            onClick={handleBrowseAll}
          >
            Browse All
          </Button>
        </Box>
      )}
    </Container>
  );
}
