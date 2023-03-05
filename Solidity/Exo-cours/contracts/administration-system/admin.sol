// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract admin is Ownable {
    event Whitelisted(address);
    event Blacklisted(address);

    mapping(address => bool) whitelists;
    mapping(address => bool) blacklists;

    function whitelist(address _addr) public onlyOwner {
        require(!isWhitelisted(_addr), "The address is already whitelisted.");

        blacklists[_addr] = false;
        whitelists[_addr] = true;

        emit Whitelisted(_addr);
    }

    function blacklist(address _addr) public onlyOwner {
        require(_addr != owner(), "You cannot blacklist the owner.");
        require(!isBlacklisted(_addr), "The address is already blacklisted.");

        blacklists[_addr] = true;
        whitelists[_addr] = false;

        emit Blacklisted(_addr);
    }

    function isWhitelisted(address _addr) public view returns (bool) {
        return whitelists[_addr];
    }

    function isBlacklisted(address _addr) public view returns (bool) {
        return blacklists[_addr];
    }
}
