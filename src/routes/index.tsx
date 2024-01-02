import {  useRoutes, RouteObject } from 'react-router-dom';
import { AuthRoutes, ROUTE_AUTH } from '../features/auth';
import { RedirectToLogin } from './RedirectToLogin';
import { adminRoutes } from './protected';

export const AppRoutes = () => {
    const appRoutes: RouteObject[] = [
        {
            path: '/*',
            element: <RedirectToLogin />
        },
        {
            path: `${ROUTE_AUTH}/*`,
            element: <AuthRoutes />,
        },
        ...adminRoutes
    ];
    const element = useRoutes(appRoutes);
    return <>{element}</>;
}