// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Dai is ERC20 {
    constructor() ERC20("Dai stable", "DAI") {}

    function faucet(address recipient, uint amount) external {
        _mint(recipient, amount);
    }
}
