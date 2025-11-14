import { FactoryApi } from "../api/Factory";
import { useApi } from "../hooks/useApi";
import { factoryAddress } from "../conf.json";
import Modal from "./Modal";
import { useBalance } from "../hooks/useBalance";
import type { FormEvent } from "react";
import { getTokenAddress } from "../utils/helpers";
import { useAuth } from "../hooks/useAuth";
import { ethers } from "ethers";

interface ICreatePoolModalProps {
    createOpen: boolean;
    closeModal: () => void;
}

function CreatePoolModal({ createOpen, closeModal }: ICreatePoolModalProps) {
    const {signer} = useAuth();
    const factoryApi = useApi<FactoryApi>(factoryAddress, FactoryApi);
    const {updateBalance} = useBalance();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const firstToken = formData.get('firstToken') || "";
        const secondToken = formData.get('secondToken') || "";
        const firstAmount = formData.get('firstTokenAmount') || "";
        const secondAmount = formData.get('secondTokenAmount') || "";
        
        try {
            // here signer is not null 100%
            // bc pool creating is under AuthGuard
            const tx = await factoryApi?.createPoolWithLiquidity(
                getTokenAddress(firstToken.toString().toLowerCase()), 
                getTokenAddress(secondToken.toString().toLowerCase()), 
                `${firstToken}-${secondToken}`,
                await signer?.getAddress()!,
                ethers.parseUnits(firstAmount.toString(), 12),
                ethers.parseUnits(secondAmount.toString(), 12),
            );

            await tx?.wait();
            
            updateBalance();
            closeModal();
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Modal open={createOpen} closeModal={closeModal} className="create-modal" title={<h2>Create new pool</h2>}>
            <div className="create-pool">
                <form className="create-pool-form" onSubmit={handleSubmit}>
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
                            <option value="gerda">GERDA</option>
                            <option value="krendel">KRENDEL</option>
                            <option value="RTK">RTK</option>
                        </select>
                    </label>

                    <label className="create-pool-label" htmlFor="second-token-amount">
                        Second amount: 
                        <input name="secondTokenAmount" type="number" id="second-token-amount" placeholder="Number" min={0} />
                    </label>

                    <button type="submit">Create</button>
                </form>
            </div>
        </Modal>
    );
}

export default CreatePoolModal;