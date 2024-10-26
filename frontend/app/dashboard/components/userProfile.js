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
  Paper,
  Tooltip,
} from '@mui/material';
import { AccountCircle, ExitToApp, VisibilityOff, Brightness4, Brightness7, Edit } from '@mui/icons-material';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const darkModeColors = {
  background: '#1e1e1e',
  paper: '#2c2c2c',
  textPrimary: '#ffffff',
  textSecondary: '#b0b0b0',
  primary: '#90caf9',
};

const lightModeColors = {
  background: '#f5f5f5',
  paper: '#ffffff',
  textPrimary: '#333333',
  textSecondary: '#666666',
  primary: '#1976d2',
};

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SettingsMenu = ({ userId, onLogout, toggleIncognito, isIncognito }) => {
  const [anchorEl, setAnchorEl] = useState(null);  
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
        const response = await axios.get(`http://localhost:5000/profile/profile`);
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
          elevation: 8,
          sx: {
            width: '280px',
            borderRadius: 2,
            bgcolor: colors.paper,
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Avatar alt={initialValues.name} src={selectedImage} sx={{ width: 60, height: 60, mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" color={colors.textPrimary}>
              {initialValues.name}
            </Typography>
            <Typography variant="body2" color={colors.textSecondary}>
              {initialValues.username}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <StyledMenuItem onClick={handleAccountSettingsOpen} sx={{ color: colors.textPrimary }}>
          <AccountCircle sx={{ mr: 2 }} />
          Account settings
        </StyledMenuItem>

        <StyledMenuItem sx={{ color: colors.textPrimary }}>
          <VisibilityOff sx={{ mr: 2 }} />
          Go incognito
          <Switch edge="end" checked={isIncognito} onChange={toggleIncognito} sx={{ ml: 'auto' }} />
        </StyledMenuItem>

        <StyledMenuItem sx={{ color: colors.textPrimary }}>
          {darkMode ? <Brightness7 sx={{ mr: 2 }} /> : <Brightness4 sx={{ mr: 2 }} />}
          Dark Mode
          <Switch edge="end" checked={darkMode} onChange={toggleDarkMode} sx={{ ml: 'auto' }} />
        </StyledMenuItem>

        <Divider sx={{ my: 1 }} />

        <StyledMenuItem onClick={() => {
          handleMenuClose();
          onLogout();
        }} sx={{ color: colors.textPrimary }}>
          <ExitToApp sx={{ mr: 2 }} />
          Log out
        </StyledMenuItem>
      </Menu>

      <Dialog open={openAccountSettings} onClose={handleAccountSettingsClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', bgcolor: colors.background, color: colors.textPrimary }}>
          Account Settings
        </DialogTitle>
        <DialogContent sx={{ bgcolor: colors.background, p: 3 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: colors.paper }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar src={selectedImage} alt="Profile" sx={{ width: 100, height: 100, mb: 2 }} />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" startIcon={<Edit />}>
                  Change Photo
                </Button>
              </label>
              {selectedImage && (
                <Button onClick={handleRemoveImage} color="error" sx={{ mt: 1 }}>
                  Remove Image
                </Button>
              )}
            </Box>
          </Paper>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledTextField
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
              <StyledTextField
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
              <StyledTextField
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
              <StyledTextField
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
              <StyledTextField
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
              <StyledTextField
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
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
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
