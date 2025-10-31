// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Pool.sol";

contract Factory {
    address[] private pools;
    address private lpAddress;
    uint256 private allLp = 0;
    mapping(address => uint256) private lpCount;

    constructor(address tokenAddress) {
        lpAddress = tokenAddress;
    }

    function increaseLpCount(address user, uint256 amount) external {
        lpCount[user] += amount; 
    }

    function decreaseLpCount(address user, uint256 amount) external {
        lpCount[user] -= amount; 
    }

    function getLpCount(address user) external view returns (uint256) {
        return lpCount[user];
    }

    function getAllLp() external view returns (uint256) {
        return allLp;
    }

    function createPool(address firstToken, address secondToken, string memory name, address owner) public {
        Pool pool = new Pool(firstToken, secondToken, name, owner);
        pools.push(address(pool));
    }

    function getPools() external view returns (address[] memory) {
        return pools;
    }
}