import { createBrowserRouter } from "react-router";
import App from "../App";
import Pools from "../pages/Pools";
import Stacking from "../pages/Stacking";
import Info from "../pages/Info";
import AuthGuard from "../components/AuthGuard";

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