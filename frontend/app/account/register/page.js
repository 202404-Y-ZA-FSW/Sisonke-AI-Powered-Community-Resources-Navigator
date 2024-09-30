import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import sisonkeImage from "../register/sisonke.jpg";

import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";

function Signup() {
  return (
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
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Your Full Name"
              name="fullName"
              autoComplete="name"
              autoFocus
              InputProps={{ sx: { borderRadius: "50px" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Your Unique Username"
              name="username"
              autoComplete="username"
              InputProps={{ sx: { borderRadius: "50px" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Create a Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{ sx: { borderRadius: "50px" } }}
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
            <Typography align="center" variant="body2">
              or connect with
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Button
                  startIcon={<GoogleIcon />}
                  variant="contained"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    borderRadius: "50px",
                    backgroundColor: "#DB4437",
                    color: "white",
                    "&:hover": { backgroundColor: "#C53929" },
                  }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<FacebookIcon />}
                  variant="contained"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    borderRadius: "50px",
                    backgroundColor: "#4267B2",
                    color: "white",
                    "&:hover": { backgroundColor: "#365e8d" },
                  }}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
export default Signup;
