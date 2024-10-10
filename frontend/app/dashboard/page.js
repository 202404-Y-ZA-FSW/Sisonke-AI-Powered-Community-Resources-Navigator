"use client";

import React, { useState } from 'react';
import { 
  Box, Container, AppBar, Toolbar, Drawer, useTheme, useMediaQuery
} from '@mui/material';
import Navbar from './components/NavBar';
import Sidebar from './components/SideBar';
import UserManagement from './components/users';
import Blogs from './components/blogs';
import Businesses from './components/businesses';
import Events from './components/events';
import Forums from './components/forums';
import Jobs from './components/jobs';
import DashboardOverview from './components/DashboardOverview';

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState('Overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Overview':
        return <DashboardOverview />;
      case 'Users':
        return <UserManagement />;
      case 'Blogs':
        return <Blogs />;
      case 'Businesses':
        return <Businesses />;
      case 'Events':
        return <Events />;
      case 'Forums':
        return <Forums />;
      case 'Jobs':
        return <Jobs />;
      default:
        return <Typography>Select a component</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar handleDrawerToggle={handleDrawerToggle} />
      </AppBar>
      <Toolbar /> 
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            width: 240,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              height: '100vh', 
            },
          }}
        >
          <Toolbar />
          <Sidebar
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}>
          <Container maxWidth="lg">
            {renderComponent()}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
