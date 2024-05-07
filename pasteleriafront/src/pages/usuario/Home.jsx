import { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../autentificador/AuthContext';

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfileClick = () => {
    handleMenuClose();
    navigate('/editarPerfil');
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    // Borra el token y el correo electrónico del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    // Redirige al usuario a la página de inicio de sesión
    navigate('/login');
  };

  // Resto de tu código

  return (
    <Box sx={{ m: 0, p: 0 }}>
      <AppBar position="static">
        <Toolbar className='bg-teal-100' sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton edge="start" aria-label="menu" className='bg-pink-100'>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: 'flex', gap: 2 }}>
          <Avatar onClick={handleAvatarClick} sx={{ cursor: 'pointer' }} />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEditProfileClick}>Editar perfil</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Salir</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Resto de tu código */}
    </Box>
  );
};

export default Home;