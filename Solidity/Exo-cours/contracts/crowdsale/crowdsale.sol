// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./token.sol";

contract Crowdsale {
    uint256 public rate = 200;
    Token public token;

    constructor(uint256 initialSupply) {
        token = new Token(initialSupply);
    }

    receive() external payable {
        require(msg.value > 0.1 ether, "You can't send less than 0.1 ether");
        distribute(msg.value);
    }

    function distribute(uint256 amount) internal {
        uint256 tokensToSent = amount * rate;
        token.transfer(msg.sender, tokensToSent);
    }
}
