"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  Alert,
  Container,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Facebook, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useAuthentication } from "../../hooks/useAuthentication";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f9a825",
    },
    secondary: {
      main: "#4267B2",
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "12px 0",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      },
    },
  },
});

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuthentication();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/account/login",
        formData
      );
      const { token, ...user } = response.data;

      await login(token, user);

      if(user.user.status==='restricted'){
        router.push("/account/login");
        setError("You have been blocked from accessing the website");
      }else{
        if (user.user.role === "administrator") {
          router.push("/dashboard");
        } else if (user.user.role === "ngo") {
          router.push("/");
        } else {
          router.push("/");
        }
      }
      
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message || "An error occurred during login."
        );
      } else if (error.request) {
        setError("No response received from the server.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
        }}
      >
        <Container maxWidth="sm">
          <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
            <CardContent sx={{ padding: "40px" }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 4, textAlign: "center", color: "#333" }}
              >
                Welcome Back
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
                  {error}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  placeholder="Username"
                  variant="outlined"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    sx: { borderRadius: "8px" },
                  }}
                />
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  variant="outlined"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    sx: { borderRadius: "8px" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  fullWidth
                  sx={{
                    mb: 3,
                    color: "#ffffff",
                    backgroundColor: "#6c63ff",
                    "&:hover": { backgroundColor: "#5A52D5" },
                  }}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Link
                  href="/account/forgotPassword"
                  underline="none"
                  sx={{ color: "#f9a825", fontSize: "0.875rem", fontWeight: 500 }}
                >
                  Forgot password?
                </Link>
                <Link
                  href="/account/register"
                  underline="none"
                  sx={{ color: "#f9a825", fontSize: "0.875rem", fontWeight: 500 }}
                >
                  Create an account
                </Link>
              </Box>
              <Divider sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              <Button
                fullWidth
                startIcon={<Facebook />}
                sx={{ 
                  mb: 2,
                  backgroundColor: "#1877F2",
                  color: "white",
                  "&:hover": { backgroundColor: "#166FE5" },
                }}
              >
                Continue with Facebook
              </Button>
              <Button
                fullWidth
                startIcon={<Google />}
                sx={{
                  backgroundColor: "#DB4437",
                  color: "white",
                  "&:hover": { backgroundColor: "#C53929" },
                }}
              >
                Continue with Google
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
