import { useAuth } from '@/use-cases/auth/hooks/useAuth';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export const Layout = () => {
    const { user, signout, sendSignout } = useAuth();
    const isLogged = user ? true : false;

    const navigate = useNavigate();

    const showWelcome = !!user;
    const showLogin = !isLogged;
    const showLogout = showWelcome;

    return (
        <div className="w-[800px] m-auto ">
            <ul className="flex flex-row items-center justify-end gap-10 mb-10">
                <div className='mr-auto'>
                    {showWelcome ? `Welcome ${user.email}!` : `You are not logged in`}
                </div>
                {
                    showLogout && <button
                        onClick={() => {
                            sendSignout();
                            signout(() => navigate('/'));
                        }}
                    >
                        Sign out
                    </button>
                }
                {showLogin && <li><Link to="/login">Login</Link></li>}
                {!isLogged && <li><Link to="/register">Register</Link></li>}
            </ul>

            <Outlet />
        </div>
    );
};


