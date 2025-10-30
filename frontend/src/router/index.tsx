import { createBrowserRouter } from "react-router";
import App from "../App";
import Pools from "../pages/Pools";
import Pool from "../pages/Pool";
import Stacking from "../pages/Stacking";
import Info from "../pages/Info";
import AuthGuard from "../components/AuthGuard";
import CreatePool from "../pages/CreatePool";

export const routes = [
    {
        element: <App />,
        children: [
            {
                id: 'index',
                path: '/',
                element: <Pools />
            },
            {
                id: 'pool',
                path: '/pool/:id',
                element: <AuthGuard><Pool /></AuthGuard>
            },
            {
                id: 'craete-pool',
                path: '/pool/create',
                element: <AuthGuard><CreatePool /></AuthGuard>
            },
            {
                id: 'stacking',
                path: '/stacking',
                element: <AuthGuard><Stacking /></AuthGuard>
            },
            {
                id: 'info',
                path: '/info',
                element: <Info />
            }
        ]
    }
];

export const router = createBrowserRouter(routes);