import { useLoginMutation } from '@/query/auth';
import { AuthForm } from '@/shared/components/AuthForm';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

export function LoginPage() {
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || '/';
    let { signin, user } = useAuth();

    const [sendLogin] = useLoginMutation();

    async function handleSubmit({ email, password }: { email: string; password: string; }) {
        await sendLogin({ email, password })
            .unwrap()
            .then(() => {
                signin({ email }, () => {
                    navigate(from, { replace: true });
                });
            })
            .catch((e) => console.log(e));
    }

    return (
        user
            ? <Navigate to="/" state={{ from: location }} replace />
            : <AuthForm title="Login" onSubmit={(data) => handleSubmit(data)} />
    );
}

