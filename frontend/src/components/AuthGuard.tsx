import {useEffect, type PropsWithChildren} from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router';

function AuthGuard({ children }: PropsWithChildren) {
    const {isAuth} = useAuth();

    useEffect(() => {
        console.log(isAuth);
    }, [isAuth]);

    return <>
        {isAuth ? children : <Navigate to={'/'} />}
    </>;
}

export default AuthGuard;