import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../autentificador/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { isLoggedIn} = useContext(AuthContext);
  const role = localStorage.getItem('rol');
  const navigate = useNavigate();

  if (!isLoggedIn || (roles.length > 0 && !roles.includes(role))) {
    navigate('/');
    return null;
  }

  return children;
};

export default PrivateRoute;
