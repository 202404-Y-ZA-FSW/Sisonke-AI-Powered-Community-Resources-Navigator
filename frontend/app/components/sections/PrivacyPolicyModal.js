// components/PrivacyPolicyModal.js

import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PrivacyPolicyModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body2" paragraph>
          We value your privacy. Here's how we handle your data:
        </Typography>
        <Typography variant="body2" paragraph>
          1. **Data Collection**: We collect info you provide and usage data.
        </Typography>
        <Typography variant="body2" paragraph>
          2. **Usage**: We use your info to improve the platform and services.
        </Typography>
        <Typography variant="body2" paragraph>
          3. **Security**: We take steps to protect your data.
        </Typography>
        <Typography variant="body2" paragraph>
          4. **Third-Parties**: We don’t share your data without consent.
        </Typography>
        <Typography variant="body2" paragraph>
          5. **Updates**: We may change this policy. Continued use means acceptance.
        </Typography>
        <Typography variant="body2" paragraph>
          Contact us at info@sisonke.co.za for any questions.
        </Typography>
      </Box>
    </Modal>
  );
};

export default PrivacyPolicyModal;
