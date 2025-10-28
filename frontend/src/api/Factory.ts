import { Factory__factory } from "../../../hardhat/typechain-types/factories/Factory__factory";
import type { Factory } from "../../../hardhat/typechain-types/Factory";
import { BaseApi } from "./BaseApi";
import type { SignerOrProvider } from "../utils/types";

export class FactoryApi extends BaseApi<Factory> {
    constructor(_address: string, signer: SignerOrProvider) {
        super(_address, Factory__factory.connect, signer);
    }

    async createPool(firstToken: string, secondToken: string, name: string) {
        return this.contract.createPool(firstToken, secondToken, name);
    }

    async getPoolsAddresses() {
        return this.contract.getPools();
    }
}