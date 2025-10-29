import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from './router/index.tsx';
import { RouterProvider } from 'react-router';

import './index.css';
import { AuthContextProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </StrictMode>,
);
