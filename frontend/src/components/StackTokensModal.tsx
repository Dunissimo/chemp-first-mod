import Modal from "./Modal";
import type { HandleSubmitFunction } from "../utils/types";

interface IStackTokensModalProps {
    stackOpen: boolean;
    closeModal: () => void;
    handleSubmit: HandleSubmitFunction;
}

function StackTokensModal({ stackOpen, handleSubmit, closeModal }: IStackTokensModalProps) {
    return (
        <Modal open={stackOpen} closeModal={closeModal} className="create-modal" title={<h2>Stack tokens</h2>}>
            <div className="create-pool">
                <form className="create-pool-form" onSubmit={handleSubmit}>
                    <label className="create-pool-label" htmlFor="amount">
                        Amount: 
                        <input name="amount" type="number" id="amount" placeholder="Number" min={0} />
                    </label>
                    
                    <button type="submit">Stack</button>
                </form>
            </div>
        </Modal>
    );
}

export default StackTokensModal;