// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPool {
    function firstTokenReserves() external view returns (uint256); 
    function secondTokenReserves() external view returns (uint256);
    function swap(address tokenIn, address tokenOut, uint256 amountIn) external;
    function addLiquid(uint256 amountFirst, uint256 amountSecond) external;
    function addLiquidFrom(uint256 amountFirst, uint256 amountSecond, address user) external;
    function removeLiquid(uint256 lpAmount) external;
    function isTokenInPool(address token) external view returns (bool); 
}