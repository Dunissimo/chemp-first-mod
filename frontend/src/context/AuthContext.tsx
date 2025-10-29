import { ethers, type JsonRpcSigner } from "ethers";
import { createContext, useState, type PropsWithChildren } from "react";

interface IAuthContext {
    signer: JsonRpcSigner | null;
    isAuthLoading: boolean;
    signIn: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

    const signIn = async () => {
        setIsAuthLoading(true);

        if (!window.ethereum) {
            setIsAuthLoading(false);

            return alert("Установите метамаск!");
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);

            const _signer = await provider.getSigner();
            setSigner(_signer);

            console.log(_signer);
            
        } catch (e) {
            console.error(`Error in auth func: ${e}`);
        } finally {
            setIsAuthLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{isAuthLoading, signer, signIn}}>
            {children}
        </AuthContext.Provider>
    );
}