// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StorageV1 {
    uint256 number;

    function store(uint256 num) public {
        number = num;
    }

    function retrieve() public view returns (uint256) {
        return number;
    }
}
