import { RouteObject } from 'react-router-dom';
import { Login } from './Login';
import { useRoutes } from 'react-router-dom';
import { AuthPaths } from '..';
import { Page } from '../../../components/Page';

export const AuthRoutes = () => {
    const loginRoutes: RouteObject[] = [
        {
            path: AuthPaths.Login, 
            element: <Page title='Đăng nhập'><Login /></Page>
        }
    ];
    const elements = useRoutes(loginRoutes);
    return <>{elements}</>;
};

export * from './paths';