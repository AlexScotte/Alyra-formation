// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Random {
    uint256 private _nonce = 0;
    uint256 _lastRand;

    function random() public returns (uint256) {
        _nonce++;
        _lastRand =
            uint256(
                keccak256(abi.encodePacked(block.timestamp, msg.sender, _nonce))
            ) %
            100;
        return _lastRand;
    }

    function getLastRandomForTest() public view returns (uint256) {
        return _lastRand;
    }
}
