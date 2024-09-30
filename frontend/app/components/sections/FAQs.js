import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What is Sisonke AI-Powered Resource Navigator?",
    answer:
      "Your application goes right to team members you would be working with. You can manage all your applications in one place, apply in two clicks, and get feedback from teams in just a few days.",
  },
  {
    question: "What type of information does the Sisonke platform provide?",
    answer:
      "Career offers a wide range of job opportunities across various industries and roles. You can find positions in technology, marketing, finance, design, and many other fields.",
  },
  {
    question:
      "Which communities does Sisonke support? And can I create a profile?",
    answer:
      "Yes, Career is a free platform for job seekers. You can create a profile, search for jobs, and apply to positions without any cost.",
  },
  {
    question: "Are the jobs posted on Sisonke verified?",
    answer:
      "Yes, Career is a free platform for job seekers. You can create a profile, search for jobs, and apply to positions without any cost.",
  },
  {
    question: "The businesses that are listed on Sisonke are they legitimate?",
    answer:
      "Yes, Career is a free platform for job seekers. You can create a profile, search for jobs, and apply to positions without any cost.",
  },
];

export default function FAQs() {
  return (
    <Box sx={{ background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)", paddingBottom: 6, paddingTop: 6 }}>
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Frequently asked questions
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          If our questions aren't answered here, don't hesitate to contact our
          support for help.
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
