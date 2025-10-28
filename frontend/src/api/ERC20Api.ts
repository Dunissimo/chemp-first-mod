import { ERC20__factory } from "../../../hardhat/typechain-types/factories/ERC20__factory";
import type { ERC20 } from "../../../hardhat/typechain-types/ERC20";
import { BaseApi } from "./BaseApi";
import type { BigNumberish } from "ethers";
import type { SignerOrProvider } from "../utils/types";

export class ERC20Api extends BaseApi<ERC20> {
    constructor(_address: string, signer: SignerOrProvider) {
        super(_address, ERC20__factory.connect, signer);
    }

    async getTotalSupply() {
        return this.contract.totalSupply();
    }
    
    async getOwner() {
        return this.contract.owner();
    }
    
    async getDecimals() {
        return this.contract.decimals();
    }
    
    async getSymbol() {
        return this.contract.symbol();
    }
    
    async mint(receipent: string, amount: BigNumberish) {
        return this.contract.mint(receipent, amount);
    }
    
    async burn(spender: string, amount: BigNumberish) {
        return this.contract.burn(spender, amount);
    }

    async transfer(to: string, amount: BigNumberish) {
        return this.contract.transfer(to, amount);
    }

    async transferFrom(from: string, to: string, amount: BigNumberish) {
        return this.contract.transferFrom(from, to, amount);
    }

    async balanceOf(address: string) {
        return this.contract.balanceOf(address);
    }
    
    async getAllowance(address: string, spender: string) {
        return this.contract.allowance(address, spender);
    }

    async approve(spender: string, amount: BigNumberish) {
        return this.contract.approve(spender, amount);
    }
}