import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Container,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ForumSearch() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
        py: { xs: 4, md: 8 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "2.5rem", md: "3.75rem" },
          }}
        >
          Community forums
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 4,
            color: "text.secondary",
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          Communicate with community members, share resources, and ask questions.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search"
            InputProps={{
              sx: { borderRadius: "16px", width: "100%" },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            size="large"
            sx={{
              bgcolor: "#6c63ff",
              borderRadius: "16px",
              padding: "15px 24px",
              color: "#ffffff",
              textTransform: "none",
              "&:hover": { bgcolor: "#5A52D5" },
              px: 4,
            }}
          >
            Search
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
