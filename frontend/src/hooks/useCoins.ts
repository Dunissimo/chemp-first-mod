import {gerdaAddress, krendelAddress, rtkAddress, profiAddress} from "../conf.json"
import { ERC20Api } from "../api/ERC20Api";
import { useApi } from "./useApi";
import type { IUseCoinsReturns } from "../utils/types";

export const useCoins = (): IUseCoinsReturns => {
    const gerdaApi = useApi<ERC20Api>(gerdaAddress, ERC20Api);
    const krendelApi = useApi<ERC20Api>(krendelAddress, ERC20Api);
    const rtkApi = useApi<ERC20Api>(rtkAddress, ERC20Api);
    const profiApi = useApi<ERC20Api>(profiAddress, ERC20Api);

    return {
        gerdaApi,
        krendelApi,
        rtkApi,
        profiApi
    }
}