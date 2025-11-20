import { createContext, useState, type PropsWithChildren, useEffect, type Dispatch, type SetStateAction } from "react";
import { useAuth } from "../hooks/useAuth";
import type { IPool } from "../utils/types";
import { useApi } from "../hooks/useApi";
import { factoryAddress } from "../conf.json";
import { FactoryApi } from "../api/Factory";

interface IPoolsContext {
    pools: IPool[];
    userPools: IPool[];
    selectedPool: IPool | null;
    setSelectedPool: Dispatch<SetStateAction<IPool | null>>;
    updatePools: () => Promise<void>
}

export const PoolsContext = createContext<IPoolsContext | null>(null);

export const PoolsContextProvider = ({ children }: PropsWithChildren) => {
    const {signer} = useAuth();
    const api = useApi(factoryAddress, FactoryApi) as FactoryApi;

    const [pools, setPools] = useState<IPool[]>([]);
    const [userPools, setUserPools] = useState<IPool[]>([]);
    const [selectedPool, setSelectedPool] = useState<IPool | null>(null);

    const getData = async () => {
        if (!api) return;

        const pools = await api.getPools();

        if (!signer) {
            setPools(pools);
            return;
        };

        const userPools = await api.getUserPools(signer, pools);
        setUserPools(userPools);

        const noUserPools = await api.getNoUserPools(signer, pools);
        setPools(noUserPools);
    }

    useEffect(() => {
        getData();
    }, [signer, api]);

    return (
        <PoolsContext.Provider value={{ pools, userPools, selectedPool, setSelectedPool, updatePools: getData }}>
            {children}
        </PoolsContext.Provider>
    );
}