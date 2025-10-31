import type { IGetBalanceReturns } from "../utils/types";

interface IBalancesProps {
    balance?: IGetBalanceReturns;
}

function Balances({ balance }: IBalancesProps) {
    if (!balance) return;

    return (
        <>
            <span>Eth: {balance.eth}</span>
            <span>GERDA: {balance.gerda}</span>
            <span>KRENDEL: {balance.krendel}</span>
            <span>RTK: {balance.rtk}</span>
            <span>PROFI: {balance.profi}</span>
        </>
    )
}

export default Balances;