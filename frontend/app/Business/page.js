"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios"; 

const StyledCard = styled(Card)({
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  maxWidth: 600,
  margin: "auto",
  borderRadius: 16,
  boxShadow: "none",
  "&:hover": {
    transform: "scale(1.02)",
    transition: "all 0.3s",
  },
});

const FormField = styled(TextField)({
  marginBottom: 16,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

const FooterContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: 16,
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

export default function BusinessForm() {
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let errorObj = {};

    if (!businessName) {
      errorObj.name = "Business name is required";
      valid = false;
    }

    if (!businessEmail) {
      errorObj.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(businessEmail)) {
      errorObj.email = "Invalid email address";
      valid = false;
    }

    if (!phone) {
      errorObj.phone = "Phone is required";
      valid = false;
    }

    if (!address) {
      errorObj.address = "Address is required";
      valid = false;
    }

    if (!city) {
      errorObj.city = "City is required";
      valid = false;
    }

    if (!industry) {
      errorObj.industry = "Industry is required";
      valid = false;
    }

    if (!description) {
      errorObj.description = "Description is required";
      valid = false;
    }

    if (!image) {
      errorObj.image = "Image URL is required";
      valid = false;
    }

    if (!logo) {
      errorObj.logo = "Logo URL is required";
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
      const response = await axios.post("http://localhost:5000/business/new", {
        name: businessName,
        email: businessEmail,
        phone,
        address,
        city,
        category: industry,
        description,
        website,
        image,
        logo,
        owner,
      });
      console.log("Response:", response.data);

      setBusinessName("");
      setBusinessEmail("");
      setPhone("");
      setAddress("");
      setCity("");
      setIndustry("");
      setDescription("");
      setWebsite("");
      setImage("");
      setLogo("");
      setErrors({});
    } catch (error) {
      console.error("Error submitting the form", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Failed to submit. Please try again.",
      }));
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Register Your Business
        </Typography>

        <form onSubmit={handleSubmit}>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}

          <FormField
            label="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />

          <FormField
            label="Email"
            type="email"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />

          <FormField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <FormField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            error={!!errors.address}
            helperText={errors.address}
          />

          <FormField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            error={!!errors.city}
            helperText={errors.city}
          />

          <FormField
            select
            label="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            fullWidth
            error={!!errors.industry}
            helperText={errors.industry}
          >
            {industries.map((ind, idx) => (
              <MenuItem key={idx} value={ind}>
                {ind}
              </MenuItem>
            ))}
          </FormField>

          <FormField
            label="Business Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description}
          />

          <FormField
            label="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            fullWidth
          />

          <FormField
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            error={!!errors.image}
            helperText={errors.image}
          />

          <FormField
            label="Logo URL"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            fullWidth
            error={!!errors.logo}
            helperText={errors.logo}
          />

          <FooterContainer>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </FooterContainer>
        </form>
      </CardContent>
    </StyledCard>
  );
}
