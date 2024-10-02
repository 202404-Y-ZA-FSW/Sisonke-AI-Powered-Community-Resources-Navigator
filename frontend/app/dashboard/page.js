"use client";

import React, { useState } from 'react';
import { withAuthentication } from '../components/authentication/authenticationLayout';
import { useAuthentication } from '../hooks/useAuthentication';
import { 
  AppBar, Toolbar, Typography, IconButton, Avatar, Badge,
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  CssBaseline, Box, Container, Button
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  Forum as ForumIcon,
  Event as EventIcon,
  Business as BusinessIcon,
  Work as WorkIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Placeholder components for each section
const Users = () => <Typography variant="h4">Users Component</Typography>;
const Blogs = () => <Typography variant="h4">Blogs Component</Typography>;
const Forums = () => <Typography variant="h4">Forums Component</Typography>;
const Events = () => <Typography variant="h4">Events Component</Typography>;
const Businesses = () => <Typography variant="h4">Businesses Component</Typography>;
const Jobs = () => <Typography variant="h4">Jobs Component</Typography>;

const drawerWidth = 240;

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
    { text: 'Users', icon: <PeopleIcon />, component: Users },
    { text: 'Blogs', icon: <ArticleIcon />, component: Blogs },
    { text: 'Forums', icon: <ForumIcon />, component: Forums },
    { text: 'Events', icon: <EventIcon />, component: Events },
    { text: 'Businesses', icon: <BusinessIcon />, component: Businesses },
    { text: 'Jobs', icon: <WorkIcon />, component: Jobs },
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
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Sisonke Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ ml: 2 }}>
              <Avatar alt={user.user.username} src="/placeholder.svg" />
            </IconButton>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {sidebarItems.map((item) => (
                <ListItem 
                  button 
                  key={item.text}
                  onClick={() => setSelectedComponent(item.text)}
                  selected={selectedComponent === item.text}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Container maxWidth="lg">
            <Typography variant="h5" gutterBottom>
              Welcome to the dashboard, {user.user.username}!
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography>Email: {user.user.email}</Typography>
              <Typography>ID: {user.user.id}</Typography>
              <Typography>Role: {user.user.role}</Typography>
            </Box>
            {renderComponent()}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default withAuthentication(Dashboard);
