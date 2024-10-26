import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Container,
} from "@mui/material";

export default function Hero() {
  const { t } = useTranslation();

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
          {t("hero.title")} 
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 4,
            color: "text.secondary",
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          {t("hero.subtitle")} 
        </Typography>
      </Container>
    </Box>
  );
}
