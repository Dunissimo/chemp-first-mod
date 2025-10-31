import { BrowserProvider } from "ethers";
import { type JsonRpcSigner } from "ethers";
import { createContext, useState, type PropsWithChildren } from "react";

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
            localStorage.setItem('auth', 'true');
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        
            disconnectWallet();
        } finally {
            setIsAuthLoading(false);
        }
    }

    const disconnectWallet = () => {
        setSigner(null);
        localStorage.setItem('auth', 'false');
    }

    return (
        <AuthContext.Provider value={{isAuthLoading, signer, isAuth: localStorage.getItem('auth') === 'true', connectWallet, disconnectWallet }}>
            {children}
        </AuthContext.Provider>
    );
}