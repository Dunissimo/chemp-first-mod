import { useApi } from "../hooks/useApi";
import Modal from "./Modal";
import type { HandleSubmitFunction, IPool } from "../utils/types";
import { PoolApi } from "../api/Pool";

interface IAddLiquidPoolModalProps {
    pool: IPool;
    addOpen: boolean;
    closeModal: () => void;
    handleSubmit: HandleSubmitFunction;
}

function AddLiquidPoolModal({ pool, addOpen, handleSubmit, closeModal }: IAddLiquidPoolModalProps) {
    const poolApi = useApi<PoolApi>(pool.address, PoolApi);

    return (
        <Modal open={addOpen} closeModal={closeModal} className="create-modal" title={<h2>Add liquidity to pool</h2>}>
            <div className="create-pool">
                <form className="create-pool-form" onSubmit={(e) => handleSubmit(e, poolApi)}>
                    <label className="create-pool-label" htmlFor="first-token">
                        First token: 
                        <select name="firstToken" id="first-token" required disabled>
                            <option value="GERDA" selected={pool.firstToken.name === "GERDA"}>GERDA</option>
                            <option value="KRENDEL" selected={pool.firstToken.name === "KRENDEL"}>KRENDEL</option>
                            <option value="RTK" selected={pool.firstToken.name === "RTK"}>RTK</option>
                        </select>
                    </label>
                    
                    <label className="create-pool-label" htmlFor="first-token-amount">
                        First amount: 
                        <input name="firstTokenAmount" type="number" id="first-token-amount" placeholder="Number" min={0} />
                    </label>
                    
                    <label className="create-pool-label" htmlFor="second-token">
                        Second token: 
                        <select name="secondToken" id="second-token" required disabled>
                            <option value="GERDA" selected={pool.secondToken.name === "GERDA"}>GERDA</option>
                            <option value="KRENDEL" selected={pool.secondToken.name === "KRENDEL"}>KRENDEL</option>
                            <option value="RTK" selected={pool.secondToken.name === "RTK"}>RTK</option>
                        </select>
                    </label>

                    <label className="create-pool-label" htmlFor="second-token-amount">
                        Second amount: 
                        <input name="secondTokenAmount" type="number" id="second-token-amount" placeholder="Number" min={0} />
                    </label>

                    <button type="submit">Add</button>
                </form>
            </div>
        </Modal>
    );
}

export default AddLiquidPoolModal;