// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IFactory.sol";
import "./interfaces/IPool.sol";

contract Router {
    address public factory;

    constructor(address _factory) {
        factory = _factory;
    }

    function checkToken(address token) external view returns (bool) {
        address[] pools = IFactory(factory).getPools();
        uint256 length = pools.length;

        for (uint256 i = 0; i < length; i++) {
            if (IPool(pools[i]).isTokenInPool(token)) {
                return true;
            }
        }

        return false;
    }
}