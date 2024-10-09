"use client";

import React, { useState } from 'react';
import { withAuthentication } from '../components/authentication/authenticationLayout';
import { useAuthentication } from '../hooks/useAuthentication';
import { 
  Box, Container, Typography, Grid
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/NavBar';  
import Sidebar from './components/SideBar'; 

// Placeholder components for each section
const Users = () => <Typography variant="h4">Users</Typography>;
const Blogs = () => <Typography variant="h4">Blogs</Typography>;
const Forums = () => <Typography variant="h4">Forums</Typography>;
const Events = () => <Typography variant="h4">Events</Typography>;
const Businesses = () => <Typography variant="h4">Businesses</Typography>;
const Jobs = () => <Typography variant="h4">Jobs</Typography>;

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function Dashboard() {
  const { user, logout } = useAuthentication();
  const [selectedComponent, setSelectedComponent] = useState('Users');

  const sidebarItems = [
    { text: 'Users', component: Users },
    { text: 'Blogs', component: Blogs },
    { text: 'Forums', component: Forums },
    { text: 'Events', component: Events },
    { text: 'Businesses', component: Businesses },
    { text: 'Jobs', component: Jobs },
  ];

  const renderComponent = () => {
    const Component = sidebarItems.find(item => item.text === selectedComponent)?.component;
    return Component ? <Component /> : null;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        {/* Include the Navbar at the top */}
        <Navbar />
        
        <Container maxWidth="lg" sx={{ flexGrow: 1, p: 3, display: 'flex' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              {/* Include the Sidebar on the left */}
              <Sidebar 
                selectedComponent={selectedComponent} 
                setSelectedComponent={setSelectedComponent} 
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h5" gutterBottom>
                Welcome to the dashboard, {user.user.username}!
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography>Email: {user.user.email}</Typography>
                <Typography>ID: {user.user.id}</Typography>
                <Typography>Role: {user.user.role}</Typography>
              </Box>
              {renderComponent()}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default withAuthentication(Dashboard);
