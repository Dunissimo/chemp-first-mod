import Modal from "./Modal";
import type { HandleSubmitFunction } from "../utils/types";

interface IWithdrawTokensModalProps {
    withdrawOpen: boolean;
    max: number;
    closeModal: () => void;
    handleSubmit: HandleSubmitFunction;
}

function WithdrawTokensModal({ withdrawOpen, max, handleSubmit, closeModal }: IWithdrawTokensModalProps) {
    return (
        <Modal open={withdrawOpen} closeModal={closeModal} className="create-modal" title={<h2>Stack tokens</h2>}>
            <div className="create-pool">
                <form className="create-pool-form" onSubmit={handleSubmit}>
                    <label className="create-pool-label" htmlFor="amount">
                        Amount: 
                        <input name="amount" type="number" id="amount" placeholder="Number" min={0} max={max} style={{width: "150px"}} />
                    </label>
                    
                    <button type="submit">Withdraw</button>
                </form>
            </div>
        </Modal>
    );
}

export default WithdrawTokensModal;