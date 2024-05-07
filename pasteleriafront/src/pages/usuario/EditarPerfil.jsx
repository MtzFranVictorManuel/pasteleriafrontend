import { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../autentificador/AuthContext';

const EditarPerfil = () => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('contraseña');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
    const [showChangePasswordButton, setShowChangePasswordButton] = useState(true);


    const { isLoggedIn, user } = useContext(AuthContext);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            const email = localStorage.getItem('email'); // Obtiene el correo electrónico del almacenamiento local

            const obtenerPerfil = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/editarPerfil/${email}`);
                    if (response.data) {
                        setNombre(response.data.nombre || '');
                        setApellidos(response.data.apellido || '');
                        setEmail(response.data.email || '');
                    } else {
                        console.log('No se obtuvieron datos');
                    }
                } catch (error) {
                    console.error('Hubo un error al obtener los datos', error);
                }
            };

            obtenerPerfil();
        }
    }, [isLoggedIn, navigate]);


    const handlePasswordChangeClick = () => {
        const confirmChange = window.confirm('Estás por cambiar tu contraseña, ¿deseas seguir con este paso?');
        if (confirmChange) {
            setIsPasswordDisabled(false);
            setShowChangePasswordButton(false);
        }
    };

    

    const stringToColor = (string) => {
        let hash = 0;
        for (let i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    };

    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width: 64,
                height: 64,
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    };

    const handleSaveChangesClick = async () => {
        if (!nombre || !apellidos || !email || (!isPasswordDisabled && !password)) {
            alert('Los campos solicitados están vacíos');
        } else {
            if (!isPasswordDisabled) {
                try {
                    const response = await axios.put('http://127.0.0.1:8000/cambiarContrasena', {
                        email: email,
                        password: password
                    });
    
                    if (response.data.message === 'Contraseña actualizada correctamente') {
                        alert('Contraseña actualizada correctamente');
                    } else {
                        alert(response.data.message);
                    }
                } catch (error) {
                    console.error('Hubo un error al actualizar la contraseña', error);
                }
            }

            try {
                const response = await axios.put('http://127.0.0.1:8000/editarPerfil', {
                    email_viejo: localStorage.getItem('email'),
                    nuevo_email: email,
                    nombre: nombre,
                    apellido: apellidos
                });
    
                if (response.data.message === 'Perfil actualizado correctamente') {
                    alert('Perfil actualizado correctamente');
                    localStorage.setItem('email', email); // Actualiza el correo electrónico en el almacenamiento local
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Hubo un error al actualizar el perfil', error);
            }
            // Aquí puedes manejar la lógica para guardar los cambios
            console.log('Guardando cambios...');
        }
    };

    const handleBackClick = () => {
        navigate('/home');
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(email).toLowerCase());
    }



    return (
        <Box sx={{ m: 0, p: 0 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="regresar">
                        <ArrowBackIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <Avatar {...stringAvatar(`${nombre} ${apellidos}`)} />
                <TextField
                    label="Nombre(s)"
                    variant="outlined"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-80"
                    error={!nombre}
                />
                <TextField
                    label="Apellidos"
                    variant="outlined"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    className="w-80"
                    error={!apellidos}
                />
                <TextField
                    label="Correo Electrónico"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-80"
                    error={!email}
                />
                <TextField
                    label="Contraseña"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isPasswordDisabled}
                    className="w-80"
                    error={!isPasswordDisabled && !password}
                />
                {!isPasswordDisabled && (
                    <TextField
                        label="Confirmar Contraseña"
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-80"
                        error={confirmPassword !== password}
                    />
                )}
                {showChangePasswordButton && (
                    <Button variant="contained" onClick={handlePasswordChangeClick}>
                        Cambiar Contraseña
                    </Button>
                )}
                <Button variant="contained" onClick={handleSaveChangesClick}>
                    Guardar Cambios
                </Button>

            </div>
        </Box>
    );
};

export default EditarPerfil;