//./components/SideBar
"use client";
import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  People as PeopleIcon,
  Article as ArticleIcon,
  Forum as ForumIcon,
  Event as EventIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
} from "@mui/icons-material";

const Sidebar = ({ selectedComponent, setSelectedComponent, handleDrawerToggle, mobileOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sidebarItems = [
    { text: "Users", icon: <PeopleIcon /> },
    { text: "Blogs", icon: <ArticleIcon /> },
    { text: "Forums", icon: <ForumIcon /> },
    { text: "Events", icon: <EventIcon /> },
    { text: "Businesses", icon: <BusinessIcon /> },
    { text: "Jobs", icon: <WorkIcon /> },
  ];

  return (
    <Box
      sx={{
        mt: 2,
        background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)", // Match Navbar background
        padding: 2, // Add some padding
        borderRadius: "8px", // Optional: Rounded corners
        boxShadow: 1, // Optional: Subtle shadow effect
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
                backgroundColor: "#d3d3d3", // Highlight color for selected item
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
