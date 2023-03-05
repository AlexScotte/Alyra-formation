// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

contract Balance {
    address myAdress;

    function setAddresse(address _addr) public {
        myAdress = _addr;
    }

    function getBalance() public view returns (uint256) {
        return myAdress.balance;
    }

    function getABalance(address _addr) public view returns (uint256) {
        return _addr.balance;
    }

    function transferBalance(address _addr) public payable returns (bool) {
        (bool success, ) = _addr.call{value: msg.value}("");
        return success;
    }

    function transferBalanceCheck(uint256 amount)
        public
        payable
        returns (bool)
    {
        // Send and transfert cost 24 000 gas
        // pure transaction cost already 21000 gas
        // it remains not enough gas to add data in the transaction

        // Call will use all the necessary gas to do the transaction
        // need to put a gas limit
        // it's more flexible than send an transfer
        // no revert, returns a bool and data

        require(msg.value > 1, "You need to send more money.");
        require(myAdress.balance > amount, "Not enough money to send.");
        (bool success, ) = myAdress.call{value: msg.value}("");
        return success;
    }

    receive() external payable {
        // Execute only when the contract receive ether
        // If ether + data are sent, it's the fallback method that is executed
    }

    fallback() external payable {
        // Executed when ether + data are sent or if there is no receive method
    }
}
