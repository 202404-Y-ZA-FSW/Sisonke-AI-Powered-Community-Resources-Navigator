import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next"; 

export default function Subscribe() {
  const { t } = useTranslation(); 
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', location: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = t('Subscribe.Errors.NameRequired'); 
    if (!formData.email) errors.email = t('Subscribe.Errors.EmailRequired'); 
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = t('Subscribe.Errors.InvalidEmail'); 
    if (!formData.location) errors.location = t('Subscribe.Errors.LocationRequired'); 
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage(t('Subscribe.SuccessMessage')); 
        setFormData({ name: '', email: '', location: '' });
      } else {
        const data = await response.json();
        setErrorMessage(data.error || t('Subscribe.ErrorMessage')); 
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setErrorMessage(t('Subscribe.ErrorOccurred')); 
    }
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
            {t('Subscribe.Title')} 
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {t('Subscribe.Description')} 
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
            {t('Subscribe.ButtonText')} 
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
            {t('Subscribe.ModalTitle')} 
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
              placeholder={t('Subscribe.NamePlaceholder')}
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <Typography color="error">{errors.name}</Typography>}
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
              placeholder={t('Subscribe.EmailPlaceholder')} 
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <Typography color="error">{errors.email}</Typography>}
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
              placeholder={t('Subscribe.LocationPlaceholder')} 
              value={formData.location}
              onChange={handleChange}
              required
            />
            {errors.location && <Typography color="error">{errors.location}</Typography>}

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
              {t('Subscribe.SubmitButtonText')} 
            </Button>
            {successMessage && (
              <Typography color="primary" sx={{ mt: 2 }}>
                {successMessage}
              </Typography>
            )}
            {errorMessage && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            )}
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
