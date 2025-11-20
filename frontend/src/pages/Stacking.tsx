import { useApi } from "../hooks/useApi";
import { stackingAddress } from "../conf.json";
import { StackingApi } from "../api/Stacking";
import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import StackTokensModal from "../components/StackTokensModal";
import type { HandleSubmitFunction } from "../utils/types";
import { formatUnits, parseUnits } from "ethers";

function Stacking() {
    const api = useApi(stackingAddress, StackingApi) as StackingApi;
    const {open: stackOpen, setOpen: setStackOpen} = useModal();

    const [balance, setBalance] = useState<string | undefined>();
    const [currentReward, setCurrentReward] = useState<string | undefined>();
    const [lastRewardTime, setLastRewardTime] = useState<string | undefined>();

    const getData = async () => {
        if (!api) return;

        const balance = await api.getUserCountLp();
        setBalance(formatUnits(balance, 12));
        
        const lastRewardTime = await api.getLastRewardTime();
        setLastRewardTime(formatUnits(lastRewardTime, 12));
        
        const reward = await api.calculateReward();
        setCurrentReward(new Intl.NumberFormat("RU-ru").format(+formatUnits(reward, 12)));
    }

    useEffect(() => {
        getData();
    }, [api]);

    const handleStackOpen = () => {
        setStackOpen(true);
    };

    const handleStackSubmit: HandleSubmitFunction = async (e) => {
        if (!api) return;

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const amount = formData.get('amount') || "";

        try {
            const tx = await api.stack(parseUnits(amount.toString(), 12));

            await tx?.wait();

            setStackOpen(false);

        } catch (error) {
            alert(error);
        }
    }

    const handleClaim = async () => {
        if (!api) return;

        try {
            const tx = await api.claimReward();

            await tx?.wait();

            alert("Success");
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            if (!balance) return;

            const reward = await api.calculateReward();
            
            setCurrentReward(new Intl.NumberFormat("RU-ru").format(+formatUnits(reward, 12)));
        }, 2500);

        return () => clearInterval(interval);
    }, [balance]);

    return (
        <div className="stacking">
            <div>balance: {balance}</div>
            {balance ? <div>current reward: {currentReward}</div> : null}
            <div>last reward time: {lastRewardTime ?? "null"}</div>
            
            <button className="button stack" onClick={handleStackOpen}>Stake tokens</button>
            <button className="button warn" disabled={Boolean(!balance)}>Withdraw tokens</button>
            <button className="button" disabled={Boolean(!balance && !currentReward)} onClick={handleClaim}>Claim reward</button>

            {/* Create pool modal */}
            <StackTokensModal stackOpen={stackOpen} closeModal={() => setStackOpen(false)} handleSubmit={handleStackSubmit} />
        </div>
    );
}

export default Stacking