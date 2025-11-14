import { useEffect, useState
 } from "react";
import { useApi } from "../hooks/useApi";
import { factoryAddress } from "../conf.json";
import { FactoryApi } from "../api/Factory";
import { useAuth } from "../hooks/useAuth";
import type { IPool } from "../utils/types";
import { useModal } from "../hooks/useModal";
import Pool from "../components/Pool";
import CreatePoolModal from "../components/CreatePoolModal";
import AddLiquidPoolModal from "../components/AddLiquidPoolModal";

function Pools() {
    const {signer} = useAuth();
    const {open: addOpen, setOpen: setAddOpen} = useModal();
    const {open: createOpen, setOpen: setCreateOpen} = useModal();

    const api = useApi(factoryAddress, FactoryApi) as FactoryApi;
    
    const [pools, setPools] = useState<IPool[]>([]);
    const [userPools, setUserPools] = useState<IPool[]>([]);
    const [selectedPool, setSelectedPool] = useState<IPool | null>(null);

    useEffect(() => {
        const getData = async () => {
            if (!api) return;

            const pools = await api.getPools();
            setPools(pools);

            if (!signer) return;

            const userPools = await api.getUserPools(signer, pools);
            setUserPools(userPools);                
        }

        getData();
    }, [signer, api]);

    const addLiquidHandler = (pool: IPool) => {
        setSelectedPool(pool);
        setAddOpen(true);
    };

    const closeCreateModal = () => {
        setCreateOpen(false);
    }

    const closeAddModal = () => {
        setSelectedPool(null);
        setAddOpen(false);
    }
    
    return (
        <>
            <div className="add-pool">
                <button className='button' onClick={() => setCreateOpen(true)}>Create new pool</button>
            </div>

            <div className="pools">
                <h2>My pools:</h2>
                
                <div className="pools-list">
                    {userPools.map(pool => {
                        return (
                            <Pool pool={pool} addLiquidHandler={addLiquidHandler} />
                        )
                    })}
                </div>

                <h2>All pools:</h2>

                <div className="pools-list">
                    {pools.map(pool => {
                        return (
                            <Pool pool={pool} addLiquidHandler={addLiquidHandler} />
                        );
                    })}
                </div>
            </div>

            {/* Create pool modal */}
            <CreatePoolModal createOpen={createOpen} closeModal={closeCreateModal}/>
            
            {/* Add liquid modal */}
            {selectedPool && <AddLiquidPoolModal pool={selectedPool} addOpen={addOpen} closeModal={closeAddModal} />}
        </>
    );
}

export default Pools