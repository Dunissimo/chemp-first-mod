import { ethers } from "hardhat";
import fs from "node:fs";
import path from "node:path";

async function deploy() {
    const [Owner, Tom, Ben, Rick] = await ethers.getSigners();

    const contract = await ethers.getContractFactory("ERC20");
    const contractFactory = await ethers.getContractFactory("Factory");
    const contractPool = await ethers.getContractFactory("Pool");

    const gerda = await contract.deploy(0, "GerdaCoin", 12, "GERDA");
    const gerdaAddress = await gerda.getAddress();
    const krendel = await contract.deploy(0, "KrendelCoin", 12, "KRENDEL");
    const krendelAddress = await krendel.getAddress();
    const rtk = await contract.deploy(0, "RTKCoin", 12, "RTK");
    const rtkAddress = await rtk.getAddress();
    const profi = await contract.deploy(0, "Professional", 12, "PROFI");
    const profiAddress = await profi.getAddress();

    await gerda.mint(await Owner.getAddress(), 100000);
    await krendel.mint(await Owner.getAddress(), 150000);
    await rtk.mint(await Owner.getAddress(), 300000);

    const factory = await contractFactory.deploy(profiAddress);
    await factory.createPool(gerdaAddress, krendelAddress, "GERDA-KRENDEL", await Tom.getAddress());
    await factory.createPool(krendelAddress, rtkAddress, "KRENDEL-RTK", await Ben.getAddress());

    const data = {
        gerdaAddress,
        krendelAddress,
        rtkAddress,
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