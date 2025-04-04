import * as React from 'react';
import { Link } from 'react-router-dom';
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
import PaletteIcon from '@mui/icons-material/Palette';
import { alpha } from '@mui/material/styles';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = [
  { name: 'Perfil', path: 'https://github.com/DavidFraga09' },
  { name: 'Cuenta', path: 'https://github.com/settings/profile' },
  { name: 'Dashboard', path: 'https://github.com/dashboard' },
  { name: 'Logout', path: 'https://github.com/logout' }
];

function ComponenteEncabezado() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        borderBottom: '2px solid #f8f9fa'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo para pantallas grandes */}
          <PaletteIcon 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1, 
              fontSize: 32,
              color: '#FFD700'
            }} 
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: '#fff',
              textDecoration: 'none',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Arte Moderno
          </Typography>

          {/* Menú móvil */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.1)
                }
              }}
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
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  background: 'linear-gradient(180deg, #1a2a6c 0%, #2c3e50 100%)',
                }
              }}
              PaperProps={{
                elevation: 5
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ 
                  '&:hover': { backgroundColor: alpha('#fff', 0.1) } 
                }}>
                  <Typography sx={{ 
                    textAlign: 'center', 
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: '0.95rem'
                  }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo para móvil */}
          <PaletteIcon 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              mr: 1, 
              fontSize: 28,
              color: '#FFD700'
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'white',
              textDecoration: 'none',
              textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            Arte Moderno
          </Typography>

          {/* Menú principal para pantallas grandes */}
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'center',
            gap: 1
          }}>
            <Button 
              component={Link} 
              to='/home' 
              sx={{
                my: 2, 
                mx: 1,
                color: 'white', 
                fontSize: '0.95rem', 
                fontWeight: 500,
                textTransform: 'capitalize',
                borderRadius: '20px',
                px: 2.5,
                py: 0.8,
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.2),
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              to='/obras-arte' 
              sx={{
                my: 2, 
                mx: 1,
                color: 'white', 
                fontSize: '0.95rem', 
                fontWeight: 500,
                textTransform: 'capitalize',
                borderRadius: '20px',
                px: 2.5,
                py: 0.8,
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.2),
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Obras de Arte
            </Button>
            <Button 
              component={Link} 
              to='/about' 
              sx={{
                my: 2, 
                mx: 1,
                color: 'white', 
                fontSize: '0.95rem', 
                fontWeight: 500,
                textTransform: 'capitalize',
                borderRadius: '20px',
                px: 2.5,
                py: 0.8,
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.2),
                  transform: 'translateY(-2px)'
                }
              }}
            >
              About Us
            </Button>
            <Button 
              component={Link} 
              to='/contact' 
              sx={{
                my: 2, 
                mx: 1,
                color: 'white', 
                fontSize: '0.95rem', 
                fontWeight: 500,
                textTransform: 'capitalize',
                borderRadius: '20px',
                px: 2.5,
                py: 0.8,
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.2),
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Contact Us
            </Button>
          </Box>

          {/* Perfil de usuario */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings" arrow>
              <IconButton 
                onClick={handleOpenUserMenu} 
                sx={{ 
                  p: 0,
                  border: '2px solid #FFD700',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)'
                  }
                }}
              >
                <Avatar 
                  alt="User Avatar" 
                  src="https://avatars.githubusercontent.com/u/181181716?v=4" 
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ 
                mt: '45px',
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  background: 'linear-gradient(180deg, #1a2a6c 0%, #2c3e50 100%)',
                  minWidth: '180px',
                  overflow: 'visible',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: -6,
                    right: 14,
                    width: 12,
                    height: 12,
                    bgcolor: '#1a2a6c',
                    transform: 'rotate(45deg)',
                    zIndex: 0,
                  },
                }
              }}
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
              PaperProps={{
                elevation: 5
              }}
            >
              {settings.map(({ name, path }) => (
                <MenuItem 
                  key={name} 
                  component={Link} 
                  to={path} 
                  onClick={handleCloseUserMenu}
                  sx={{ 
                    py: 1.5,
                    '&:hover': { backgroundColor: alpha('#fff', 0.1) } 
                  }}
                >
                  <Typography sx={{ 
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '0.95rem'
                  }}>{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ComponenteEncabezado;