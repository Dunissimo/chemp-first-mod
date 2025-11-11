import { useEffect, useState } from "react";
import { useCoins } from "../hooks/useCoins";
import { format } from "../utils/helpers";

function Info() {
    const [data, setData] = useState<any>();
    const {gerdaApi, krendelApi, rtkApi, profiApi} = useCoins();    

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
                <span>total supply: {format(data?.gerda?.totalSupply, 12)}</span>
            </div>
            <div className="info-item">
                <span>Symbol: {data?.krendel?.symbol}</span>
                <span>decimals: {data?.krendel?.decimals}</span>
                <span>total supply: {format(data?.krendel?.totalSupply, 12)}</span>
            </div>
            <div className="info-item">
                <span>Symbol: {data?.rtk?.symbol}</span>
                <span>decimals: {data?.rtk?.decimals}</span>
                <span>total supply: {format(data?.rtk?.totalSupply, 12)}</span>
            </div>
            <div className="info-item">
                <span>Symbol: {data?.profi?.symbol}</span>
                <span>decimals: {data?.profi?.decimals}</span>
                <span>total supply: {format(data?.profi?.totalSupply, 12)}</span>
            </div>
        </div>
    );
}

export default Info