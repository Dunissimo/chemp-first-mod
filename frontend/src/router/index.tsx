import { createBrowserRouter } from "react-router";
import App from "../App";
import Pools from "../pages/Pools";
import Profile from "../pages/Profile";
import Pool from "../pages/Pool";
import Stacking from "../pages/Stacking";
import Info from "../pages/Info";

export const routes = [
    {
        element: <App />,
        children: [
            {
                id: 'index',
                path: '/',
                element: <Pools />,
            },
            {
                id: 'pool',
                path: '/pool/:id',
                element: <Pool />
            },
            {
                id: 'stacking',
                path: '/stacking',
                element: <Stacking />
            },
            {
                id: 'profile',
                path: '/profile',
                element: <Profile />
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