// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";
import "./interfaces/IFactory.sol";
import "./ERC20.sol";

contract Stacking {
    event RewardTaken(address indexed taker, uint256 amount);

    uint256 public constant REWARD_PER_SECOND = 13;
    address private lpAddress;
    uint256 private allLP;

    mapping(address => uint256) public balances;
    mapping(address => uint256) private lastRewardTime;

    constructor(address _lpAddress) {
        allLP = 0;
        lpAddress = _lpAddress;
    }

    function getLastRewardTime() external view returns (uint256) {
        return lastRewardTime[msg.sender];
    }

    function getUserCountLp() external view returns (uint256) {
        return balances[msg.sender];
    }

    function startStacking(address user) external {
        lastRewardTime[user] = block.timestamp;
    }

    function stack(address user, uint256 amount) external returns (uint256) {
        require(amount > 0, "Invalid amount");

        IERC20(lpAddress).transferFrom(user, address(this), amount);
        lastRewardTime[user] = block.timestamp;

        balances[user] += amount;
        allLP += amount;

        return block.timestamp;
    }

    function withdraw(address user, uint256 amount) external {
        require(balances[user] >= amount, "Not enough staked");

        _claimReward(user);
        IERC20(lpAddress).transfer(user, amount);

        balances[user] -= amount;
        allLP -= amount;
    }

    // TODO: разобраться со Stacking, проблемы со временем (возможно)

    function claimReward(address user) external {
        return _claimReward(user);
    }

    function _claimReward(address user) private {
        uint256 rw = _calculateReward(user);
        require(rw > 0, "Invalid reward");

        ERC20(lpAddress).mint(user, rw);
        lastRewardTime[user] = block.timestamp;
        
        emit RewardTaken(user, rw);
    }

    function calculateReward(address user) external view returns (uint256) {
        return _calculateReward(user);
    }

    function _calculateReward(address user) private view returns (uint256) {
        // uint256 countLP = balances[user];
        // uint256 _lastRewardTime = lastRewardTime[user];
        // uint256 timeStacked = block.timestamp - _lastRewardTime;
        // uint256 SCALE = 1e18;
        // uint256 baseReward = countLP * timeStacked * REWARD_PER_SECOND;
        // uint256 fraction = (countLP * SCALE) / (allLP == 0 ? 1 : allLP);
        // uint256 t2 = (baseReward * (fraction + SCALE)) / SCALE;
        // uint256 bonus = (timeStacked * 5 * SCALE) / (1 days * 100); 
        // uint256 rw = (t2 * (bonus + SCALE)) / SCALE;

        uint256 rw = balances[user] + ((block.timestamp - lastRewardTime[user]) * REWARD_PER_SECOND);

        return rw;
    }
}