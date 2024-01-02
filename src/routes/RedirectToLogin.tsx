import { Navigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../features/auth';

export const RedirectToLogin = () => {
    return <Navigate to={ROUTE_LOGIN} />;
}