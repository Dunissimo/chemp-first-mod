// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";

contract Pool {
    mapping(address => uint256) public reserves;
    mapping(address => mapping(address => uint256)) public userLiquid;

    address public owner;
    string public name;
    address public firstToken;
    address public secondToken;

    constructor(address _firstToken, address _secondToken, string memory _name) {
        owner = msg.sender;
        name = _name;
        firstToken = _firstToken;
        secondToken = _secondToken;
    }

    function firstTokenReserves() external view returns (uint256) {
        return reserves[firstToken];
    }
    
    function secondTokenReserves() external view returns (uint256) {
        return reserves[secondToken];
    }

    function swap(address tokenIn, address tokenOut, uint256 amount) external {
        require(isTokenInPool(tokenIn), "TokenIn is not valid");
        require(isTokenInPool(tokenOut), "TokenOut is not valid");
        // require(amount > 0, "Amount is not valid");

        uint256 amountOut = amount * (reserves[tokenIn] / reserves[tokenOut]);
        // require(amountOut > 0, "AmountOut is not valid");

        uint256 allowance = IERC20(tokenIn).allowance(msg.sender, address(this));
        
        require(allowance < amount, "Allowance is less than amount");

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amount);
        IERC20(tokenOut).transfer(msg.sender, amountOut);

        reserves[tokenIn] += amount;
        reserves[tokenOut] -= amount;
    }

    function addLiquid(address token, uint256 amount) external {
        require(isTokenInPool(token), "Token is not valid");
    
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        userLiquid[msg.sender][token] += amount;
        reserves[token] += amount;
    }

    function removeLiquid(address token, uint256 amount) external {
        require(isTokenInPool(token), "Token is not valid");
        
        IERC20(token).transfer(msg.sender, amount);

        userLiquid[msg.sender][token] -= amount;
        reserves[token] -= amount;
    }

    function isTokenInPool(address token) private view returns (bool) {
        return token == firstToken || token == secondToken;
    }
}