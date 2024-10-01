/* import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoutes: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth();

  // Si no hay token, redirige al login
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
 */