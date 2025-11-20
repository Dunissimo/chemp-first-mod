import { useApi } from "../hooks/useApi";
import {  } from "../conf.json";
import Modal from "./Modal";
import type { HandleSubmitFunction, IPool } from "../utils/types";
import { PoolApi } from "../api/Pool";

interface ISwapTokensModalProps {
    pool: IPool;
    swapOpen: boolean;
    closeModal: () => void;
    handleSubmit: HandleSubmitFunction;
}

function SwapTokensModal({ pool, swapOpen, handleSubmit, closeModal }: ISwapTokensModalProps) {
    const poolApi = useApi<PoolApi>(pool.address, PoolApi);

    return (
        <Modal open={swapOpen} closeModal={closeModal} className="create-modal" title={<h2>Swap tokens</h2>}>
            <div className="create-pool">
                <form className="create-pool-form" onSubmit={(e) => handleSubmit(e, poolApi, pool)}>
                    <label className="create-pool-label" htmlFor="first-token">
                        I wanna swap: 
                        <select name="token" id="first-token" required>
                            <option value={pool.firstToken.name}>{pool.firstToken.name}</option>
                            <option value={pool.secondToken.name}>{pool.secondToken.name}</option>
                        </select>
                    </label>

                    <label className="create-pool-label" htmlFor="first-token-amount">
                        Amount: 
                        <input name="amount" type="number" id="first-token-amount" placeholder="Number" min={0} />
                    </label>
                    
                    <button type="submit">Swap</button>
                </form>
            </div>
        </Modal>
    );
}

export default SwapTokensModal;