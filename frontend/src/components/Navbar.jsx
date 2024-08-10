import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Ensure 'authToken' matches the token name used
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Courses') {
      navigate('/student-viewcourse');
    } else if (setting === 'Dashboard') {
      if (userRole === 'instructor') {
        navigate('/instructor-dashboard');
      } else if (userRole === 'student') {
        navigate('/student-dashboard');
      }
    } else if (setting === 'Logout') {
      localStorage.removeItem('authToken');
      setUserRole('');
      navigate('/login'); 
    }
  };

  
  const menuItems = [
    ...(userRole === 'student'
      ? [
          <MenuItem key="courses" onClick={() => handleMenuClick('Courses')}><Typography textAlign="center">Courses</Typography></MenuItem>,
          <MenuItem key="dashboard" onClick={() => handleMenuClick('Dashboard')}><Typography textAlign="center">Dashboard</Typography></MenuItem>,
        ]
      : userRole === 'instructor'
      ? [
          <MenuItem key="dashboard" onClick={() => handleMenuClick('Dashboard')}><Typography textAlign="center">Dashboard</Typography></MenuItem>,
        ]
      : [] // No menu items if not logged in
    ),
    <MenuItem key="logout" onClick={() => handleMenuClick('Logout')}><Typography textAlign="center">Logout</Typography></MenuItem>
  ];

  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Learning App
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {menuItems}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

