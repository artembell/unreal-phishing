import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StateProvider } from './store/Provider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StateProvider>
            <App />
        </StateProvider>
    </StrictMode>,
);
