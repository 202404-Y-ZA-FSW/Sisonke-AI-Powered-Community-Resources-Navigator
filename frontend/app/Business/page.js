"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Grid,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton, 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn"; 
import CloseIcon from "@mui/icons-material/Close"; 
import Subscribe from "../components/sections/Subscribe";
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/Navigation";
import { useAuthentication } from "../hooks/useAuthentication";
import { styled } from "@mui/system"; 
import BusinessForm from "./new/businessForm"; 

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
  const { user } = useAuthentication();
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const canPostABusiness =
    user && (user.user.role === "administrator" || user.user.role === "ngo");

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch("http://localhost:5000/business/all");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setBusinesses(Array.isArray(data.businesses) ? data.businesses : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navigation />
      <Container>
        
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
        <Container maxWidth="lg" sx={{ mt: 5, px: 2 }}>
          {canPostABusiness ? (
            <Button
              onClick={handleOpenModal} // Opens modal
              color="primary"
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
              Post a Business
            </Button>
          ) : (
            <Typography
              variant="body2"
              sx={{ marginBottom: 2, color: "#6c63ff" }}
            >
              {user
                ? "You don't have permission to create a new business."
                : "You need to login to create a new business."}
            </Typography>
          )}

          {/* Modal for Business Form */}
          <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
           
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            
            <DialogContent>
              <BusinessForm /> {/* Display the BusinessForm component */}
            </DialogContent>
            {/* Removed the DialogActions section */}
          </Dialog>

          {/* Business List */}
          <Grid container spacing={2}>
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
