// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IFactory {
    function createPool(address firstToken, address secondToken, string name, address owner) public returns (address);
    function createPoolWithLiquidity(address firstToken, address secondToken, string name, address owner, uint256 amountFirst, uint256 amountSecond) external;
    function getPools() external view returns (address[]);
}