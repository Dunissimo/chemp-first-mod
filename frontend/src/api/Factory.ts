import { Factory__factory } from "../../../hardhat/typechain-types/factories/Factory__factory";
import type { Factory } from "../../../hardhat/typechain-types/Factory";
import { BaseApi } from "./BaseApi";
import type { IPool, SignerOrProvider } from "../utils/types";
import { PoolApi } from "./Pool";
import { ethers, type JsonRpcSigner } from "ethers";
import type { BrowserProvider } from "ethers";

export class FactoryApi extends BaseApi<Factory> {
    constructor(_address: string, signer: SignerOrProvider) {
        super(_address, Factory__factory.connect, signer);
    }

    async createPool(firstToken: string, secondToken: string, name: string, address: string) {
        return this.contract.createPool(firstToken, secondToken, name, address);
    }

    async getPoolsAddresses() {
        return this.contract.getPools();
    }

    async getPools(signer: JsonRpcSigner | null = null) {
        const addresses = await this.getPoolsAddresses();
        const pools: IPool[] = [];
        let _signer: JsonRpcSigner | BrowserProvider | null = null;

        if (!signer && window.ethereum) {
            _signer = new ethers.BrowserProvider(window.ethereum);
        } else if (signer) {
            _signer = signer;
        } else {
            throw new Error("Cannot get signer in getPools call");
        }

        for (let i = 0; i < addresses.length; i++) {
            const pool = new PoolApi(addresses[i], _signer);
            
            pools.push({
                firstToken: {
                    address: await pool.getFirstToken(),
                    reserve: ethers.toNumber(await pool.getFirstTokenReserves()),
                },
                secondToken: {
                    address: await pool.getSecondToken(),
                    reserve: ethers.toNumber(await pool.getSecondTokenReserves()),
                },
                name: await pool.getName(),
            });
        }

        return pools;
    }
}