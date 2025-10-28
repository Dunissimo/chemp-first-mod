import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";
import type { TApi, TApiInstance } from "../utils/types";
import { ethers } from "ethers";

export const useApi = (address: string, apiClass: TApi) => {
    const {signer} = useAuth();
    const [api, setApi] = useState<TApiInstance>();

    useEffect(() => {
        if (!window.ethereum) return;

        setApi(new apiClass(address, signer ?? new ethers.BrowserProvider(window.ethereum)));
    }, [signer]);

    return api;
}