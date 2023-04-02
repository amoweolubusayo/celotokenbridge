// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenBridgeMumbai {
    address public owner;
    mapping(address => uint256) public balances;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only signer can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    event Deposit(address indexed depositor, uint256 amount);

    function sendMatic(
        uint256 amount,
        address payable recipient
    ) external onlyOwner {
        require(address(this).balance >= amount, "Not enough balance");
        bool success = recipient.send(amount);
        require(success, "Failed to send Matic!");
    }

    function depositMatic() external payable {
        require(msg.value > 0, "Amount must be greater than zero");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    receive() external payable {}
}
