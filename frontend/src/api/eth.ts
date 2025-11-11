import { formatEther, type JsonRpcSigner } from "ethers";
import type { IGetBalanceReturns, IUseCoinsReturns } from "../utils/types";


export const getBalance = async (signer: JsonRpcSigner | null, coins: IUseCoinsReturns): Promise<IGetBalanceReturns | undefined> => {
    const {gerdaApi, krendelApi, profiApi, rtkApi} = coins;

    if (!signer) {
        console.log("User not authenticated");
        return;
    }

    if (!gerdaApi || !krendelApi || !profiApi || !rtkApi) {
        console.error("No api in getBalance");
        return;
    }
    
    const address = await signer.getAddress();
    const eth = formatEther((await signer.provider.getBalance(address)));
    const gerda = (await gerdaApi.balanceOf(address));
    const krendel = (await krendelApi.balanceOf(address));
    const rtk = (await rtkApi.balanceOf(address));
    const profi = (await profiApi.balanceOf(address));

    const intl = Intl.NumberFormat('RU-ru');

    return {
        eth: intl.format(Number(eth)),
        gerda: {
            units: gerda,
            decimals: await gerdaApi.getDecimals(),
        },
        krendel: {
            units: krendel,
            decimals: await krendelApi.getDecimals(),
        },
        rtk: {
            units: rtk,
            decimals: await rtkApi.getDecimals(),
        },
        profi: {
            units: profi,
            decimals: await profiApi.getDecimals(),
        },
    };
}