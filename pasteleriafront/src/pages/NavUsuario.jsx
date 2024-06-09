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
import logo from "../imagenes/logo.jpeg";
import prueba from "../imagenes/prueba.png";

function NavUsuario() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

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

      const handleHistorialPedidosClick = () => {
        handleMenuClose();
        navigate('/historialPedidos');
      };
    
      const handleLogoutClick = () => {
        handleMenuClose();
        // Borra el token y el correo electrónico del almacenamiento local
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('rol');
        // Redirige al usuario a la página de inicio de sesión
        
        navigate('/');
      };

  return (
    <div>
      <nav
        className="relative flex items-center justify-between p-5 bg-teal-100 border-b-4 border-teal-200"
        style={{ height: "100px" }}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <a href="/" className="flex items-center space-x-2">
            <div className="text-black font-pacifico">Reposteria</div>
            <img
              src={prueba}
              alt="Logo"
              className="w-24 h-24 rounded-full"
              style={{ top: "50%", position: "relative" }}
            />
            <div className="text-black font-pacifico">Rosario</div>
          </a>
        </div>
        <div className="flex space-x-4">
          <a
            href="/pasteles-y-gelatinas"
            className="text-black text-lg mx-3 hover:bg-pink-400 rounded-lg p-2 font-fjalla"
          >
            Pasteles y Gelatinas
          </a>
          <a
            href="/dulces"
            className="text-black text-lg mx-4 hover:bg-pink-400 rounded-lg p-2 font-fjalla"
          >
            Dulces
          </a>
          <a
            href="/extras"
            className="text-black text-lg mx-4 hover:bg-pink-400 rounded-lg p-2 font-fjalla"
          >
            Extras
          </a>
        </div>
        <div className="flex space-x-4">
            <a
                className="text-xl text-black rounded-lg p-2 hover:bg-pink-400  font-fjalla"
                href="/misPedidos"
            >
                Mis Pedidos actuales
            </a>
            <a
                className="text-xl text-black rounded-lg p-2 hover:bg-pink-400  font-fjalla"
                href="/cesta"
            >
                Mi Cesta
            </a>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar onClick={handleAvatarClick} sx={{ cursor: "pointer" }} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleHistorialPedidosClick}>Historial de pedidos</MenuItem>
              <MenuItem onClick={handleEditProfileClick}>Editar perfil</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Cerrar Sesion</MenuItem>
            </Menu>
          </Box>
        </div>
      </nav>
    </div>
  );
}

export default NavUsuario;
