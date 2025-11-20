import { formatUnits } from "ethers";
import type { IPool } from "../utils/types";
import { getRatio } from "../utils/helpers";
import { useAuth } from "../hooks/useAuth";

interface IPoolProps {
    pool: IPool;
    handleAddOpen: (pool: IPool) => void;
    handleSwapOpen: (pool: IPool) => void;
}

function Pool({ pool, handleAddOpen, handleSwapOpen }: IPoolProps) {
    const { isAuth } = useAuth();

    const nameFirst = pool.firstToken.name;
    const reserveFirst = Number.parseFloat(formatUnits(pool.firstToken.reserve, 12));
    const priceFirst = Number.parseFloat(formatUnits(pool.firstToken.price, 12));

    const nameSecond = pool.secondToken.name;
    const reserveSecond = Number.parseFloat(formatUnits(pool.secondToken.reserve, 12));
    const priceSecond = Number.parseFloat(formatUnits(pool.secondToken.price, 12));

    return (
        <div className="pool" key={pool.name}>
            <p className="pool-name">{pool.name}</p>

            <div className="pool-reserves">
                <p>
                    {nameFirst} reserve: {reserveFirst} <br />
                </p>
                
                <p>
                    {nameSecond} reserve: {reserveSecond} <br />
                </p>
            </div>
            
            <div className="pool-reserves">
                <p>
                    Count ratio ~ {getRatio(reserveFirst, reserveSecond)} <br />
                    Eth ratio ~ {getRatio(reserveFirst * priceFirst, reserveSecond * priceSecond)} <br />
                </p>
            </div>

            {isAuth ? (
                <>
                    <button className="button swap-button" onClick={() => handleSwapOpen(pool)}>Swap</button>

                    <div className="pool-controls">
                        <button className="button" onClick={() => handleAddOpen(pool)}>Add liquid</button>
                        <button className="button" disabled>Take liquid</button>
                    </div>
                </>
            ) : (
                <button disabled className="button warn-button">To swap tokens or change liquidity, please log in</button>
            )}
        </div>
    );
}

export default Pool