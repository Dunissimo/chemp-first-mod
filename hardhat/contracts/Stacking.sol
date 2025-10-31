// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";
import "./interfaces/IFactory.sol";
import "./ERC20.sol";

contract Stacking {
    event RewardTaken(address indexed taker, uint256 amount);

    uint256 public constant REWARD_PER_SECOND = 13;
    address private lpAddress;
    address private factoryAddress;

    mapping(address => uint256) private lastRewardTime;

    constructor(address _lpAddress, address _factoryAddress) {
        lpAddress = _lpAddress;
        factoryAddress = _factoryAddress;
    }

    function getLastRewardTime() external view returns (uint256) {
        return lastRewardTime[msg.sender];
    }

    function stack(uint256 amount) external {
        IERC20(lpAddress).transferFrom(msg.sender, address(this), amount);

        IFactory(factoryAddress).increaseLpCount(msg.sender, amount);
        lastRewardTime[msg.sender] = block.timestamp;
    }

    function withdraw(uint256 amount) external {
        IERC20(lpAddress).transfer(msg.sender, amount);

        IFactory(factoryAddress).decreaseLpCount(msg.sender, amount);
        lastRewardTime[msg.sender] = block.timestamp;
    }

    function claimReward() external {
        uint256 rw = calculateReward();
        lastRewardTime[msg.sender] = block.timestamp;

        ERC20(lpAddress).mint(msg.sender, rw);
        
        emit RewardTaken(msg.sender, rw);
    }

    function calculateReward() public view returns (uint256) {
        uint256 _countLP = IFactory(factoryAddress).getLpCount(msg.sender);
        uint256 allLp = IFactory(factoryAddress).getAllLp();
        uint256 _lastRewardTime = lastRewardTime[msg.sender];
        uint256 timeStacked = block.timestamp - _lastRewardTime;

        if (timeStacked == 0) return 0; 

        uint256 t1 = _countLP * timeStacked * REWARD_PER_SECOND;
        require(t1 != 0, "Bad calculation in calculateReward with t1");

        uint256 t2 = t1 * (_countLP / allLp + 1);
        require(t2 != 0, "Bad calculation in calculateReward with t2");
    
        uint256 rw = t2 * ((timeStacked / 30 days) * 5) / 100 + 1;

        return rw;
    }
}