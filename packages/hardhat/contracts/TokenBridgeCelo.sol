// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenBridgeCelo {
    address public tokenAddress;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    function sendToken(address recipient, uint256 amount) external {
        require(
            msg.sender == address(this),
            "Only bridge can call this function"
        );

        IERC20 token = IERC20(tokenAddress);
        address spender = address(this);

        // Approve the spender to transfer the tokens
        require(token.approve(spender, amount), "Approval failed");

        // Transfer the tokens to the recipient
        require(
            token.transferFrom(spender, recipient, amount),
            "Transfer failed"
        );
    }

    function getBalance() external view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }
}
