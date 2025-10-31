// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IFactory {
    function increaseLpCount(address user, uint256 amount) external;
    function decreaseLpCount(address user, uint256 amount) external; 
    function getLpCount(address user) external view returns (uint256);
    function getAllLp() external view returns (uint256);
}