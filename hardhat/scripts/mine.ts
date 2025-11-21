import { ethers, network } from "hardhat";


async function main() {
    const blockBefore = await ethers.provider.getBlock("latest");
    console.log("Before:", blockBefore?.number, blockBefore?.timestamp);

    await network.provider.send("evm_increaseTime", [600]); // +10 минут
    await network.provider.send("evm_mine");

    const blockAfter = await ethers.provider.getBlock("latest");
    console.log("After:", blockAfter?.number, blockAfter?.timestamp);
}


main();