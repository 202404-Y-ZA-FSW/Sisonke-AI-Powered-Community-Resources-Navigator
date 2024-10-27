"use client";
import React, { useState } from "react";
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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(); 
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
  const [owner, setOwner] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let errorObj = {};

    if (!businessName) {
      errorObj.name = t("businessForm.errors.name"); 
      valid = false;
    }

    if (!businessEmail) {
      errorObj.email = t("businessForm.errors.email");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(businessEmail)) {
      errorObj.email = t("businessForm.errors.invalidEmail");
      valid = false;
    }

    if (!phone) {
      errorObj.phone = t("businessForm.errors.phone"); 
      valid = false;
    }

    if (!address) {
      errorObj.address = t("businessForm.errors.address"); 
      valid = false;
    }

    if (!city) {
      errorObj.city = t("businessForm.errors.city");
      valid = false;
    }

    if (!industry) {
      errorObj.industry = t("businessForm.errors.industry"); 
      valid = false;
    }

    if (!description) {
      errorObj.description = t("businessForm.errors.description");
    }

    if (!image) {
      errorObj.image = t("businessForm.errors.image");
      valid = false;
    }

    if (!logo) {
      errorObj.logo = t("businessForm.errors.logo");
      valid = false;
    }
    
    if (!owner) {
      errorObj.owner = t("businessForm.errors.owner");
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
      setOwner("");
      setErrors({});
    } catch (error) {
      console.error("Error submitting the form", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: t("businessForm.errors.general"),
      }));
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {t("businessForm.title")} 
        </Typography>

        <form onSubmit={handleSubmit}>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}

          <FormField
            label={t("businessForm.labels.businessName")}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />

          <FormField
            label={t("businessForm.labels.email")}
            type="email"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />

          <FormField
            label={t("businessForm.labels.phone")} 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <FormField
            label={t("businessForm.labels.address")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            error={!!errors.address}
            helperText={errors.address}
          />

          <FormField
            label={t("businessForm.labels.city")} 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            error={!!errors.city}
            helperText={errors.city}
          />

          <FormField
            select
            label={t("businessForm.labels.industry")} 
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
            label={t("businessForm.labels.description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description}
          />

          <FormField
            label={t("businessForm.labels.website")}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            fullWidth
          />

          <FormField
            label={t("businessForm.labels.image")}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            error={!!errors.image}
            helperText={errors.image}
          />

          <FormField
            label={t("businessForm.labels.logo")}
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            fullWidth
            error={!!errors.logo}
            helperText={errors.logo}
          />
          
          <FormField
            label={t("businessForm.labels.owner")} 
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            fullWidth
            error={!!errors.owner}
            helperText={errors.owner}
          />

          <FooterContainer>
            <Button type="submit" variant="contained" color="primary">
              {t("businessForm.submit")} 
            </Button>
          </FooterContainer>
        </form>
      </CardContent>
    </StyledCard>
  );
}
