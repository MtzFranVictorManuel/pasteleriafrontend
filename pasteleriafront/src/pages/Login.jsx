import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/loginStyle.css';
import './Registrar.jsx'


import Logo from '../imagenes/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if ((email == null || email == '') && (password == null || password == '')) {
      alert('Correo Electrónico y Contraseña no pueden estar vacíos');
      setEmailError(true);
      setPasswordError(true);
      return;
    }
    if (email == null || email == '') {
      alert('Correo Electrónico no puede estar vacío');
      setEmailError(true);
      setPasswordError(false);
      return;
    }
    if (password == null || password == '') {
      alert('Contraseña no puede estar vacía');
      setEmailError(false);
      setPasswordError(true);
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="container">
      <form className="root" onSubmit={handleSubmit}>
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Login</h1>
        <TextField
          id={emailError ? "outlined-error" : "outlined-email"}
          label="Correo Electrónico"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
        />
        <TextField
          id={passwordError ? "outlined-error" : "outlined-password"}
          label="Contraseña"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
        />
        <Button variant="contained" type="submit">
          Iniciar sesión
        </Button>
        <div className="linkContainer">
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          <span style={{ margin: '0 10px' }}>|</span>
          <a href="/Registrar">Registrarse</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
