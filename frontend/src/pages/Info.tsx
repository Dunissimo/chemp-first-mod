import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

import {gerdaAddress, krendelAddress, rtkAddress, profiAddress} from "../conf.json"
import { ERC20Api } from "../api/ERC20Api";

function Info() {
    const [data, setData] = useState<any>();
    const gerdaApi = useApi(gerdaAddress, ERC20Api);
    const krendelApi = useApi(krendelAddress, ERC20Api);
    const rtkApi = useApi(rtkAddress, ERC20Api);
    const profiApi = useApi(profiAddress, ERC20Api);

    useEffect(() => {
        const getData = async () => {
            setData({
                gerda: {
                    decimals: await (gerdaApi as ERC20Api).getDecimals(),
                    symbol: await (gerdaApi as ERC20Api).getSymbol(),
                    totalSupply: await (gerdaApi as ERC20Api).getTotalSupply(),
                },
                krendel: {
                    decimals: await (krendelApi as ERC20Api).getDecimals(),
                    symbol: await (krendelApi as ERC20Api).getSymbol(),
                    totalSupply: await (krendelApi as ERC20Api).getTotalSupply(),
                },
                rtk: {
                    decimals: await (rtkApi as ERC20Api).getDecimals(),
                    symbol: await (rtkApi as ERC20Api).getSymbol(),
                    totalSupply: await (rtkApi as ERC20Api).getTotalSupply(),
                },
                profi: {
                    decimals: await (profiApi as ERC20Api).getDecimals(),
                    symbol: await (profiApi as ERC20Api).getSymbol(),
                    totalSupply: await (profiApi as ERC20Api).getTotalSupply(),
                },
            });
        }
        
        getData();
    }, [gerdaApi]);

    return (
        <div className="flex gap-8">
            <div className="flex flex-col gap-2">
                <span>Symbol: {data?.gerda?.symbol}</span>
                <span>decimals: {data?.gerda?.decimals}</span>
                <span>total supply: {data?.gerda?.totalSupply}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span>Symbol: {data?.krendel?.symbol}</span>
                <span>decimals: {data?.krendel?.decimals}</span>
                <span>total supply: {data?.krendel?.totalSupply}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span>Symbol: {data?.rtk?.symbol}</span>
                <span>decimals: {data?.rtk?.decimals}</span>
                <span>total supply: {data?.rtk?.totalSupply}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span>Symbol: {data?.profi?.symbol}</span>
                <span>decimals: {data?.profi?.decimals}</span>
                <span>total supply: {data?.profi?.totalSupply}</span>
            </div>
        </div>
    );
}

export default Info