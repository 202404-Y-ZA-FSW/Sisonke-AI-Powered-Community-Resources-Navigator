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
  Button,
  Modal,
  Fade,
  Backdrop,
  MenuItem,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/system";
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/NavBar";
import Subscribe from "../components/sections/Subscribe";
import { useAuthentication } from "../hooks/useAuthentication";
import axios from "axios";

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

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  padding: '32px',
  width: '90%',
  maxWidth: '800px',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    padding: '24px',
  },
}));

const FormField = styled(TextField)({
  marginBottom: 24,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

const SubmitButton = styled(Button)({
  marginTop: 16,
  borderRadius: '8px',
  padding: '12px 24px',
});

const industries = [
  "Agriculture",
  "Construction",
  "Education",
  "Finance",
  "Healthcare",
  "Hospitality",
  "IT and Technology",
  "Manufacturing",
  "Retail",
  "Transportation",
];

// Business Page
const Business = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newBusiness, setNewBusiness] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    category: '',
    description: '',
    website: '',
    image: '',
    logo: '',
    owner: '',
  });
  const [errors, setErrors] = useState({});
  const { user } = useAuthentication();

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

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewBusiness({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      category: '',
      description: '',
      website: '',
      image: '',
      logo: '',
      owner: '',
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBusiness(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let valid = true;
    let errorObj = {};

    if (!newBusiness.name) {
      errorObj.name = "Business name is required";
      valid = false;
    }

    if (!newBusiness.email) {
      errorObj.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(newBusiness.email)) {
      errorObj.email = "Invalid email address";
      valid = false;
    }

    if (!newBusiness.phone) {
      errorObj.phone = "Phone is required";
      valid = false;
    }

    if (!newBusiness.address) {
      errorObj.address = "Address is required";
      valid = false;
    }

    if (!newBusiness.city) {
      errorObj.city = "City is required";
      valid = false;
    }

    if (!newBusiness.category) {
      errorObj.category = "Industry is required";
      valid = false;
    }

    if (!newBusiness.description) {
      errorObj.description = "Description is required";
      valid = false;
    }

    if (!newBusiness.image) {
      errorObj.image = "Image URL is required";
      valid = false;
    }

    if (!newBusiness.logo) {
      errorObj.logo = "Logo URL is required";
      valid = false;
    }

    if (!newBusiness.owner) {
      errorObj.owner = "Owner is required";
      valid = false;
    }

    setErrors(errorObj);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/business/new", newBusiness);
      console.log("Response:", response.data);

      setBusinesses([...businesses, response.data]);
      handleModalClose();
    } catch (error) {
      console.error("Error submitting the form", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Failed to submit. Please try again.",
      }));
    }
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
            
            {user && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleModalOpen}
                  sx={{ borderRadius: "20px", padding: "10px 20px" }}
                >
                  Post A Business
                </Button>
              </Box>
            )}
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

      <StyledModal
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <ModalContent>
            <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
              Register Your Business
            </Typography>

            <form onSubmit={handleSubmit}>
              {errors.general && <Alert severity="error" sx={{ mb: 3 }}>{errors.general}</Alert>}

              <FormField
                label="Business Name"
                name="name"
                value={newBusiness.name}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
              />

              <FormField
                label="Email"
                type="email"
                name="email"
                value={newBusiness.email}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />

              <FormField
                label="Phone"
                name="phone"
                value={newBusiness.phone}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone}
              />

              <FormField
                label="Address"
                name="address"
                value={newBusiness.address}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.address}
                helperText={errors.address}
              />

              <FormField
                label="City"
                name="city"
                value={newBusiness.city}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.city}
                helperText={errors.city}
              />

              <FormField
                select
                label="Industry"
                name="category"
                value={newBusiness.category}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.category}
                helperText={errors.category}
              >
                {industries.map((ind, idx) => (
                  <MenuItem key={idx} value={ind}>
                    {ind}
                  </MenuItem>
                ))}
              </FormField>

              <FormField
                label="Business Description"
                name="description"
                value={newBusiness.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description}
              />

              <FormField
                label="Website"
                name="website"
                value={newBusiness.website}
                onChange={handleInputChange}
                fullWidth
              />

              <FormField
                label="Image URL"
                name="image"
                value={newBusiness.image}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.image}
                helperText={errors.image}
              />

              <FormField
                label="Logo URL"
                name="logo"
                value={newBusiness.logo}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.logo}
                helperText={errors.logo}
              />

              <FormField
                label="Owner"
                name="owner"
                value={newBusiness.owner}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.owner}
                helperText={errors.owner}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button onClick={handleModalClose} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <SubmitButton type="submit" variant="contained" color="primary">
                  Submit
                </SubmitButton>
              </Box>
            </form>
          </ModalContent>
        </Fade>
      </StyledModal>
    </div>
  );
};

export default Business;
