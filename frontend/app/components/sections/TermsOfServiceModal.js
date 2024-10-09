// components/TermsOfServiceModal.js

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

const TermsOfServiceModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="body2" paragraph>
          By using Sisonke, you agree to the following:
        </Typography>
        <Typography variant="body2" paragraph>
          1. **User Conduct**: Follow all laws and respect others in the community.
        </Typography>
        <Typography variant="body2" paragraph>
          2. **Account Security**: Keep your account info secure and notify us of any breaches.
        </Typography>
        <Typography variant="body2" paragraph>
          3. **Content Responsibility**: You own your content. We are not liable for it.
        </Typography>
        <Typography variant="body2" paragraph>
          4. **Service Limitations**: We are not responsible for service interruptions or errors.
        </Typography>
        <Typography variant="body2" paragraph>
          5. **Privacy**: Your data is protected. See our Privacy Policy for details.
        </Typography>
        <Typography variant="body2" paragraph>
          6. **Modifications**: We may update these terms. Continued use means acceptance.
        </Typography>
        <Typography variant="body2" paragraph>
          For inquiries, contact us at info@sisonke.co.za.
        </Typography>
      </Box>
    </Modal>
  );
};

export default TermsOfServiceModal;
