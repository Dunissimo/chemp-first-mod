import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

import { factoryAddress } from "../conf.json";
import { FactoryApi } from "../api/Factory";
import { useAuth } from "../hooks/useAuth";
import type { IPool } from "../utils/types";
import { NavLink } from "react-router";

function Pools() {
    const {signer} = useAuth();
    const api = useApi(factoryAddress, FactoryApi) as FactoryApi;

    const [pools, setPools] = useState<IPool[]>([]);

    useEffect(() => {
        const getData = async () => {
            if (!api) return;

            const pools = await api.getPools(signer);
            setPools(pools);
        }

        getData();
    }, [api]);
    
    return (
        <>
            <div className="add-pool">
                <NavLink className='button' to={'/pool/create'}>Создать пул</NavLink>
            </div>

            <div className="pools">
                {pools.map(pool => {
                    return (
                        <div className="pool">
                            <p className="pool-name">{pool.name}</p>

                            <div className="pool-reserves">
                                <p>
                                    First token reserve: {pool.firstToken.reserve} <br />
                                </p>
                                
                                <p>
                                    Second token reserve: {pool.secondToken.reserve} <br />
                                </p>
                            </div>

                            {/* Показывать соотношение токенов */}

                            {/* Добавить кнопку "добавить ликвидность" */}
                            {/* 
                                Добавить кнопку "убавить ликвидность", причем, если пользователь не 
                                добавлял ликвидность, то эта кнопка должна быть отключенной 
                            */}
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Pools