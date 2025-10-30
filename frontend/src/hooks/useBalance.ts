import { useContext } from "react";
import { BalanceContext } from "../context/BalanceContext";

export const useBalance = () => {
    const context = useContext(BalanceContext);

    if (!context) {
        throw new Error("Context has to be initialized");
    }

    return context;
};