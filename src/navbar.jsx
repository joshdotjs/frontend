import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { NavLink } from 'react-router-dom';
import favicon from '/favicon.svg';
import NavbarAvatar from './navbar-avatar';

import { CartContext } from './context/cart-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const pages = [
  { title: 'Products', route: '/' }, 
  { title: 'About', route: '/about' },
  { title: 'Users', route: '/users' },
];

// ==============================================
// ==============================================
// ==============================================
// ==============================================


const Navlinks = () => {

  // ============================================

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // ============================================

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  // ============================================

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={ page.title } onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                <NavLink to={ page.route }>{ page.title }</NavLink>
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        LOGO
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button
            key={ page.title }
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            <NavLink to={ page.route }>{ page.title }</NavLink>
          </Button>
        ))}
      </Box>

      <NavbarAvatar />
    </>
  );
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ResponsiveAppBar() {

  // ============================================

  const { cart_open, openCart, closeCart } = React.useContext(CartContext);

  // ============================================

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            Store
          </Typography>

          <Navlinks />




          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="open cart">
              <IconButton 
                id="open-cart-button"
                onClick={() => openCart()} 
                sx={{ p: 0, color: 'white' }}
              >
                <svg width="28" height="28" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
              </IconButton>
            </Tooltip>
          </Box>

          

        </Toolbar>
      </Container>
    </AppBar>
  );
}