import { formatUnits } from "ethers";
import {gerdaAddress, krendelAddress, rtkAddress} from "../conf.json";
import type { BigNumberish } from "ethers";

export const formatNumber = (num: number) => {
    return Intl.NumberFormat('RU-ru').format(num);
}

export const getTokenAddress = (name: string) => {
    switch (name) {
        case 'gerda':
            return gerdaAddress;
        case 'krendel':
            return krendelAddress;
        case 'rtk':
            return rtkAddress;
    
        default:
            throw new Error("Unknown token name");
    }    
}

export const format = (units?: BigNumberish, decimals?: BigNumberish) => {
    if (!units || !decimals) return;

    return Intl.NumberFormat('RU-ru').format(Number(formatUnits(units, decimals)));
}

export const getRatio = (x: number, y: number): string => {
    function gcd(x: number, y: number): number {
        return y === 0 ? x : gcd(y, x % y);
    }

    const divisor = gcd(x, y);

    const first = x / divisor;
    const second = y / divisor;

    return `${first}/${second}`;
}