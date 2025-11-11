// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function mint(address recipient, uint amount) external;
    function burn(address spender, uint amount) external;
    function totalSupply() external returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool success);
    function transferFrom(address from, address to, uint256 amount) external returns (bool success);
    function balanceOf(address owner) external view returns (uint256 balance);
    function approve(address spender, uint256 amount) external returns (bool success);
    function allowance(address owner, address spender) external view returns (uint256 remaining);
    function getBasePrice() external view returns (uint256 price);
}