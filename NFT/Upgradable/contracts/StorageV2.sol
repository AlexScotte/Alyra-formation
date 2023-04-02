// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StorageV2 {
    uint256 number;

    function store2(uint256 num) public {
        number = num;
    }

    function retrieve() public view returns (uint256) {
        return number;
    }

    function increment() public {
        number++;
    }
}
