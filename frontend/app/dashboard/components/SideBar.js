import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({ selectedComponent, setSelectedComponent, handleDrawerToggle }) => {
  const components = ['Overview', 'Users', 'Blogs', 'Businesses', 'Events', 'Forums', 'Jobs'];

  return (
    <List>
      {components.map((text) => (
        <ListItem
          button
          key={text}
          selected={selectedComponent === text}
          onClick={() => {
            setSelectedComponent(text);
            handleDrawerToggle(); // Close drawer if in mobile view
          }}
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
