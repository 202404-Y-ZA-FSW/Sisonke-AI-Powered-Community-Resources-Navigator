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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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
        <Box sx={{ mt: 4 }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              defaultExpanded={index === 0}
              sx={{
                mb: 2,
                "&:before": { display: "none" },
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "16px !important",
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "all 0.3s",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography variant="h6">{`${index + 1}. ${
                  faq.question
                }`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    background:
                      "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
                    padding: "15px",
                    borderRadius: "16px",
                    color: "text.secondary",
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
