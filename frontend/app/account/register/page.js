"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Grid,
  Paper,
  Avatar,
  Snackbar,
  Container,
  Alert,
} from "@mui/material";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/account/register", formData);
        setSnackbar({
          open: true,
          message: "Registration successful!",
          severity: "success",
        });
        // Reset form or redirect user
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Registration failed",
          severity: "error",
        });
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Header Section */}
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
      >
        <Typography variant="h6" fontWeight="bold">
          Township Resident
        </Typography>
        <Link
          href="#"
          variant="body2"
          sx={{
            alignSelf: "center",
            fontWeight: "bold",
            color: "black",
            textDecoration: "none",
          }}
        >
          Existing user? Sign in.
        </Link>
      </Grid>

      {/* Left Section (Discover) */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: "#D4A017",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="black">
            Discover local resources and
          </Typography>
          <Typography variant="h5" color="black">
            Find the perfect match for your needs!
          </Typography>
          <img
            src={"https://www.omniaccounts.co.za/wp-content/uploads/2022/10/How-to-register-a-new-small-business-in-south-africa.jpeg"}
            alt="sisonke"
            style={{
              width: "80%",
              maxWidth: "300px",
              margin: "16px 0",
            }}
          />
          <Typography variant="body1" sx={{ mt: 4, color: "black" }}>
            Explore local opportunities with ease!
          </Typography>
        </Box>
      </Grid>

      {/* Right Section (Form) */}
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "orange" }} />
          <Typography component="h1" variant="h5">
            Join SisonkeConnect
          </Typography>
          <Typography component="p" sx={{ color: "gray", mt: 1 }}>
            Unlock exclusive features, no commitment required
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Your Unique Username"
              name="username"
              autoComplete="username"
              InputProps={{ sx: { borderRadius: "50px" } }}
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{ sx: { borderRadius: "50px" } }}
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Create a Password"
              type="password"
              id="password"
              autoComplete="new-password"
              InputProps={{ sx: { borderRadius: "50px" } }}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              InputProps={{ sx: { borderRadius: "50px" } }}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#D4A017",
                color: "black",
                borderRadius: "50px",
                "&:hover": { backgroundColor: "#D4A017" },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
    </Container>
  );
}

export default Register;
