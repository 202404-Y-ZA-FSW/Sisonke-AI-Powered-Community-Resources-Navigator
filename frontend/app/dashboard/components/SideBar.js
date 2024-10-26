"use client";
import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, Drawer } from "@mui/material";
import { 
  People as PeopleIcon, 
  Article as ArticleIcon, 
  Forum as ForumIcon, 
  Event as EventIcon, 
  Business as BusinessIcon, 
  Work as WorkIcon, 
  Dashboard as DashboardIcon  
} from "@mui/icons-material";

const Sidebar = ({ selectedComponent, setSelectedComponent, handleDrawerToggle, mobileOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sidebarItems = [
    { text: "Overview", icon: <DashboardIcon /> },
    { text: "Users", icon: <PeopleIcon /> },
    { text: "Blogs", icon: <ArticleIcon /> },
    { text: "Forums", icon: <ForumIcon /> },
    { text: "Events", icon: <EventIcon /> },
    { text: "Businesses", icon: <BusinessIcon /> },
    { text: "Jobs", icon: <WorkIcon /> },
  ];

  const sidebarContent = (
    <Box
      sx={{
        width: { xs: '100%', sm: 240 },
        height: '100%',
        background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
        padding: 2,
        overflowY: "auto",
      }}
    >
      <List>
        {sidebarItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              setSelectedComponent(item.text);
              if (isMobile && mobileOpen) handleDrawerToggle();
            }}
            selected={selectedComponent === item.text}
            sx={{
              my: 0.5,
              mx: 1,
              "&.Mui-selected": {
                backgroundColor: "#d3d3d3",
                color: theme.palette.primary.main,
              },
            }}
          >
            <ListItemIcon
              sx={{ 
                color: selectedComponent === item.text ? theme.palette.primary.main : "inherit" 
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
        }}
      >
        {sidebarContent}
      </Drawer>
      
      {/* Desktop sidebar */}
      <Box
        component="nav"
        sx={{
          width: { sm: 240 },
          flexShrink: { sm: 0 },
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
          open
        >
          {sidebarContent}
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
