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

    function stack(uint256 amount) external returns (uint256) {
        require(amount > 0, "Invalid amount");

        IERC20(lpAddress).transferFrom(msg.sender, address(this), amount);

        if (balances[msg.sender] == 0) {
            lastRewardTime[msg.sender] = block.timestamp;
        }

        balances[msg.sender] += amount;
        allLP += amount;

        return block.timestamp;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough staked");

        IERC20(lpAddress).transfer(msg.sender, amount);
        balances[msg.sender] -= amount;
     
        allLP -= amount;
    }

    // TODO: разобраться со Stacking, проблемы со временем (возможно)

    function claimReward() external {
        uint256 rw = _calculateReward();
        require(rw > 0, "Invalid reward");

        ERC20(lpAddress).mint(msg.sender, rw);
        lastRewardTime[msg.sender] = block.timestamp;
        
        emit RewardTaken(msg.sender, rw);
    }

    function calculateReward() external view returns (uint256) {
        return _calculateReward();
    }

    function _calculateReward() private view returns (uint256) {
        uint256 countLP = balances[msg.sender];
        if (countLP == 0) return 0;

        uint256 _lastRewardTime = lastRewardTime[msg.sender];
        if (_lastRewardTime == 0) return 0;

        uint256 timeStacked = block.timestamp - _lastRewardTime;
        if (timeStacked == 0) return 0;

        uint256 SCALE = 1e18;

        uint256 baseReward = countLP * timeStacked * REWARD_PER_SECOND;

        uint256 fraction = (countLP * SCALE) / (allLP == 0 ? 1 : allLP);
        uint256 t2 = (baseReward * (fraction + SCALE)) / SCALE;

        uint256 bonus = (timeStacked * 5 * SCALE) / (1 days * 100); 

        uint256 rw = (t2 * (bonus + SCALE)) / SCALE;

        return rw;
    }
}