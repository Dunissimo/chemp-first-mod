// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Pool.sol";

contract Factory {
    address[] private pools;

    function createPool(address firstToken, address secondToken, string memory name) public {
        Pool pool = new Pool(firstToken, secondToken, name);
        pools.push(address(pool));
    }

    function getPools() external view returns (address[] memory) {
        return pools;
    }
}