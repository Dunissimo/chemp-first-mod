// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";

contract Pool {
    mapping(address => uint256) public reserves;
    address private lpAddress;

    address public owner;
    string public name;
    address public firstToken;
    address public secondToken;
    uint256 public lpTotalSupply;

    constructor(address _firstToken, address _secondToken, string memory _name, address _owner, address _lpAddress) {
        owner = _owner;
        name = _name;
        firstToken = _firstToken;
        secondToken = _secondToken;
        lpAddress = _lpAddress;
        lpTotalSupply = 0;
    }

    function firstTokenReserves() external view returns (uint256) {
        return reserves[firstToken];
    }
    
    function secondTokenReserves() external view returns (uint256) {
        return reserves[secondToken];
    }

    function swap(address tokenIn, address tokenOut, uint256 amountIn) external {
        require(isTokenInPool(tokenIn), "TokenIn is not valid");
        require(isTokenInPool(tokenOut), "TokenOut is not valid");
        require(amountIn > 0, "Amount must be > 0");

        // uint256 allowance = IERC20(tokenIn).allowance(msg.sender, address(this));
        // require(allowance >= amountIn, "Allowance is less than amount");
        
        uint256 reserveIn  = reserves[tokenIn];
        uint256 reserveOut = reserves[tokenOut];
        uint256 amountOut = amountIn * reserveOut / reserveIn;

        require(amountOut > 0, "Amount out must be > 0");
        require(reserveOut >= amountOut, "Not enough liquidity");

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenOut).transfer(msg.sender, amountOut);

        reserves[tokenIn]  = reserveIn  + amountIn;
        reserves[tokenOut] = reserveOut - amountOut;
    }

    function addLiquid(uint256 amountFirst, uint256 amountSecond) external {
        _addLiquidFrom(amountFirst, amountSecond, msg.sender);
    }

    function addLiquidFrom(uint256 amountFirst, uint256 amountSecond, address user) external {
        _addLiquidFrom(amountFirst, amountSecond, user);
    }

    function _addLiquidFrom(uint256 amountFirst, uint256 amountSecond, address from) internal {
        require(amountFirst > 0, "Amount of first token not valid");
        require(amountSecond > 0, "Amount of second token not valid");

        IERC20(firstToken).transferFrom(from, address(this), amountFirst);
        IERC20(secondToken).transferFrom(from, address(this), amountSecond);

        uint256 priceA = (amountFirst * IERC20(firstToken).getBasePrice());
        uint256 priceB = (amountSecond * IERC20(secondToken).getBasePrice());
        uint256 totalValue = priceA + priceB;

        uint256 lpGained = (totalValue) / IERC20(lpAddress).getBasePrice();
        require(lpGained > 0, "Insufficient lpGained minted");

        IERC20(lpAddress).mint(from, lpGained);
        lpTotalSupply += lpGained;

        reserves[firstToken] += amountFirst;
        reserves[secondToken] += amountSecond;
    }

    function removeLiquid(uint256 lpAmount) external {
        require(lpAmount > 0, "LP amount not valid");
        require(lpTotalSupply > 0, "No liquid");

        uint256 amountFirst = (lpAmount * reserves[firstToken]) / lpTotalSupply;
        uint256 amountSecond = (lpAmount * reserves[secondToken]) / lpTotalSupply;

        require(amountFirst > 0 && amountSecond > 0, "Nothing to withdraw");

        lpTotalSupply -= lpAmount;
        IERC20(lpAddress).burn(msg.sender, lpAmount);

        reserves[firstToken] -= amountFirst;
        reserves[secondToken] -= amountSecond;

        IERC20(firstToken).transfer(msg.sender, amountFirst);
        IERC20(secondToken).transfer(msg.sender, amountSecond);
    }

    function isTokenInPool(address token) external view returns (bool) {
        return token == firstToken || token == secondToken;
    }
}