"use client";

import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/Navigation";
import Subscribe from "../components/sections/Subscribe";

const StyledCard = styled(Card)({
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  maxWidth: 300, 
  margin: "auto",
  borderRadius: 16,
  boxShadow: "none",
  height: 250, 
  transition: "transform 0.3s ease",
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "100px", 
  objectFit: "contain",
  transition: "0.3s",
});

const DiscountOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 2,
  transition: "opacity 0.3s ease",
  borderRadius: 12,
  textAlign: "center",
  padding: "16px",
  zIndex: 1,
});

const IconBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "8px",
});

const Icon = styled("span")({
  marginRight: "8px",
  color: "#000",
});

// Business Page
const Business = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch("http://localhost:5000/business/all");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched businesses:", data);

        if (Array.isArray(data.businesses)) {
          setBusinesses(data.businesses);
        } else {
          console.error("Fetched data is not an array:", data);
          setBusinesses([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navigation />
      <Container>
        {/* Business Search Header */}
        <Box
          sx={{
            py: 10,
            background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
            width: "100vw",
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.75rem" }, 
                textAlign: "center",
              }}
            >
              Discover Local Businesses
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 4,
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.25rem" }, 
                textAlign: "center",
              }}
            >
              Find the best services and products in your community, <br />
              or search for a specific business by name.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <TextField
                variant="outlined"
                placeholder="Search"
                InputProps={{
                  sx: { borderRadius: "16px", width: "100%" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
          </Container>
        </Box>

        <Container sx={{ pt: 2 }}>
          {/* Business Cards */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {filteredBusinesses.map((business) => (
              <Grid item xs={12} sm={6} md={4} key={business._id}>
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <StyledCard>
                    <StyledCardMedia
                      component="img"
                      image={business.image}
                      alt={business.name}
                    />
                    <CardContent>
                      <Typography variant="h5" sx={{ color: "#000" }}>
                        {business.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {business.description}
                      </Typography>
                      {/* Location */}
                      <IconBox>
                        <Icon>
                          <LocationOnIcon />
                        </Icon>
                        <Typography variant="body2">
                          {business.address}, {business.city}
                        </Typography>
                      </IconBox>
                    </CardContent>

                    {/* Discount Overlay */}
                    {business.discount && (
                      <DiscountOverlay>
                        <Typography variant="h6">{business.discount}</Typography>
                      </DiscountOverlay>
                    )}
                  </StyledCard>
                </a>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Business;
