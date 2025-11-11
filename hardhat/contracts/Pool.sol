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

        uint256 allowance = IERC20(tokenIn).allowance(msg.sender, address(this));
        require(allowance >= amountIn, "Allowance is less than amount");
        
        uint256 inPrice = IERC20(tokenIn).getBasePrice();
        uint256 outPrice = IERC20(tokenOut).getBasePrice();

        uint256 k1 = reserves[tokenIn] * inPrice;
        uint256 k2 = reserves[tokenOut] * outPrice;

        uint256 amountOut = (amountIn * inPrice * k2) / (outPrice * k1);
        require(amountOut > 0, "AmountOut must be > 0");

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenOut).transfer(msg.sender, amountOut);

        reserves[tokenIn] += amountIn;
        reserves[tokenOut] -= amountOut;
    }

    function addLiquid(uint256 amountFirst, uint256 amountSecond) external {        
        require(amountFirst > 0, "Amount of first token not valid");
        require(amountSecond > 0, "Amount of second token is not valid");
    
        IERC20(firstToken).transferFrom(msg.sender, address(this), amountFirst);
        IERC20(secondToken).transferFrom(msg.sender, address(this), amountSecond);


        uint256 priceA = amountFirst * IERC20(firstToken).getBasePrice();
        uint256 priceB = amountSecond * IERC20(secondToken).getBasePrice();
        uint256 totalValue = priceA * priceB;

        uint256 lpGained = totalValue / IERC20(lpAddress).getBasePrice();

        require(lpGained > 0, "Insufficient lpGained minted");

        IERC20(lpAddress).mint(msg.sender, lpGained);

        reserves[firstToken] += amountFirst;
        reserves[secondToken] += amountSecond;

        // if (reserves[firstToken] == 0 || reserves[secondToken] == 0) {
        //     lpGained = sqrt(amountFirst * amountSecond);
        // } else {
        //     uint256 liquidFirst = (amountFirst * lpTotalSupply) / reserves[firstToken]; 
        //     uint256 liquidSecond = (amountSecond * lpTotalSupply) / reserves[secondToken]; 
            
        //     lpGained = min(liquidFirst, liquidSecond);
        // }

        // require(lpGained > 0, "Insufficient lpGained minted");

        // lpTotalSupply += lpGained;
        // IERC20(lpAddress).mint(msg.sender, lpGained);

        // reserves[firstToken] += amountFirst;
        // reserves[secondToken] += amountSecond;
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

    function isTokenInPool(address token) private view returns (bool) {
        return token == firstToken || token == secondToken;
    }

    function sqrt(uint256 x) internal pure returns (uint256) {
        if (x == 0) return 0;

        uint256 z = (x + 1) / 2;
        uint256 y = x;

        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }

        return y;
    }

    function min(uint x, uint y) internal pure returns (uint) {
        return x < y ? x : y;
    }
}