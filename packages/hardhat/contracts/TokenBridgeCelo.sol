// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenBridgeCelo {
    address public tokenAddress; // address of the ERC20 token
    address public bridgeAddress; // address of the bridge contract on the other network

    event Deposit(address indexed from, uint256 amount); // event emitted when a deposit is made

    constructor(address _tokenAddress, address _bridgeAddress) {
        tokenAddress = _tokenAddress;
        bridgeAddress = _bridgeAddress;
    }

    function deposit(uint256 _amount) external {
        // transfer tokens to this contract and emit Deposit event
        require(IERC20(tokenAddress).transferFrom(msg.sender, address(this), _amount), "transferFrom failed");
        emit Deposit(msg.sender, _amount);
    }

    function sendToken(address _recipient, uint256 _amount) external {
        require(msg.sender == bridgeAddress, "sender not authorized"); // ensure that only the bridge contract on the other network can call this function
        require(IERC20(tokenAddress).transfer(_recipient, _amount), "transfer failed"); // transfer tokens to the specified recipient
    }

    function getBalance() external view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this)); // return the current balance of the contract
    }
}
