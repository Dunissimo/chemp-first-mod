import type { SignerOrProvider, TConnect } from "../utils/types";

export class BaseApi<T> {
    public contract: T;
    public address: string;

    constructor(_address: string, connect: TConnect, signer: SignerOrProvider) {
        this.address = _address;
        this.contract = connect(_address, signer) as T;
    }
}