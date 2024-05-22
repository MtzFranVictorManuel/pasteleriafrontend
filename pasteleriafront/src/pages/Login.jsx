import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Registrar.jsx'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './autentificador/AuthContext';


import Logo from '../imagenes/prueba.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
      console.log('Respuesta:', response.data);
      if (response.data.message === 'Inicio de sesión exitoso') {
        localStorage.setItem('token', response.data.idUsuario); // Guarda el token en el almacenamiento local
        localStorage.setItem('email', response.data.email); // Guarda el correo electrónico en el almacenamiento local
        localStorage.setItem('rol', response.data.rol); // Guarda el rol en el almacenamiento local
        console.log('Correo electrónico guardado:', response.data.email); // Imprime el correo electrónico guardado
        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert(response.data.message);
      }
    }  catch (error) {
      if (error.response) {
        // La petición fue hecha y el servidor respondió con un código de estado
        // que cae fuera del rango de 2xx
        alert(error.response.data.detail);
      } else if (error.request) {
        // La petición fue hecha pero no se recibió ninguna respuesta
        alert(error.request);
      } else {
        // Algo sucedió en la configuración de la petición que provocó un error
        alert('Error', error.message);
      }
    }
  };



  return (
    <div >
      <form className="flex flex-col items-center justify-center h-screen space-y-4" onSubmit={handleSubmit}>
        <img src={Logo} alt="Logo" className="logo" />
        <h1 className="text-3xl font-bold font-fjalla">Inicio de sesión</h1>
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
        <Button variant="contained" type="submit" style={{ backgroundColor: '#CD006A' }}>
        Iniciar sesión
        </Button>
        <div className="linkContainer ">
          <a href="/forgot-password" style={{color:"blue"}}>¿Olvidaste tu contraseña?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
