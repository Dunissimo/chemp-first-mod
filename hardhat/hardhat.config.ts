import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const accKey1 = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const accKey2 = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
const accKey3 = "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6";
const accKey4 = "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      accounts: [
        {privateKey: accKey1, balance: "10000000000000000000000"},
        {privateKey: accKey2, balance: "20000000000000000000000"},
        {privateKey: accKey3, balance: "30000000000000000000000"},
        {privateKey: accKey4, balance: "10000000000000000000000"}
      ],
      chainId: 1338,
    }
  }
};

export default config;
