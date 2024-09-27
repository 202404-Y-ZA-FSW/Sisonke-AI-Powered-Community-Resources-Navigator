import React from "react";
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

const LeaderImage = require("./Images/lead.jpg");
const InterviewImage = require("./Images/interview.jpg");
const FriendsImage = require("./Images/friends.jpg");

const blogPosts = [
  {
    id: 1,
    title: "5 Leadership Skills You Need to Succeed",
    description:
      "A great leader is someone that embodies several strengths and skills all at once. All great lead...",
    image: LeaderImage,
    readTime: "8 min Read",
  },
  {
    id: 2,
    title: "How to Make Friends While Working Remotely",
    description:
      "Since remote work became more common, employees have shared that bonding with their teams has bec...",
    image: FriendsImage,
    readTime: "11 min Read",
  },
  {
    id: 3,
    title: "What Not to Say During a Job Interview",
    description:
      "When you finally get that interview its easy to become extremely excited (and nervous). Whether...",
    image: InterviewImage,
    readTime: "9 min Read",
  },
];

export default function Blogs() {
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
        Add insight to boost career growth and check out tips on company job
        vacancies
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {blogPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
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
                src={post.image}
                alt={post.title}
                style={{ borderRadius: "16px", objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {post.readTime}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ marginLeft: 1 }}>
                <Button
                  size="small"
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
        >
          Browse All
        </Button>
      </Box>
    </Container>
  );
}
