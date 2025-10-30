import { formatEther, type JsonRpcSigner } from "ethers";

export const getBalance = async (signer: JsonRpcSigner | null) => {
    if (!signer) {
        console.error("User not authenticated");
        return;
    }
    
    const address = await signer.getAddress();
    const value = await signer.provider.getBalance(address);
    
    return formatEther(value);
}