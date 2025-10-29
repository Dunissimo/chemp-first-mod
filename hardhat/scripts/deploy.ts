import { ethers } from "hardhat";
import fs from "node:fs";
import path from "node:path";

async function deploy() {
    const [owner, ...others] = await ethers.getSigners();
    const contract = await ethers.getContractFactory("ERC20");
    const contractFactory = await ethers.getContractFactory("Factory");
    const contractPool = await ethers.getContractFactory("Pool");
    
    const gerda = await contract.deploy(100000, "GerdaCoin", 12, "GERDA");
    const gerdaAddress = await gerda.getAddress();
    const krendel = await contract.deploy(150000, "KrendelCoin", 12, "KRENDEL");
    const krendelAddress = await krendel.getAddress();
    const rtk = await contract.deploy(300000, "RTKCoin", 12, "RTK");
    const profi = await contract.deploy(0, "Professional", 12, "PROFI");

    const factory = await contractFactory.deploy();
    await factory.createPool(gerdaAddress, krendelAddress, "GERDA-KRENDEL");

    const data = {
        gerdaAddress,
        krendelAddress,
        rtkAddress: await rtk.getAddress(),
        profiAddress: await profi.getAddress(),
        factoryAddress: await factory.getAddress(),
    }

    const frontendDir = path.join(__dirname, "../../frontend/src/conf.json");

    fs.writeFileSync(frontendDir, JSON.stringify(data, null, 2));
}

deploy().catch((error) => {
    console.error(error);
    process.exit(1);
});