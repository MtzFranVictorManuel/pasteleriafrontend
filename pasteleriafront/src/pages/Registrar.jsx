import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Registrar = () => {
    return (
        <div className="container">
            <div className="logoContainer">
                <img src={Logo} alt="Logo" className="logo" />
            </div>
            <form className="root" onSubmit={handleSubmit}>
                <h1>Registro</h1>
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
                    Registrarse
                </Button>
            </form>
        </div>
    );
};

export default Registrar;