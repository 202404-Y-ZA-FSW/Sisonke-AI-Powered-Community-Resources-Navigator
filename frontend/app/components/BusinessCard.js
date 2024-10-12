import React, { useState } from "react"; 
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import Footer from "../components/sections/Footer";

const businessListings = [
  {
    _id: "1",
    name: "Cranium Medical Products",
    description: "Innovative medical products designed to improve patient care.",
    address: "456 Health Road, Pretoria",
    city: "Pretoria",
    phone: "(012) 234-5678",
    email: "info@craniummedical.co.za",
    website: "https://craniumsa.co.za/",
    image: "https://craniumsa.co.za/wp-content/uploads/2024/07/cranium-sa-secondary-logo-white-with-tagline-white.png",
  },
  {
    _id: "2",
    name: "Hot 102.7 FM",
    description: "Your home for the best music and entertainment in Johannesburg.",
    address: "789 Media Street, Johannesburg",
    city: "Johannesburg",
    phone: "(011) 345-6789",
    email: "info@hot1027.co.za",
    website: "https://hot1027.co.za/",
    image: "https://hot1027.co.za/wp-content/uploads/2024/06/logo-white-border.png",
  },
  {
    _id: "3",
    name: "Made by Mosaic",
    description: "Handcrafted mosaics and home decor items.",
    address: "321 Craft Lane, Cape Town",
    city: "Cape Town",
    phone: "(021) 456-7890",
    email: "info@madebymosaic.co.za",
    website: "https://madebymosaic.co.za/",
    image: "https://madebymosaic.co.za/wp-content/uploads/2024/02/Eco-Stamp.png",
  },
  {
    _id: "4",
    name: "KotaJoe",
    description: "Delicious kota and street food that will satisfy your cravings.",
    address: "15 Street Food Avenue, Johannesburg",
    city: "Johannesburg",
    phone: "(011) 123-4567",
    email: "info@kotajoe.co.za",
    website: "https://www.kotajoe.co.za/",
    image: "https://images.squarespace-cdn.com/content/v1/5be168c750a54f114181c104/1606825761778-F0SE3XPHG89WRIDM9NCU/Kota+Joe+Logo.png?format=1500w",
  },
  {
    _id: "5",
    name: "Saratoga Software",
    description: "Providing innovative software solutions for businesses.",
    address: "101 Software Lane, Cape Town",
    city: "Cape Town",
    phone: "(021) 111-2222",
    email: "info@saratogasoftware.co.za",
    website: "https://saratogasoftware.com/",
    image: "https://saratogasoftware.com/storage/2024/01/Saratoga-Software-Logo-White-and-Blue.png",
  },
  {
    _id: "6",
    name: "Varsity Vibe",
    description: "Connecting students with the best local services and deals.",
    address: "456 Student St, Cape Town",
    city: "Cape Town",
    phone: "(021) 234-5678",
    email: "info@varsityvibe.co.za",
    website: "https://varsityvibe.co.za/",
    image: "https://varsityvibe.co.za/assets/vv-logo.ce5e85af.svg",
  },
];

const StyledAppBar = styled(AppBar)({
  background: "linear-gradient(135deg, #fff5e6 0%, #e6f7ff 100%)",
  padding: "0 2rem",
  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
  borderRadius: "0 0 16px 16px",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledButton = styled(Button)({
  backgroundColor: "#1976d2",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#115293",
  },
});

const SearchBar = styled(TextField)({
  width: "300px",
  backgroundColor: "#f0f0f0",
  borderRadius: "20px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "#1976d2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px",
  },
});

const StyledCard = styled(Card)({
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  maxWidth: 345,
  margin: "auto",
  borderRadius: 16,
  boxShadow: "none",
  height: 400,
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "120px",
  objectFit: "contain",
  transition: "0.3s",
});

const BusinessCard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBusinesses = businessListings.filter((business) =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <StyledAppBar position="static">
        <StyledToolbar>
          <SearchBar
            variant="outlined"
            placeholder="Search businesses..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <StyledButton href="/app/Business/page.js">Register</StyledButton>
        </StyledToolbar>
      </StyledAppBar>

      <Container sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          {filteredBusinesses.map((business) => (
            <Grid item xs={12} sm={6} md={4} key={business._id}>
              <StyledCard>
                <StyledCardMedia
                  component="img"
                  image={business.image}
                  alt={business.name}
                />
                <CardContent>
                  <Typography variant="h5">{business.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {business.description}
                  </Typography>
                  <Typography variant="body1">{business.address}</Typography>
                  <Typography variant="body1">{business.city}</Typography>
                  <Typography variant="body1">{business.phone}</Typography>
                  <Typography variant="body1">{business.email}</Typography>
                  {business.website && (
                    <Typography variant="body1">
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {business.website}
                      </a>
                    </Typography>
                  )}
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </div>
  );
};

export default BusinessCard;
