import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from './router/index.tsx';
import { RouterProvider } from 'react-router';

import './index.css';
import { AuthContextProvider } from './context/AuthContext.tsx';
import { BalanceContextProvider } from './context/BalanceContext.tsx';
import { PoolsContextProvider } from './context/PoolsContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthContextProvider>
            <BalanceContextProvider>
                <PoolsContextProvider>
                    <RouterProvider router={router} />
                </PoolsContextProvider>
            </BalanceContextProvider>
        </AuthContextProvider>
    </StrictMode>,
);
