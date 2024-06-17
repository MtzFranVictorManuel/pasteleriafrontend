import { useState } from 'react';
import { TextField, Button, Grid, Container, Box } from '@mui/material';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailExists, setEmailExists] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const validateEmail = async (email) => {
        const response = await fetch(`http://127.0.0.1:8000/validate-email?email=${encodeURIComponent(email)}`);
        // maneja la respuesta aquí
    };

    // luego, en tu función handleSubmitEmail
    const handleSubmitEmail = async (event) => {
        event.preventDefault();

        const response = await fetch(`http://127.0.0.1:8000/validate-email?email=${encodeURIComponent(email)}`);

        if (response.status === 404) {
            alert('Este correo electrónico no está registrado en nuestra base de datos.');
        } else if (!response.ok) {
            alert('Ocurrió un error al validar el correo electrónico. Por favor, inténtalo de nuevo.');
        } else {
            setEmailValid(true);
        }
    };

    const handleSubmitNewPassword = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }

        // Aquí debes cambiar la contraseña en tu base de datos.
        // Este es solo un ejemplo y necesitarás reemplazarlo con tu propia lógica.
        const response = await fetch('http://127.0.0.1:8000/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                newPassword: newPassword,
            }),
        });
        if (!response.ok) {
            alert('Ocurrió un error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
        } else {
            alert('La contraseña ha sido cambiada exitosamente.');
            window.location.href = '/iniciarSesion';
        }
    };

    return (
        <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item xs={12}>
                    <h2 className="text-3xl font-bold font-fjalla text-center">Ingresa tu correo electrónico para cambiar la contraseña</h2>                </Grid>

                {!emailValid ? (
                    <form onSubmit={handleSubmitEmail}>
                        <TextField
                            label="Correo electrónico"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            fullWidth
                        />
                        <Box mt={2}>
                            <Button variant="contained" type="submit" style={{ backgroundColor: '#CD006A' }}>Enviar</Button>
                        </Box>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitNewPassword}>
                        <TextField
                            label="Nueva contraseña"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            fullWidth
                        />
                        <Box mt={2}>
                            <TextField
                                label="Confirmar nueva contraseña"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                fullWidth
                            />
                        </Box>
                        <Box mt={2}>
                            <Button variant="contained" type="submit" style={{ backgroundColor: '#CD006A' }}>Cambiar contraseña</Button>
                        </Box>
                    </form>
                )}

                {emailExists === false && (
                    <Grid item xs={12}>
                        <p>El correo electrónico dado no se encuentra registrado.</p>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default ForgotPassword;