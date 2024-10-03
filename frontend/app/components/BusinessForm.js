import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Grid,
  AppBar,
  Toolbar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Nav

const industryOptions = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "AI and Machine Learning",
  "Other",
];

const provinceAreaData = {
  Gauteng: ["Johannesburg", "Pretoria", "Soweto", "Centurion"],
  "Western Cape": ["Cape Town", "Stellenbosch", "Paarl", "George"],
  "Eastern Cape": ["Port Elizabeth", "East London", "Mthatha", "King William’s Town"],
  Limpopo: ["Polokwane", "Thohoyandou", "Tzaneen", "Bela-Bela"],
  Mpumalanga: ["Nelspruit", "Witbank", "Secunda", "Barberton"],
  "North West": ["Rustenburg", "Mahikeng", "Klerksdorp", "Brits"],
  "Northern Cape": ["Kimberley", "Upington", "Springbok", "Kuruman"],
  "Free State": ["Bloemfontein", "Welkom", "Sasolburg", "Bethlehem"],
  "KwaZulu-Natal": ["Durban", "Pietermaritzburg", "Richards Bay", "Ladysmith"],
};

const provincesData = Object.keys(provinceAreaData);

const BusinessForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    province: "",
    area: "",
    phone: "",
    description: "",
    industry: "",
    otherIndustry: "",
    email: "",
    website: "",
    image: "",
    logo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIndustryChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      industry: value,
      otherIndustry: value === "Other" ? "" : formData.otherIndustry,
    });
  };

  const handleProvinceChange = (e) => {
    setFormData({
      ...formData,
      province: e.target.value,
      area: "", // Reset area when province changes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/business/new", {
        ...formData,
        owner: "YOUR_USER_ID",
      });
      console.log(response.data);
      setFormData({
        name: "",
        province: "",
        area: "",
        phone: "",
        description: "",
        industry: "",
        otherIndustry: "",
        email: "",
        website: "",
        image: "",
        logo: "",
      });
    } catch (error) {
      console.error("There was an error creating the business listing!", error);
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h4: {
        fontFamily: "'Source Serif Pro', serif",
      },
      body1: {
        fontSize: "0.875rem",
      },
    },
    palette: {
      primary: {
        main: "#000000",
      },
      background: {
        default: "#f5f5f5",
      },
      text: {
        primary: "#000000",
        secondary: "#666666",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: "0px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "& .MuiInputBase-input": {
              color: "#000000",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#000000",
              },
              "&:hover fieldset": {
                borderColor: "#000000",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#000000",
              },
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#000000",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: "#000000",
          },
          select: {
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "0px",
            "&:focus": {
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ height: '48px' }}>
        <Toolbar variant="dense">
          <Button color="inherit" href="/" sx={{ mr: 2 }}>
            Return to Home
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            p: 4,
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
            mt: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#000000", fontWeight: "bold" }}>
            Share Your Business with the Community, <strong>Sisonke!</strong>
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: "#000000" }}>
            Tell us more about your business
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Business Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Industry</InputLabel>
                  <Select
                    value={formData.industry}
                    name="industry"
                    onChange={handleIndustryChange}
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="" disabled>Select Industry</MenuItem>
                    {industryOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Province</InputLabel>
                  <Select
                    value={formData.province}
                    name="province"
                    onChange={handleProvinceChange}
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="" disabled>Select Province</MenuItem>
                    {provincesData.map((province) => (
                      <MenuItem key={province} value={province}>
                        {province}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Area</InputLabel>
                  <Select
                    value={formData.area}
                    name="area"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="" disabled>Select Area</MenuItem>
                    {formData.province
                      ? provinceAreaData[formData.province].map((area) => (
                          <MenuItem key={area} value={area}>
                            {area}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit Business
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <footer
          style={{
            marginTop: "20px",
            padding: "10px 0",
            textAlign: "center",
            backgroundColor: "#000000",
            color: "#ffffff",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="body1" color="textSecondary">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </footer>
      </Container>
    </ThemeProvider>
  );
};

export default BusinessForm;