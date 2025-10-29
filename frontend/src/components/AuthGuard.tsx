import {type PropsWithChildren} from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router';

function AuthGuard({ children }: PropsWithChildren) {
    const {signer} = useAuth();

    return <>
        {signer ? children : <Navigate to={'/'} />}
    </>;
}

export default AuthGuard;