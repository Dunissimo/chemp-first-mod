import type { FormEvent } from "react";
import {factoryAddress} from "../conf.json";
import { useApi } from "../hooks/useApi";
import { FactoryApi } from "../api/Factory";
import { getTokenAddress } from "../utils/helpers";
import { useAuth } from "../hooks/useAuth";
import { useBalance } from "../hooks/useBalance";

function CreatePool() {
    const {signer} = useAuth();
    const {updateBalance} = useBalance();
    const api = useApi<FactoryApi>(factoryAddress, FactoryApi);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const first = formData.get('firstToken') || "";
        const second = formData.get('secondToken') || "";
        
        try {
            // here signer is not null 100%
            // bc page is under AuthGuard
            await api?.createPool(getTokenAddress(first.toString()), getTokenAddress(second.toString()), `${first}-${second}`, await signer?.getAddress()!);
            
            updateBalance();
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className="create-pool">
            <h1>Create new pool</h1>

            <form className="create-pool-form" onSubmit={handleSubmit}>
                <label className="create-pool-label" htmlFor="first-token">
                    First token: 
                    <select name="firstToken" id="first-token" required>
                        <option value="" selected disabled>Выбрать токен</option>
                        <option value="gerda">GERDA</option>
                        <option value="krendel">KRENDEL</option>
                        <option value="rtk">RTK</option>
                    </select>
                </label>
                
                <label className="create-pool-label" htmlFor="second-token">
                    Second token: 
                    <select name="secondToken" id="second-token" required>
                        <option value="" selected disabled>Выбрать токен</option>
                        <option value="gerda">GERDA</option>
                        <option value="krendel">KRENDEL</option>
                        <option value="rtk">RTK</option>
                    </select>
                </label>

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreatePool