import { useContext } from "react";
import { PoolsContext } from "../context/PoolsContext.tsx";

export const usePools = () => {
    const context = useContext(PoolsContext);

    if (!context) {
        throw new Error("Context has to be initialized");
    }

    return context;
};