"use client";
import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import { 
  People as PeopleIcon, 
  Article as ArticleIcon, 
  Forum as ForumIcon, 
  Event as EventIcon, 
  Business as BusinessIcon, 
  Work as WorkIcon, 
  Dashboard as DashboardIcon // New icon for "Overview" 
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

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        position: "fixed",
        top: 64,
        left: 0,
        background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
        padding: 2,
        zIndex: 1100,
        boxShadow: 10,
        overflowY: "auto", // Handles long lists
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
};

export default Sidebar;
