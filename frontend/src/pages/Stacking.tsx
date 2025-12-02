import { useApi } from "../hooks/useApi";
import { stackingAddress } from "../conf.json";
import { StackingApi } from "../api/Stacking";
import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import StackTokensModal from "../components/StackTokensModal";
import type { HandleSubmitFunction } from "../utils/types";
import { formatUnits, parseUnits } from "ethers";
import { useAuth } from "../hooks/useAuth";
import { useBalance } from "../hooks/useBalance";
import WithdrawTokensModal from "../components/WithdrawTokensModal";

function Stacking() {
    const {signer} = useAuth();
    const api = useApi(stackingAddress, StackingApi) as StackingApi;
    const {open: stackOpen, setOpen: setStackOpen} = useModal();
    const {open: withdrawOpen, setOpen: setWithdrawOpen} = useModal();
    const {updateBalance} = useBalance();

    const [lpBalance, setBalance] = useState<string | undefined>();

    const getData = async () => {
        if (!api || !signer) return;

        updateLpBalance();
    }

    useEffect(() => {
        getData();
    }, [api]);

    const handleStackOpen = () => {
        setStackOpen(true);
    };
    
    const handleWithdrawOpen = () => {
        setWithdrawOpen(true);
    };

    const updateLpBalance = async () => {
        const _lpBalance = await api.getUserCountLp();
        setBalance(formatUnits(_lpBalance, 12));
    }

    const handleStackSubmit: HandleSubmitFunction = async (e) => {
        if (!api || !signer) return;

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const amount = formData.get('amount') || "";

        try {
            const tx = await api.stack(await signer.getAddress(), parseUnits(amount.toString(), 12));

            await tx?.wait();

            setStackOpen(false);
            updateBalance();
            updateLpBalance();
        } catch (error) {
            alert(error);
        }
    }

    const handleWithdraw: HandleSubmitFunction = async (e) => {
        if (!api || !signer) return;

        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const amount = formData.get('amount') || "";

            const tx = await api.withdraw(await signer.getAddress(), parseUnits(amount.toString(), 12));

            await tx?.wait();

            updateBalance();
            updateLpBalance();
            alert("Success");
            setWithdrawOpen(false);
        } catch (error) {
            alert(error);
        }
    }

    const handleClaim = async () => {
        if (!api || !signer) return;

        try {
            const tx = await api.claimReward(await signer.getAddress());

            await tx?.wait();

            updateBalance();
            alert("Success");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="stacking">
            <div>balance: {lpBalance}</div>
            
            <button className="button stack" onClick={handleStackOpen}>Stake tokens</button>
            <button className="button warn" disabled={!Boolean(lpBalance)} onClick={handleWithdrawOpen}>Withdraw tokens</button>
            <button className="button" disabled={!Boolean(lpBalance)} onClick={handleClaim}>Claim reward</button>

            {/* Stack tokens modal */}
            <StackTokensModal stackOpen={stackOpen} closeModal={() => setStackOpen(false)} handleSubmit={handleStackSubmit} />
          
            {/* Stack tokens modal */}
            <WithdrawTokensModal withdrawOpen={withdrawOpen} closeModal={() => setWithdrawOpen(false)} handleSubmit={handleWithdraw} max={Number(lpBalance)} />
        </div>
    );
}

export default Stacking