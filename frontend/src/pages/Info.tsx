import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

import {gerdaAddress, krendelAddress, rtkAddress, profiAddress} from "../conf.json"
import { ERC20Api } from "../api/ERC20Api";
import { formatNumber } from "../utils/helpers";

function Info() {
    const [data, setData] = useState<any>();
    const gerdaApi = useApi<ERC20Api>(gerdaAddress, ERC20Api);
    const krendelApi = useApi<ERC20Api>(krendelAddress, ERC20Api);
    const rtkApi = useApi<ERC20Api>(rtkAddress, ERC20Api);
    const profiApi = useApi<ERC20Api>(profiAddress, ERC20Api);

    useEffect(() => {
        const getData = async () => {
            setData({
                gerda: {
                    decimals: await gerdaApi?.getDecimals(),
                    symbol: await gerdaApi?.getSymbol(),
                    totalSupply: await gerdaApi?.getTotalSupply(),
                },
                krendel: {
                    decimals: await krendelApi?.getDecimals(),
                    symbol: await krendelApi?.getSymbol(),
                    totalSupply: await krendelApi?.getTotalSupply(),
                },
                rtk: {
                    decimals: await rtkApi?.getDecimals(),
                    symbol: await rtkApi?.getSymbol(),
                    totalSupply: await rtkApi?.getTotalSupply(),
                },
                profi: {
                    decimals: await profiApi?.getDecimals(),
                    symbol: await profiApi?.getSymbol(),
                    totalSupply: await profiApi?.getTotalSupply(),
                },
            });
        }
        
        getData();
    }, [gerdaApi, krendelApi, rtkApi, profiApi]);

    return (
        <div className="info">
            <div className="info-item">
                <span>Symbol: {data?.gerda?.symbol}</span>
                <span>decimals: {data?.gerda?.decimals}</span>
                <span>total supply: {formatNumber(data?.gerda?.totalSupply)}</span>
            </div>
            <div className="info-item">
                <span>Symbol: {data?.krendel?.symbol}</span>
                <span>decimals: {data?.krendel?.decimals}</span>
                <span>total supply: {formatNumber(data?.krendel?.totalSupply)}</span>
            </div>
            <div className="info-item">
                <span>Symbol: {data?.rtk?.symbol}</span>
                <span>decimals: {data?.rtk?.decimals}</span>
                <span>total supply: {formatNumber(data?.rtk?.totalSupply)}</span>
            </div>
            <div className="info-item">
                <span>Symbol: {data?.profi?.symbol}</span>
                <span>decimals: {data?.profi?.decimals}</span>
                <span>total supply: {formatNumber(data?.profi?.totalSupply)}</span>
            </div>
        </div>
    );
}

export default Info