// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
    uint256 value;
    string greeter;

    event valueChanged(uint256 newValue);

    function read() public view returns (uint256) {
        return value;
    }

    function write(uint256 newValue) public {
        value = newValue;
        emit valueChanged(newValue);
    }

    function greet() external view returns (string memory) {
        return greeter;
    }

    function setGreet(string calldata _greet) external {
        greeter = _greet;
    }
}
