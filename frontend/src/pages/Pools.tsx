import { useAuth } from "../hooks/useAuth";
import type { HandleSubmitFunction, IPool } from "../utils/types";
import { useModal } from "../hooks/useModal";
import Pool from "../components/Pool";
import CreatePoolModal from "../components/CreatePoolModal";
import AddLiquidPoolModal from "../components/AddLiquidPoolModal";
import SwapTokensModal from "../components/SwapTokensModal";
import { useBalance } from "../hooks/useBalance";
import { parseUnits } from "ethers";
import { usePools } from "../hooks/usePools";

function Pools() {
    const {isAuth} = useAuth();
    const {updateBalance} = useBalance();
    const {open: addOpen, setOpen: setAddOpen} = useModal();
    const {open: createOpen, setOpen: setCreateOpen} = useModal();
    const {open: swapOpen, setOpen: setSwapOpen} = useModal();
    const {pools, selectedPool, userPools, setSelectedPool, updatePools} = usePools();

    const addLiquidHandleOpen = (pool: IPool) => {
        setSelectedPool(pool);
        setAddOpen(true);
    };

    const addLiquidHandleSubmit: HandleSubmitFunction = async (e, poolApi) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const firstAmount = formData.get('firstTokenAmount') || "";
        const secondAmount = formData.get('secondTokenAmount') || "";
        
        try {
            const tx = await poolApi?.addLiquid(
                parseUnits(firstAmount.toString(), 12),
                parseUnits(secondAmount.toString(), 12),
            );

            await tx?.wait();
            
            updateBalance();
            await updatePools();
            closeModal("add");
        } catch (error) {
            alert(error);
        }
    }

    const swapHandleOpen = async (pool: IPool) => {
        setSelectedPool(pool);
        setSwapOpen(true);
    }

    const swapHandleSubmit: HandleSubmitFunction = async (e, poolApi, pool) => {
        e.preventDefault();

        if (!pool) return;

        const formData = new FormData(e.currentTarget);
        const amount = formData.get('amount') || "";
        const token = formData.get('token')  || "";

        const tokenSwapAddress = token === pool.firstToken.name ? pool.firstToken.address : pool.secondToken.address;
        const tokenGetAddress = token === pool.secondToken.name ? pool.firstToken.address : pool.secondToken.address;

        try {
            const tx = await poolApi?.swap(
                tokenSwapAddress,
                tokenGetAddress,
                parseUnits(amount.toString(), 12),
            );

            await tx?.wait();
            
            updateBalance();
            await updatePools();
            closeModal("swap");
        } catch (error) {
            alert(error);
        }
    }

    const closeModal = (type: "create" | "add" | "swap") => {
        switch (type) {
            case "create":
                setCreateOpen(false);
                break;
        
            case "add":
                setSelectedPool(null);
                setAddOpen(false);
                break;
            case "swap":
                setSelectedPool(null);
                setSwapOpen(false);
                break;
        }
    }
    
    return (
        <>
            {isAuth && (
                <div className="add-pool">
                    <button className='button' onClick={() => setCreateOpen(true)}>Create new pool</button>
                </div>
            )}

            <div className="pools">
                <h2>My pools:</h2>
                
                <div className="pools-list">
                    {userPools.map(pool => {
                        return (
                            <Pool pool={pool} handleAddOpen={addLiquidHandleOpen} handleSwapOpen={swapHandleOpen} />
                        )
                    })}
                </div>

                <h2>All pools:</h2>

                <div className="pools-list">
                    {pools.map(pool => {
                        return (
                            <Pool pool={pool} handleAddOpen={addLiquidHandleOpen} handleSwapOpen={swapHandleOpen} />
                        );
                    })}
                </div>
            </div>

            {/* Create pool modal */}
            <CreatePoolModal createOpen={createOpen} closeModal={() => closeModal("create")}/>
            
            {/* Add liquid modal */}
            {selectedPool && <AddLiquidPoolModal pool={selectedPool} addOpen={addOpen} handleSubmit={addLiquidHandleSubmit} closeModal={() => closeModal("add")} />}
            
            {/* Swap tokens modal */}
            {selectedPool && <SwapTokensModal pool={selectedPool} swapOpen={swapOpen} handleSubmit={swapHandleSubmit} closeModal={() => closeModal("swap")} />}
        </>
    );
}

export default Pools