import {gerdaAddress, krendelAddress, rtkAddress} from "../conf.json";

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