import {type ERC20} from "../../../hardhat/typechain-types/ERC20";
import {type Pool} from "../../../hardhat/typechain-types/Pool";
import {type Stacking} from "../../../hardhat/typechain-types/Stacking";
import {type Factory} from "../../../hardhat/typechain-types/Factory";

import type { ContractRunner } from "ethers";
import type { ERC20Api } from "../api/ERC20Api";
import type { PoolApi } from "../api/Pool";
import type { FactoryApi } from "../api/Factory";
import type { StackingApi } from "../api/Stacking";
import type { Signer } from "ethers";
import type { BrowserProvider } from "ethers";

export type TContract = ERC20 | Pool | Stacking | Factory;
export type TConnect = (address: string, runner?: ContractRunner | null | undefined) => TContract;
export type TApi = typeof ERC20Api | typeof PoolApi | typeof FactoryApi | typeof StackingApi;
export type TApiInstance = ERC20Api | PoolApi | FactoryApi | StackingApi;
export type SignerOrProvider = Signer | BrowserProvider | null;