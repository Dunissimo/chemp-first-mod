import { formatUnits } from "ethers";
import {gerdaAddress, krendelAddress, rtkAddress} from "../conf.json";
import type { BigNumberish, ethers } from "ethers";
import type { JsonRpcProvider } from "ethers";
import type { JsonRpcApiProvider } from "ethers";

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

export const getRatio = (a: number, b: number) => {
    function gcd(a: number, b: number) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    const commonDivisor = gcd(Math.floor(a), Math.floor(b));

    const ratioA = a / commonDivisor;
    const ratioB = b / commonDivisor;
  
    return `${Math.floor(ratioA)}/${Math.floor(ratioB)}`;
}


export const increaseTime = async (provider: JsonRpcApiProvider, seconds: number) => {
    await provider.send("evm_increaseTime", [seconds]); // увеличиваем время
    await provider.send("evm_mine", []); // майним новый блок
}