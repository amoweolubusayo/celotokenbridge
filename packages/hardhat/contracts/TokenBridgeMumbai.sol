// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./TokenBridgeCelo.sol"; // import the TokenBridge contract

contract TokenBridgeMumbai {
    TokenBridge public bridge; // create an instance of the TokenBridge contract

    event Deposit(address indexed from, uint256 amount); // event emitted when a deposit is made

    constructor(address _bridgeAddress, address _tokenAddress) {
        bridge = new TokenBridge(_tokenAddress, _bridgeAddress); // deploy a new TokenBridge contract
    }

    function deposit(uint256 _amount) external {
        bridge.deposit(_amount); // call the deposit function in the TokenBridge contract
        emit Deposit(msg.sender, _amount); // emit Deposit event
    }
}
