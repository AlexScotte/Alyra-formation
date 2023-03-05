// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Bank {
    mapping(address => uint256) _balances;

    function deposit(uint256 _amout) public {
        _balances[msg.sender] += _amout;
    }

    function transfer(address _recipient, uint256 _amount) public {
        require(_amount > 0, "You need to enter a value of money to send");
        require(
            _recipient != address(0),
            "You cannot transfer to the address zero"
        );
        require(
            _recipient != msg.sender,
            "You cannot send money to your own address"
        );
        require(
            _balances[msg.sender] >= _amount,
            "You do not have enough money"
        );

        _balances[msg.sender] -= _amount;
        _balances[_recipient] += _amount;
    }

    function balanceOf(address _address) public view returns (uint256) {
        return _balances[_address];
    }
}
