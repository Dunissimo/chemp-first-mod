import { createContext, useState, type PropsWithChildren, useEffect } from "react";
import { getBalance } from "../api/eth";
import { useAuth } from "../hooks/useAuth";

interface IBalanceContext {
    balance?: string;
    updateBalance: () => void;
}

export const BalanceContext = createContext<IBalanceContext | null>(null);

export const BalanceContextProvider = ({ children }: PropsWithChildren) => {
    const {signer} = useAuth();
    const [balance, setBalance] = useState<string | undefined>(undefined);

    const updateBalance = async () => {
        const newBalance = await getBalance(signer);
        
        console.log(newBalance);
        
        setBalance(newBalance);
    }

    useEffect(() => {
        updateBalance();
    }, [signer]);

    return (
        <BalanceContext.Provider value={{balance, updateBalance}}>
            {children}
        </BalanceContext.Provider>
    );
}