import Modal from "./Modal";
import type { HandleSubmitFunction } from "../utils/types";

interface ISwapRouteTokensModalProps {
    swapOpen: boolean;
    closeModal: () => void;
    handleSubmit: HandleSubmitFunction;
}

function SwapRouteTokensModal({ swapOpen, handleSubmit, closeModal }: ISwapRouteTokensModalProps) {
    return (
        <Modal open={swapOpen} closeModal={closeModal} className="create-modal" title={<h2>Swap tokens</h2>}>
            <div className="create-pool">
                <form className="create-pool-form" onSubmit={(e) => handleSubmit(e)}>
                    <label className="create-pool-label" htmlFor="first-token">
                        First token: 
                        <select name="firstToken" id="first-token" required>
                            <option value="" selected disabled>Выбрать токен</option>
                            <option value="GERDA">GERDA</option>
                            <option value="KRENDEL">KRENDEL</option>
                            <option value="RTK">RTK</option>
                        </select>
                    </label>
                    
                    <label className="create-pool-label" htmlFor="first-token-amount">
                        First amount: 
                        <input name="firstTokenAmount" type="number" id="first-token-amount" placeholder="Number" min={0} />
                    </label>
                    
                    <label className="create-pool-label" htmlFor="second-token">
                        Second token: 
                        <select name="secondToken" id="second-token" required>
                            <option value="" selected disabled>Выбрать токен</option>
                            <option value="GERDA">GERDA</option>
                            <option value="KRENDEL">KRENDEL</option>
                            <option value="RTK">RTK</option>
                        </select>
                    </label>

                    <label className="create-pool-label" htmlFor="second-token-amount">
                        Second amount: 
                        <input name="secondTokenAmount" type="number" id="second-token-amount" placeholder="Number" min={0} />
                    </label>
                    
                    <button type="submit">Swap</button>
                </form>
            </div>
        </Modal>
    );
}

export default SwapRouteTokensModal;