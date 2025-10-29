import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";
import type { TApi } from "../utils/types";
import { ethers } from "ethers";

export const useApi = <T>(address: string, apiClass: TApi): T | undefined => {
    const {signer} = useAuth();
    const [api, setApi] = useState<T>();

    useEffect(() => {
        if (!window.ethereum) return;

        console.log(signer);
        
        setApi(new apiClass(address, signer ?? new ethers.BrowserProvider(window.ethereum)) as T);
    }, [signer]);

    return api;
}