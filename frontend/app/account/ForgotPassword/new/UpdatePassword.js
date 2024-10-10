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

const StyledCard = styled(Card)({
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  maxWidth: 600,
  margin: "auto",
  borderRadius: 16,
  boxShadow: "none",
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

export default function UpdatePassword({ token, onBackToLogin }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    let valid = true;
    let errorObj = {};

    if (!newPassword) {
      errorObj.newPassword = "New password is required";
      valid = false;
    } else if (newPassword.length < 6) {
      errorObj.newPassword = "Password must be at least 6 characters long";
      valid = false;
    }

    if (newPassword !== confirmPassword) {
      errorObj.confirmPassword = "Passwords do not match";
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
      const response = await axios.post(`http://localhost:5000/api/reset-password/${token}`, {
        password: newPassword,
      });
      setSuccessMessage("Password has been updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (error) {
      console.error("Error submitting the form", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Failed to update password. Please try again.",
      }));
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Update Password
        </Typography>

        <form onSubmit={handleSubmit}>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <FormField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />

          <FormField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <FooterContainer>
            <Button type="submit" variant="contained" color="primary">
              Update Password
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
