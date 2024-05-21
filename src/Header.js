
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Button, Menu } from '@mui/material';



import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';



function Header() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };




  return (  // Add the return statement

    <AppBar position="static" color="primary">
        <Toolbar>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleOpenMenu}
        >
          <MenuIcon />
          <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>Option 1</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Option 2</MenuItem>
          {/* Add more MenuItem components for additional options */}
        </Menu>
        </IconButton>
            <Typography variant="h4" sx={{ flexGrow: 1 }}>Kasi Weather</Typography>
            <Button color="inherit"  className="Button" sx={{ alignSelf: 'flex-end' }}>Login</Button>
            
        </Toolbar>
    </AppBar>
  );
}

export default Header;
