// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";

contract ERC20 is IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) allowed;
    uint256 public totalSupply;

    address public owner;
    string public name;
    uint8 public decimals;
    string public symbol;

    constructor(uint256 _initialAmount, string memory _tokenName, uint8 _decimalUnits, string  memory _tokenSymbol) {
        owner = msg.sender;
        totalSupply = _initialAmount;
        name = _tokenName;
        decimals = _decimalUnits;
        symbol = _tokenSymbol;
    }

    function mint(address recipient, uint amount) public {
        _mint(recipient, amount);
    }

    function burn(address spender, uint amount) public {
        _burn(spender, amount);
    }

    function _mint(address recipient, uint amount) private {
        balances[recipient] += amount;
        totalSupply += amount;
    }

    function _burn(address spender, uint amount) private {
        balances[spender] -= amount;
        totalSupply -= amount;
    }

    function transfer(address to, uint256 amount) external returns (bool success) {
        require(to != address(0), "Cannot send to zero address");
        require(balances[msg.sender] >= amount, "Token balance is lower than the amount requested");
        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool success) {
        uint256 _allowance = allowed[from][msg.sender];

        require(to != address(0), "Cannot send to zero address");
        require(balances[from] >= amount, "Token balance is lower than amount");
        require(_allowance >= amount, "Allowance is lower than amount");

        balances[to] += amount;
        balances[from] -= amount;
        allowed[from][msg.sender] -= amount;

        emit Transfer(from, to, amount);

        return true;
    }

    function balanceOf(address _owner) external view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address spender, uint256 amount) external returns (bool success) {
        allowed[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);

        return true;
    }

    function allowance(address _owner, address spender) external view returns (uint256 remaining) {
        return allowed[_owner][spender];
    }
}