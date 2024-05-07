import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../autentificador/AuthContext';

const PrivateRoute = ({ path, children }) => {
    const { isLoggedIn } = useContext(AuthContext);
  
    return (
      <Route path={path} element={isLoggedIn ? children : <Navigate to="/login" />} />
    );
};

export default PrivateRoute;
