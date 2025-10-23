// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Pool.sol";

contract Fabric {
    address[] public pools;

    function createPool(address token1, address token2, string memory name) public {
        Pool pool = new Pool(token1, token2, name);
        pools.push(address(pool));
    }

    function getPools() external view returns (address[] memory) {
        return pools;
    }
}