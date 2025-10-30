// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Pool.sol";

contract Factory {
    address[] private pools;

    function createPool(address firstToken, address secondToken, string memory name, address owner) public {
        Pool pool = new Pool(firstToken, secondToken, name, owner);
        pools.push(address(pool));
    }

    function getPools() external view returns (address[] memory) {
        return pools;
    }
}