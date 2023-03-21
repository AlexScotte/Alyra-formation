// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DeFiProject {
    IERC20 dai;

    constructor(address daiAddress) {
        dai = IERC20(daiAddress);
    }

    function transfert(address recipient, uint amount) external {
        dai.transfer(recipient, amount);
    }
}
