import { ethers } from "hardhat";
import fs from "node:fs";
import path from "node:path";

async function deploy() {
    const [Owner, Tom, Ben, Rick] = await ethers.getSigners();

    const contract = await ethers.getContractFactory("ERC20");
    const contractFactory = await ethers.getContractFactory("Factory");
    const contractStacking = await ethers.getContractFactory("Stacking");

    const gerda = await contract.deploy(0, "GerdaCoin", 12, "GERDA", ethers.parseUnits("1", 12));
    const gerdaAddress = await gerda.getAddress();
    const krendel = await contract.deploy(0, "KrendelCoin", 12, "KRENDEL", ethers.parseUnits("1.5", 12));
    const krendelAddress = await krendel.getAddress();
    const rtk = await contract.deploy(0, "RTKCoin", 12, "RTK", ethers.parseUnits("3", 12));
    const rtkAddress = await rtk.getAddress();
    const profi = await contract.deploy(0, "Professional", 12, "PROFI", ethers.parseUnits("6", 12));
    const profiAddress = await profi.getAddress();

    await gerda.mint(await Owner.getAddress(), ethers.parseUnits("100000", 12));
    await krendel.mint(await Owner.getAddress(), ethers.parseUnits("150000", 12));
    await rtk.mint(await Owner.getAddress(), ethers.parseUnits("300000", 12));
    
    await gerda.mint(await Tom.getAddress(), ethers.parseUnits("11500", 12));
    await krendel.mint(await Tom.getAddress(), ethers.parseUnits("11000", 12));
    await rtk.mint(await Tom.getAddress(), ethers.parseUnits("10000", 12));
    
    await gerda.mint(await Ben.getAddress(), ethers.parseUnits("10000", 12));
    await krendel.mint(await Ben.getAddress(), ethers.parseUnits("13000", 12));
    await rtk.mint(await Ben.getAddress(), ethers.parseUnits("13000", 12));

    const factory = await contractFactory.deploy(profiAddress);
        
    await factory.createPoolWithLiquidity(gerdaAddress, krendelAddress, "GERDA-KRENDEL", await Tom.getAddress(), ethers.parseUnits("1500", 12), ethers.parseUnits("1000", 12));
    await factory.createPoolWithLiquidity(krendelAddress, rtkAddress, "KRENDEL-RTK", await Ben.getAddress(), ethers.parseUnits("2000", 12), ethers.parseUnits("1000", 12));

    console.log(ethers.formatUnits(await gerda.balanceOf(await Tom.getAddress()), 12));
    console.log(ethers.formatUnits(await krendel.balanceOf(await Tom.getAddress()), 12));
    console.log("\n");
    
    console.log(ethers.formatUnits(await krendel.balanceOf(await Ben.getAddress()), 12));
    console.log(ethers.formatUnits(await rtk.balanceOf(await Ben.getAddress()), 12));
    console.log("\n");

    console.log(ethers.formatUnits(await profi.balanceOf(await Tom.getAddress()), 12));
    console.log(ethers.formatUnits(await profi.balanceOf(await Ben.getAddress()), 12));

    const stacking = await contractStacking.deploy(profiAddress);

    const data = {
        gerdaAddress,
        krendelAddress,
        rtkAddress,
        profiAddress: await profi.getAddress(),
        factoryAddress: await factory.getAddress(),
        stackingAddress: await stacking.getAddress(),
    }

    const frontendDir = path.join(__dirname, "../../frontend/src/conf.json");

    fs.writeFileSync(frontendDir, JSON.stringify(data, null, 2));
}

deploy().catch((error) => {
    console.error(error);
    process.exit(1);
});