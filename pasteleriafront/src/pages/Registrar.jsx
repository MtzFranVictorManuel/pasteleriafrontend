import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../imagenes/logo.jpeg';
import '../styles/loginStyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(false);
        setPasswordMatchError(false);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError(false);
        setPasswordMatchError(false);
    };

    const handleSubmit = async () => {
        if (!email || !password || !confirmPassword) {
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            if (!confirmPassword) setConfirmPasswordError(true);
            return;
        }

        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/registrarUsuario', {
              email: email,
              password: password
            });
        
            if (response.data.message === 'Usuario registrado correctamente') {
              alert('Usuario registrado correctamente');
              navigate('/login'); // Redirige al usuario a la página de inicio de sesión
            } else {
              alert(response.data.message);
            }
          } catch (error) {
            console.error('Hubo un error al registrar el usuario', error);
          }
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <img src={Logo} alt="Logo" className="logo" />
                <h1 className="text-3xl font-bold">Registrar</h1>
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
                <TextField
                    id={confirmPasswordError || passwordMatchError ? "outlined-error" : "outlined-confirm-password"}
                    label="Confirmar Contraseña"
                    variant="outlined"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={confirmPasswordError || passwordMatchError}
                    helperText={passwordMatchError ? "Las contraseñas no coinciden" : ""}
                    className="mb-4 w-80"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} className="mb-4">
                    Registrar
                </Button>
                <Button variant="text" color="inherit">
                    <Link to="/login">Regresar</Link>
                </Button>
            </div>
        </div>
    );
}

export default Register;
