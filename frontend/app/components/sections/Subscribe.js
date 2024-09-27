import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Subscribe() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
    handleClose();
  };

  return (
    <Box
      sx={{
        py: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
          borderRadius: "16px",
          py: 4,
        }}
        maxWidth="md"
      >
        <Box
          sx={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Subscribe to our newsletter
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Get informed about new jobs, events, and new resources that are{" "}
            <br /> posted daily in your community forums and blogs.
          </Typography>
          <Button
            size="large"
            onClick={handleOpen}
            sx={{
              backgroundColor: "#6c63ff",
              borderRadius: "16px",
              color: "#ffffff",
              textTransform: "none",
              padding: "8px 30px",
              "&:hover": {
                backgroundColor: "#245457",
              },
            }}
          >
            Subscribe Now
          </Button>
        </Box>
      </Container>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "16px",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ mb: 2 }} id="modal-title" variant="h6" component="h2" gutterBottom>
            Sisonke Subscription
          </Typography>
          <form onSubmit={handleSubmit}>
            <input
              style={{
                padding: "15px",
                borderRadius: "16px",
                width: "100%",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
              type="text"
              name="name"
              placeholder="Name"
              required
            />
            <input
              style={{
                padding: "15px",
                borderRadius: "16px",
                width: "100%",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              style={{
                padding: "15px",
                borderRadius: "16px",
                width: "100%",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
              type="text"
              name="location"
              placeholder="Location"
              required
            />
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#6c63ff",
                borderRadius: "16px",
                color: "#ffffff",
                padding: "15px 0",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#245457",
                },
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
