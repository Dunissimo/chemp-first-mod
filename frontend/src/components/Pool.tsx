import { formatUnits } from "ethers";
import type { IPool } from "../utils/types";
import { getRatio } from "../utils/helpers";

interface IPoolProps {
    pool: IPool;
    addLiquidHandler: (pool: IPool) => void;
}

function Pool({ pool, addLiquidHandler }: IPoolProps) {
    const reserveFirst = Number.parseFloat(formatUnits(pool.firstToken.reserve, 12));
    const priceFirst = Number.parseFloat(formatUnits(pool.firstToken.price, 12));
    const reserveSecond = Number.parseFloat(formatUnits(pool.secondToken.reserve, 12));
    const priceSecond = Number.parseFloat(formatUnits(pool.secondToken.price, 12));

    console.log(reserveFirst, priceFirst);
    console.log(reserveSecond, priceSecond);
    

    return (
        <div className="pool" key={pool.name}>
            <p className="pool-name">{pool.name}</p>

            <div className="pool-reserves">
                <p>
                    First token reserve: {reserveFirst} <br />
                </p>
                
                <p>
                    Second token reserve: {reserveSecond} <br />
                </p>
            </div>
            
            <div className="pool-reserves">
                <p>
                    Count ratio: {getRatio(reserveFirst, reserveSecond)} <br />
                    Eth ratio: {getRatio(reserveFirst * priceFirst, reserveSecond * priceSecond)} <br />
                </p>
            </div>

            <div className="pool-controls">
                <button className="button" onClick={() => addLiquidHandler(pool)}>Add liquid</button>
                <button className="button" disabled>Take liquid</button>
            </div>

            {/* Добавить кнопку "добавить ликвидность" */}
            {/* 
                Добавить кнопку "убавить ликвидность", причем, если пользователь не 
                добавлял ликвидность, то эта кнопка должна быть отключенной 
            */}
        </div>
    );
}

export default Pool