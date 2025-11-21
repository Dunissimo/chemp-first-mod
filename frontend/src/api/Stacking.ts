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

    async setTimeStamp(user: string) {
        return this.contract.startStacking(user);
    }

    async stack(user: string, amount: BigNumberish) {
        return this.contract.stack(user, amount);
    }
    
    async withdraw(user: string, amount: BigNumberish) {
        return this.contract.withdraw(user, amount);
    }

    async claimReward(user: string) {
        return this.contract.claimReward(user);
    }

    async calculateReward(user: string) {
        return this.contract.calculateReward(user);
    }
}