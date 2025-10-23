// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";
import "./ERC20.sol";

contract Stacking {
    event RewardTaken(address indexed taker, uint256 amount);

    uint256 public constant REWARD_PER_SECOND = 13;
    
    address private lpAddress;
    uint256 private allLp;

    mapping(address => uint256) private lpCount;
    mapping(address => uint256) private lastRewardTime;

    constructor(address tokenAddress) {
        lpAddress = tokenAddress;
    }

    function getLpCount() external view returns (uint256) {
        return lpCount[msg.sender];
    }

    function getLastRewardTime() external view returns (uint256) {
        return lastRewardTime[msg.sender];
    }

    function stack(uint256 amount) external {
        IERC20(lpAddress).transferFrom(msg.sender, address(this), amount);

        lpCount[msg.sender] += amount;
        lastRewardTime[msg.sender] = block.timestamp;
        allLp += amount;
    }

    function withdraw(uint256 amount) external {
        IERC20(lpAddress).transfer(msg.sender, amount);

        lpCount[msg.sender] -= amount;
        lastRewardTime[msg.sender] = block.timestamp;
        allLp -= amount;
    }

    function claimReward() external {
        uint256 rw = calculateReward();
        lastRewardTime[msg.sender] = block.timestamp;

        ERC20(lpAddress).mint(msg.sender, rw);
        
        emit RewardTaken(msg.sender, rw);
    }

    function calculateReward() public view returns (uint256) {
        uint _countLP = lpCount[msg.sender];
        uint _lastRewardTime = lastRewardTime[msg.sender];
        uint timeStacked = block.timestamp - _lastRewardTime;

        if (timeStacked == 0) return 0; 

        uint t1 = _countLP * timeStacked * REWARD_PER_SECOND;
        require(t1 != 0, "Bad calculation in calculateReward with t1");

        uint t2 = t1 * (_countLP / allLp + 1);
        require(t2 != 0, "Bad calculation in calculateReward with t2");
    
        uint rw = t2 * ((timeStacked / 30 days) * 5) / 100 + 1;

        return rw;
    }
}