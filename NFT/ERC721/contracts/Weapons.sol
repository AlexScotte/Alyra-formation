// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Weapons is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Weapon {
        uint boostXP;
        uint boostGold;
    }

    Weapon[] weapons;

    constructor() ERC721("Weapons", "WPS") {}

    function MintWeapon(
        address player,
        string calldata tokenURI,
        uint boostXP,
        uint boostGold
    ) external returns (uint) {
        _tokenIds.increment();
        weapons.push(Weapon(boostXP, boostGold));
        uint newTokenID = _tokenIds.current();
        _mint(player, newTokenID);
        _setTokenURI(newTokenID, tokenURI);

        return newTokenID;
    }
}
