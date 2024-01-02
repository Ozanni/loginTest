import { ROUTE_ADMIN } from '../../admin';
import { AuthLayout } from '../components';
import { LoginBlock } from '../components';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    return (
        <AuthLayout>
            <LoginBlock onSuccess={() => navigate(ROUTE_ADMIN)}/>
        </AuthLayout>
    );
}