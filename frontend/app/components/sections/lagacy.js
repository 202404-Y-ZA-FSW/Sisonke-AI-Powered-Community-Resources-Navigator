"use client";
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const GradientBackground = styled(Box)({
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  minHeight: "100vh",
  padding: "2rem",
});

const RoundedImage = styled(Image)({
  borderRadius: "20px",
});

const CategoryButton = styled(Button)({
  borderRadius: "20px",
  textTransform: "none",
  marginRight: "0.5rem",
  marginBottom: "0.5rem",
  padding: "0.25rem 1rem",
  backgroundColor: "#f0f0f0",
  color: "#333",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});

const SearchBar = styled(Box)({
  display: "flex",
  backgroundColor: "white",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const ExploreButton = styled(Button)({
  borderRadius: "10px",
  textTransform: "none",
  padding: "0.5rem 2rem",
  backgroundColor: "#6c63ff",
  color: "white",
  "&:hover": {
    backgroundColor: "#5a52d5",
  },
});

export default function Hero() {
  return (
    <GradientBackground>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={12}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Discover the best opportunities
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "#666", mb: 4 }}
            >
              This platform aims to bridge the information gap and foster community development through AI, Community forums, Job opportunities, and educational resources.
            </Typography>
            <SearchBar sx={{ mb: 4 }}>
              <TextField
                placeholder="Job Type"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& fieldset": { border: "none" } }}
              />
              <TextField
                placeholder="Location"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& fieldset": { border: "none" } }}
              />
              <ExploreButton disableElevation>
                Explore Now
              </ExploreButton>
            </SearchBar>
            <Box>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: "#666", mb: 1 }}
              >
                Popular Categories:
              </Typography>
              <CategoryButton variant="contained" disableElevation>
                UX Designer
              </CategoryButton>
              <CategoryButton variant="contained" disableElevation>
                Front-end Dev
              </CategoryButton>
              <CategoryButton variant="contained" disableElevation>
                Back-end Dev
              </CategoryButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </GradientBackground>
  );
}