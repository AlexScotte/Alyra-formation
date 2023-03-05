// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract moneySaving is Ownable {
    uint256 public firstDeposit;
    uint256 public depositCount;

    mapping(uint256 => uint256) deposits;

    function getMoney() external onlyOwner {
        require(address(this).balance >= 1 wei, "Nothing to get");
        require(
            firstDeposit + 12 weeks > block.timestamp,
            "You need to wait 3 weeks to get the money"
        );
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer error");
    }

    function deposit() public payable {
        _setFirstDepositTimeStamp();
        deposits[depositCount] = msg.value;
        depositCount++;
    }

    function _setFirstDepositTimeStamp() private {
        if (firstDeposit == 0) {
            firstDeposit = block.timestamp;
        }
    }

    receive() external payable {
        deposit();
    }
}
