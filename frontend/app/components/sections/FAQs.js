import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useTranslation } from "react-i18next";

import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  borderRadius: "24px",
  padding: theme.spacing(6),
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px !important",
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  transition: "all 0.3s ease",
  "&:before": { display: "none" },
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  "& .MuiAccordionSummary-content": {
    margin: theme.spacing(2, 0),
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  background: "linear-gradient(135deg, #f0f9ff 0%, #fff9f0 100%)",
  borderRadius: "0 0 16px 16px",
  padding: theme.spacing(3),
}));

export default function FAQs() {
  const { t } = useTranslation();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/faqs/all");
        setFaqs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setError(t("FAQs.LoadError")); 
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [t]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
        paddingBottom: 6,
        paddingTop: 6,
      }}
    >
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {t("FAQs.Title")} 
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          {t("FAQs.Subtitle")} 
        </Typography>
        <StyledPaper>
          <Box sx={{ mt: 4 }}>
            {faqs.map((faq, index) => (
              <StyledAccordion key={index} defaultExpanded={index === 0}>
                <StyledAccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#444" }}>
                    {`${index + 1}. ${faq.question}`}
                  </Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                  <Typography sx={{ color: "#555" }}>
                    {faq.answer}
                  </Typography>
                </StyledAccordionDetails>
              </StyledAccordion>
            ))}
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
}
