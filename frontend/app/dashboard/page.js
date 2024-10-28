'use client';

import React, { useState } from 'react';
import { 
  Box, AppBar, Toolbar, Drawer, useTheme, useMediaQuery, Typography
} from '@mui/material';
import AuthNav from '../components/sections/AuthNav';
import Sidebar from './components/SideBar';
import Blogs from './components/blogs';
import Businesses from './components/businesses';
import Events from './components/events';
import Forums from './components/forums';
import Jobs from './components/jobs';
import DashboardOverview from './components/DashboardOverview';
import UserDashboard from './components/users';
import { withAuthentication } from '../components/authentication/authenticationLayout';
import { useAuthentication } from '../hooks/useAuthentication';
import App from 'next/app';

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState('Overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { user } = useAuthentication();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Overview':
        return <DashboardOverview />;
      case 'Users':
        return <UserDashboard />;
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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
       <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <AuthNav handleDrawerToggle={handleDrawerToggle} />
      </AppBar> 
      
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        {renderComponent()} 
      </Box>
    </Box>
  );
}

export default withAuthentication(Dashboard);
