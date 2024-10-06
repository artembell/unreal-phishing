import { AuthForm } from '@/shared/components/AuthForm';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const { sendRegister, user, signin } = useAuth();

    async function handleSubmit({ email, password }: { email: string; password: string; }) {
        sendRegister({ email, password });
        signin({ email }, () => {
            navigate(from, { replace: true });
        });
    }

    return (
        user
            ? <Navigate to="/" state={{ from: location }} replace />
            : <AuthForm title="Register" onSubmit={(data) => handleSubmit(data)} />
    );
};
