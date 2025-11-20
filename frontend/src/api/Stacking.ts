import { Stacking__factory } from "../../../hardhat/typechain-types/factories/Stacking__factory";
import type { Stacking } from "../../../hardhat/typechain-types/Stacking";
import { BaseApi } from "./BaseApi";
import type { BigNumberish } from "ethers";
import type { SignerOrProvider } from "../utils/types";

export class StackingApi extends BaseApi<Stacking> {
    constructor(_address: string, signer: SignerOrProvider) {
        super(_address, Stacking__factory.connect, signer);
    }
    
    async getLastRewardTime() {
        return this.contract.getLastRewardTime();
    }
    
    async getUserCountLp() {
        return this.contract.getUserCountLp();
    }

    async stack(amount: BigNumberish) {
        return this.contract.stack(amount);
    }
    
    async withdraw(amount: BigNumberish) {
        return this.contract.withdraw(amount);
    }

    async claimReward() {
        return this.contract.claimReward();
    }

    async calculateReward() {
        return this.contract.calculateReward();
    }
}