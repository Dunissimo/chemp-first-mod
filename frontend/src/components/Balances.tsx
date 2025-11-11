import type { IGetBalanceReturns } from "../utils/types";
import { format } from "../utils/helpers";

interface IBalancesProps {
    balance?: IGetBalanceReturns;
}

function Balances({ balance }: IBalancesProps) {
    if (!balance) return;

    return (
        <>
            <span>Eth: {balance.eth}</span>
            <span>GERDA: {format(balance.gerda.units, balance.gerda.decimals)}</span>
            <span>KRENDEL: {format(balance.krendel.units, balance.krendel.decimals)}</span>
            <span>RTK: {format(balance.rtk.units, balance.rtk.decimals)}</span>
            <span>PROFI: {format(balance.profi.units, balance.profi.decimals)}</span>
        </>
    )
}

export default Balances;