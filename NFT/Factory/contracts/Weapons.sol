// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Weapons is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Weapon {
        uint boostXP;
        uint boostGold;
    }

    Weapon[] weapons;

    constructor() ERC721("Weapon", "WPS") {}
}
