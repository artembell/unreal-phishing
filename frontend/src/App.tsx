import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './use-cases/auth/AuthProvider';
import { RequireAuth } from './use-cases/auth/RequireAuth';
import { LoginPage } from './use-cases/pages/login-page/LoginPage';
import { RegisterPage } from './use-cases/pages/register-page/RegisterPage';
import { SimulationPage } from './use-cases/pages/simulation-page/SimulationPage';

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/"
                            element={
                                <RequireAuth>
                                    <SimulationPage />
                                </RequireAuth>
                            } />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
