import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { AccountCircle, ExitToApp, VisibilityOff, Brightness4, Brightness7 } from '@mui/icons-material';
import axios from 'axios';

const darkModeColors = {
  background: '#282828',
  paper: '#2c2c2c',
  textPrimary: '#e0e0e0',
  textSecondary: '#b0b0b0',
  primary: '#1976d2',
};

const lightModeColors = {
  background: '#ffffff',
  paper: '#f5f5f5',
  textPrimary: '#000000',
  textSecondary: '#5f5f5f',
  primary: '#1976d2',
};

const SettingsMenu = ({ userId, onLogout, toggleIncognito, isIncognito }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openAccountSettings, setOpenAccountSettings] = useState(false);
  const [selectedImage, setSelectedImage] = useState(localStorage.getItem('profileImage') || null);
  const [initialValues, setInitialValues] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
  });

  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const colors = darkMode ? darkModeColors : lightModeColors;
  
  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      setSelectedImage(localStorage.getItem('profileImage') || null);
    }
  }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile`);
        const userData = response.data;

        setInitialValues({
          name: userData.name,
          username: userData.username || '',
          email: userData.email,
          phone: userData.phone || '',
          location: userData.location || '',
          bio: userData.bio || '',
        });
        setSelectedImage(userData.profileImage || null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to fetch user data. Please try again.');
        setSnackbarOpen(true);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountSettingsOpen = () => {
    setOpenAccountSettings(true);
    handleMenuClose();
  };

  const handleAccountSettingsClose = () => {
    setOpenAccountSettings(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setSelectedImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    localStorage.removeItem('profileImage');
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/profile`, {
        userId: userId,
        ...values,
      });

      setSuccessMessage('User details updated successfully!');
      setSnackbarOpen(true);
      handleAccountSettingsClose();
    } catch (error) {
      console.error('Error updating user details:', error);
      setErrorMessage('Failed to update user details. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box>
      <IconButton onClick={handleMenuOpen}>
        <Avatar alt={initialValues.name} src={selectedImage} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 4,
          sx: {
            width: '260px',
            borderRadius: 2,
            bgcolor: colors.background,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Avatar alt={initialValues.name} src={selectedImage} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" color={colors.textPrimary}>
              {initialValues.name}
            </Typography>
            <Typography variant="body2" color={colors.textSecondary}>
              {initialValues.username}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <MenuItem onClick={handleAccountSettingsOpen} sx={{ color: colors.textPrimary }}>
          <AccountCircle sx={{ mr: 1 }} />
          Account settings
        </MenuItem>

        <MenuItem sx={{ color: colors.textPrimary }}>
          <VisibilityOff sx={{ mr: 1 }} />
          Go incognito
          <Switch edge="end" checked={isIncognito} onChange={toggleIncognito} sx={{ ml: 'auto' }} />
        </MenuItem>

        <MenuItem sx={{ color: colors.textPrimary }}>
          {darkMode ? <Brightness7 sx={{ mr: 1 }} /> : <Brightness4 sx={{ mr: 1 }} />}
          Dark Mode
          <Switch edge="end" checked={darkMode} onChange={toggleDarkMode} sx={{ ml: 'auto' }} />
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => {
          handleMenuClose();  // Close the menu
          onLogout();         // Trigger the logout function
        }} sx={{ color: colors.textPrimary }}>
          <ExitToApp sx={{ mr: 1 }} />
          Log out
        </MenuItem>
      </Menu>

      <Dialog open={openAccountSettings} onClose={handleAccountSettingsClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', bgcolor: colors.background, color: colors.textPrimary }}>
          Account Settings
        </DialogTitle>
        <DialogContent sx={{ bgcolor: colors.background }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar src={selectedImage} alt="Profile" sx={{ width: 80, height: 80, mb: 1 }} />
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: '16px' }} />
            {selectedImage && (
              <Button onClick={handleRemoveImage} color="error" sx={{ mt: 1 }}>
                Remove Image
              </Button>
            )}
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={initialValues.name}
                onChange={(e) => setInitialValues({ ...initialValues, name: e.target.value })}
                InputProps={{
                  style: { backgroundColor: colors.paper, color: colors.textPrimary },
                }}
                InputLabelProps={{
                  style: { color: colors.textSecondary },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                value={initialValues.username}
                onChange={(e) => setInitialValues({ ...initialValues, username: e.target.value })}
                InputProps={{
                  style: { backgroundColor: colors.paper, color: colors.textPrimary },
                }}
                InputLabelProps={{
                  style: { color: colors.textSecondary },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={initialValues.email}
                onChange={(e) => setInitialValues({ ...initialValues, email: e.target.value })}
                InputProps={{
                  style: { backgroundColor: colors.paper, color: colors.textPrimary },
                }}
                InputLabelProps={{
                  style: { color: colors.textSecondary },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={initialValues.phone}
                onChange={(e) => setInitialValues({ ...initialValues, phone: e.target.value })}
                InputProps={{
                  style: { backgroundColor: colors.paper, color: colors.textPrimary },
                }}
                InputLabelProps={{
                  style: { color: colors.textSecondary },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={initialValues.location}
                onChange={(e) => setInitialValues({ ...initialValues, location: e.target.value })}
                InputProps={{
                  style: { backgroundColor: colors.paper, color: colors.textPrimary },
                }}
                InputLabelProps={{
                  style: { color: colors.textSecondary },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                value={initialValues.bio}
                multiline
                rows={4}
                onChange={(e) => setInitialValues({ ...initialValues, bio: e.target.value })}
                InputProps={{
                  style: { backgroundColor: colors.paper, color: colors.textPrimary },
                }}
                InputLabelProps={{
                  style: { color: colors.textSecondary },
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => handleFormSubmit(initialValues)}
              sx={{ bgcolor: colors.primary, color: colors.textPrimary }}
            >
              Save Changes
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={errorMessage ? 'error' : 'success'} sx={{ width: '100%' }}>
          {errorMessage || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsMenu;
