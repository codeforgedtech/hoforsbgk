import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // Anpassa denna laddningsstatus
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Hantera felstatus om det behövs
  }

  return user ? <Component {...rest} /> : <Navigate to="/admin" />;
};

export default PrivateRoute;