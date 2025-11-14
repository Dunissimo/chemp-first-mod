// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Pool.sol";

contract Factory {
    address[] private pools;
    address private lpAddress;
    mapping(address => address[]) private userPools;

    constructor(address tokenAddress) {
        lpAddress = tokenAddress;
    }

    function createPool(address firstToken, address secondToken, string memory name, address owner) public returns (address) {
        Pool pool = new Pool(firstToken, secondToken, name, owner, lpAddress);
        pools.push(address(pool));
        userPools[owner].push(address(pool));

        return address(pool);
    }

    function createPoolWithLiquidity(
        address firstToken, 
        address secondToken, 
        string memory name, 
        address owner, 
        uint256 amountFirst, 
        uint256 amountSecond
    ) external {
        address poolAddress = createPool(firstToken, secondToken, name, owner);
        Pool(poolAddress).addLiquidFrom(amountFirst, amountSecond, owner);
    }

    function getPools() external view returns (address[] memory) {
        return pools;
    }
}