import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Registrar.jsx'
import axios from 'axios';


import Logo from '../imagenes/logo.jpeg';

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

  const handleSubmit = async (event) => {
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

    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email: email,
        password: password
      });
  
      console.log(response.data.message);
    } catch (error) {
      if (error.response) {
        // La petición fue hecha y el servidor respondió con un código de estado
        // que cae fuera del rango de 2xx
        console.log(error.response.data.detail);
      } else if (error.request) {
        // La petición fue hecha pero no se recibió ninguna respuesta
        console.log(error.request);
      } else {
        // Algo sucedió en la configuración de la petición que provocó un error
        console.log('Error', error.message);
      }
    }
  };



  return (
    <div>
      <form className="flex flex-col items-center justify-center h-screen space-y-4" onSubmit={handleSubmit}>
        <img src={Logo} alt="Logo" className="logo" />
        <h1 className="text-3xl font-bold">Login</h1>
        <TextField
          id={emailError ? "outlined-error" : "outlined-email"}
          label="Correo Electrónico"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          className="mb-4 w-80"
        />
        <TextField
          id={passwordError ? "outlined-error" : "outlined-password"}
          label="Contraseña"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          className="mb-4 w-80"
        />
        <Button variant="contained" type="submit">
          Iniciar sesión
        </Button>
        <div className="linkContainer">
          <a href="/forgot-password" style={{color:"blue"}}>¿Olvidaste tu contraseña?</a>
          <span style={{ margin: '0 10px' }}>|</span>
          <a href="/Registrar" style={{color:"blue"}}>Registrarse</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
