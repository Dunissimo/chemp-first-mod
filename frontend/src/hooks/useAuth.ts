import { ethers, type JsonRpcSigner } from "ethers";
import { useState } from "react";

export const useAuth = () => {
    const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

    const auth = async () => {
        setIsAuthLoading(true);

        if (!window.ethereum) {
            setIsAuthLoading(false);

            return alert("Установите метамаск!");
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            await provider.send("eth_requestAccounts", [])

            const signerTemp = await provider.getSigner()
            setSigner(signerTemp);
        } catch (e) {
            console.error(`Error in auth func: ${e}`)
            setIsAuthLoading(false);
        }
    }

    return {auth, signer, isAuthLoading, isAuth: Boolean(signer)};
}