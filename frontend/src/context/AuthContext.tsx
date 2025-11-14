import { BrowserProvider } from "ethers";
import { type JsonRpcSigner } from "ethers";
import { createContext, useState, type PropsWithChildren, useEffect } from "react";

interface IAuthContext {
    signer: JsonRpcSigner | null;
    isAuthLoading: boolean;
    isAuth: boolean;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const logIn = () => {
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    }
    const logOut = () => {
        setIsAuth(false);
        setSigner(null);
        localStorage.setItem('auth', 'false');
    }

    const handleAccountsChanged = (accounts: string[]) => {
        
        if (accounts.length === 0) {
            console.log("disconnect account");
            // Пользователь отключил MetaMask или вышел
            disconnectWallet();
        } else {
            console.log("account changed");
            // Пользователь сменил аккаунт
            connectWallet();
        }
    }

    const handleChainChanged = (_chainId: string) => {
        console.log("chain changed");
        window.location.reload();
    }

    const handleDisconnect = (_error: any) => {
        console.log("disconnect metamask");

        disconnectWallet();
    }

    const handleConnect = (info: any) => {
        console.log("connect metamask", info);
    };

    const connectWallet = async () => {
        try {
            setIsAuthLoading(true);
            
            if (!window.ethereum) {
                setIsAuthLoading(false);
                return alert("Отсутствует Metamask!");
            }

            const provider = new BrowserProvider(window.ethereum);
            const _signer = await provider.getSigner();

            setSigner(_signer);
            logIn();

            (window.ethereum as any).on('accountsChanged', handleAccountsChanged);
            (window.ethereum as any).on('chainChanged', handleChainChanged);
            (window.ethereum as any).on('connect', handleConnect);
            (window.ethereum as any).on('disconnect', handleDisconnect);
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        
            disconnectWallet();
        } finally {
            setIsAuthLoading(false);
        }
    }

    const disconnectWallet = () => {
        logOut();

        if ((window.ethereum as any)?.removeListener) {
            (window.ethereum as any).removeListener('accountsChanged', handleAccountsChanged);
            (window.ethereum as any).removeListener('chainChanged', handleChainChanged);
            (window.ethereum as any).removeListener('connect', handleConnect);
            (window.ethereum as any).removeListener('disconnect', handleDisconnect);
        }
    }

    useEffect(() => {
        setIsAuth(localStorage.getItem('auth') === 'true');
    }, []);

    return (
        <AuthContext.Provider value={{isAuthLoading, signer, isAuth, connectWallet, disconnectWallet }}>
            {children}
        </AuthContext.Provider>
    );
}