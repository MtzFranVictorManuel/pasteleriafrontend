import { useState, useEffect } from 'react';
import NavAdmin from "./NavAdmin";
import NavBarSinLogin from "./NavBarSinLogin";
import NavUsuario from "./NavUsuario";

function NavBars() {
    const role = localStorage.getItem('rol');

    useEffect(() => {
      const intervalId = setInterval(() => {
        const newRole = localStorage.getItem('rol');
        if (newRole !== role) {
          setRole(newRole);
        }
      }, 1000); // Comprueba si el rol ha cambiado cada segundo
  
      return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    }, [role]);
  
    if (role == 2) {
      return <NavAdmin />;
    } else if (role == 1) {
      return <NavUsuario />;
    } else {
      return <NavBarSinLogin />;
    }
  }

  export default NavBars;