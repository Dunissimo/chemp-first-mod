import { createContext, useState, type PropsWithChildren, useEffect } from "react";
import { getBalance } from "../api/eth";
import { useAuth } from "../hooks/useAuth";
import type { IGetBalanceReturns } from "../utils/types";
import { useCoins } from "../hooks/useCoins";

interface IBalanceContext {
    balance?: IGetBalanceReturns;
    updateBalance: () => void;
}

export const BalanceContext = createContext<IBalanceContext | null>(null);

export const BalanceContextProvider = ({ children }: PropsWithChildren) => {
    const {signer, isAuth} = useAuth();
    const {gerdaApi, krendelApi, profiApi, rtkApi} = useCoins()
    const [balance, setBalance] = useState<IGetBalanceReturns | undefined>(undefined);

    const updateBalance = async () => {
        const newBalance = await getBalance(signer, {gerdaApi, krendelApi, profiApi, rtkApi});
        
        setBalance(newBalance);
    }

    useEffect(() => {
        updateBalance();
    }, [signer, isAuth]);

    return (
        <BalanceContext.Provider value={{balance, updateBalance}}>
            {children}
        </BalanceContext.Provider>
    );
}