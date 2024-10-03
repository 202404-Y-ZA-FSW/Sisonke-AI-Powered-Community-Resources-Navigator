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
import NavBar from "./NavBar"; // Adjust the path if necessary
import Footer from "./Footer"; // Adjust the path if necessary

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

const provinces = [
  { name: "Eastern Cape", areas: ["East London", "Port Elizabeth"] },
  { name: "Free State", areas: ["Bloemfontein"] },
  { name: "Gauteng", areas: ["Johannesburg", "Pretoria"] },
  { name: "KwaZulu-Natal", areas: ["Durban", "Pietermaritzburg"] },
  { name: "Limpopo", areas: ["Polokwane"] },
  { name: "Mpumalanga", areas: ["Nelspruit"] },
  { name: "Northern Cape", areas: ["Kimberley"] },
  { name: "North West", areas: ["Rustenburg"] },
  { name: "Western Cape", areas: ["Cape Town"] },
];

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

const BusinessListing = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [province, setProvince] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [areas, setAreas] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const selectedProvince = provinces.find((prov) => prov.name === province);
    setAreas(selectedProvince ? selectedProvince.areas : []);
    setArea(""); 
  }, [province]);

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

    if (!industry) {
      errorObj.industry = "Industry is required";
      valid = false;
    }

    if (!province) {
      errorObj.province = "Province is required";
      valid = false;
    }

    if (!area) {
      errorObj.area = "Area is required";
      valid = false;
    }

    if (!description) {
      errorObj.description = "Description is required";
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
      const response = await axios.post("http://localhost:5000/api/business", {
        businessName,
        businessEmail,
        industry,
        province,
        area,
        description,
      });
      console.log("Response:", response.data);

      setBusinessName("");
      setBusinessEmail("");
      setIndustry("");
      setProvince("");
      setArea("");
      setDescription("");
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
    <>
      <NavBar />
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
              select
              label="Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              fullWidth
              error={!!errors.province}
              helperText={errors.province}
            >
              {provinces.map((prov, idx) => (
                <MenuItem key={idx} value={prov.name}>
                  {prov.name}
                </MenuItem>
              ))}
            </FormField>

            <FormField
              select
              label="Area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              fullWidth
              disabled={!province}
              error={!!errors.area}
              helperText={errors.area}
            >
              {areas.map((a, idx) => (
                <MenuItem key={idx} value={a}>
                  {a}
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

            <FooterContainer>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </FooterContainer>
          </form>
        </CardContent>
      </StyledCard>
      <Footer />
    </>
  );
};

export default BusinessListing;
