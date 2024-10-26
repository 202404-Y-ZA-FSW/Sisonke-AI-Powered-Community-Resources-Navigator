import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" gutterBottom>
          {t('PrivacyPolicy.Title')}
        </Typography>
        <Typography variant="body2" paragraph>
          {t('PrivacyPolicy.Intro')}
        </Typography>
        <Typography variant="body2" paragraph>
          {t('PrivacyPolicy.DataCollection')}
        </Typography>
        <Typography variant="body2" paragraph>
          {t('PrivacyPolicy.Usage')}
        </Typography>
        <Typography variant="body2" paragraph>
          {t('PrivacyPolicy.Security')}
        </Typography>
        <Typography variant="body2" paragraph>
          {t('PrivacyPolicy.ThirdParties')}
        </Typography>
        <Typography variant="body2" paragraph>
          {t('PrivacyPolicy.Updates')}
        </Typography>
        <Typography variant="body2" paragraph>
          {t('PrivacyPolicy.Contact')}
        </Typography>
      </Box>
    </Modal>
  );
};

export default PrivacyPolicyModal;
