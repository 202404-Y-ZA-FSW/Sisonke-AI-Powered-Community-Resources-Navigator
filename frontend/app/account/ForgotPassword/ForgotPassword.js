import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const StyledCard = styled(Card)( {
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  maxWidth: 600,
  margin: "auto",
  borderRadius: 16,
  boxShadow: "none",
});

const FormField = styled(TextField)( {
  marginBottom: 16,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

const FooterContainer = styled(Box)( {
  display: "flex",
  justifyContent: "center",
  marginTop: 16,
});

export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    let valid = true;
    let errorObj = {};

    if (!email) {
      errorObj.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorObj.email = "Invalid email address";
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
      const response = await axios.post("http://localhost:5000/api/forgot-password", {
        email,
      });
      setSuccessMessage("A reset link has been sent to your email.");
      setEmail("");
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
          Forgot Password
        </Typography>

        <form onSubmit={handleSubmit}>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <FormField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />

          <FooterContainer>
            <Button type="submit" variant="contained" color="primary">
              Send Reset Link
            </Button>
            <Button variant="text" onClick={onBackToLogin}>
              Back to Login
            </Button>
          </FooterContainer>
        </form>
      </CardContent>
    </StyledCard>
  );
}
