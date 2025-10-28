import { Pool__factory } from "../../../hardhat/typechain-types/factories/Pool__factory";
import type { Pool } from "../../../hardhat/typechain-types/Pool";
import { BaseApi } from "./BaseApi";
import { type BigNumberish } from 'ethers';
import type { SignerOrProvider } from "../utils/types";

export class PoolApi extends BaseApi<Pool> {
    constructor(_address: string, signer: SignerOrProvider) {
        super(_address, Pool__factory.connect, signer);
    }

    async getOwner() {
        return this.contract.owner();
    }
    
    async getName() {
        return this.contract.name();
    }
    async getFirstToken() {
        return this.contract.firstToken();
    }
    async getSecondToken() {
        return this.contract.secondToken();
    }

    async swap(tokenIn: string, tokenOut: string, amount: BigNumberish) {
        return this.contract.swap(tokenIn, tokenOut, amount);
    }
    
    async addLiquid(token: string, amount: BigNumberish) {
        return this.contract.addLiquid(token, amount);
    }

    async removeLiquid(token: string, amount: BigNumberish) {
        return this.contract.removeLiquid(token, amount);
    }
}