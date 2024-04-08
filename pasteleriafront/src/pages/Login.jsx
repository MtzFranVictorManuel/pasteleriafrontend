import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/loginStyle.css'; 

// Importa tu imagen de logo
import Logo from '../imagenes/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="container">
      <div className="logoContainer">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      
      <form className="root" onSubmit={handleSubmit}>
      <h1>Login</h1>
        <TextField
          id="outlined-email"
          label="Correo Electrónico"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          id="outlined-password"
          label="Contraseña"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" type="submit">
          Iniciar sesión
        </Button>
        <div className="linkContainer">
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          <span style={{ margin: '0 10px' }}>|</span>
          <a href="/register">Registrarse</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
