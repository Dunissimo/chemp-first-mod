import { Factory__factory } from "../../../hardhat/typechain-types/factories/Factory__factory";
import type { Factory } from "../../../hardhat/typechain-types/Factory";
import { BaseApi } from "./BaseApi";
import type { IPool, SignerOrProvider } from "../utils/types";
import { PoolApi } from "./Pool";
import { ethers, type JsonRpcSigner } from "ethers";
import type { BrowserProvider } from "ethers";
import type { BigNumberish } from "ethers";
import { ERC20Api } from "./ERC20Api";

export class FactoryApi extends BaseApi<Factory> {
    constructor(_address: string, signer: SignerOrProvider) {
        super(_address, Factory__factory.connect, signer);
    }

    async createPool(firstToken: string, secondToken: string, name: string, address: string) {
        return this.contract.createPool(firstToken, secondToken, name, address);
    }

    async createPoolWithLiquidity(
        firstToken: string, 
        secondToken: string, 
        name: string, 
        owner: string, 
        amountFirst: BigNumberish, 
        amountSecond: BigNumberish
    ) {
        return this.contract.createPoolWithLiquidity(
            firstToken,
            secondToken,
            name,
            owner,
            amountFirst,
            amountSecond
        );
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
            const firstToken = await pool.getFirstToken();
            const secondToken = await pool.getSecondToken();
            const provider = new ethers.BrowserProvider(window.ethereum!);

            const firstTokenApi = new ERC20Api(firstToken, provider);
            const secondTokenApi = new ERC20Api(secondToken, provider);

            pools.push({
                firstToken: {
                    name: await firstTokenApi.getSymbol(),
                    address: firstToken,
                    reserve: await pool.getFirstTokenReserves(),
                    price: await firstTokenApi.getBasePrice(),
                },
                secondToken: {
                    name: await new ERC20Api(secondToken, provider).getSymbol(),
                    address: secondToken,
                    reserve: await pool.getSecondTokenReserves(),
                    price: await secondTokenApi.getBasePrice(),
                },
                name: await pool.getName(),
                owner: await pool.getOwner(),
                address: await pool.getAddress(),
            });
        }

        return pools;
    }

    async getUserPools(signer: JsonRpcSigner, pools: IPool[]) {
        const userAddress = await signer?.getAddress();

        if (!userAddress) throw new Error('Got no user address');

        return pools.filter((pool) => ethers.getAddress(pool.owner) === ethers.getAddress(userAddress));
    }

    async getNoUserPools(signer : JsonRpcSigner, pools: IPool[]) {
        const userAddress = await signer?.getAddress();

        if (!userAddress) throw new Error('Got no user address');

        return pools.filter((pool) => ethers.getAddress(pool.owner) !== ethers.getAddress(userAddress));
    }
}