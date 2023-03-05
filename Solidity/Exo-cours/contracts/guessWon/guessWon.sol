// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract guessWon is Ownable {
    string public tips;
    string private word;
    address public winner;
    mapping(address => bool) players;

    function setWordTips(string calldata _word, string calldata _tips)
        external
        onlyOwner
    {
        require(
            bytes(_word).length > 0 && bytes(_tips).length > 0,
            "You need to set a word and a tip to start the game."
        );

        tips = _tips;
        word = _word;
    }

    function tryToGuess(string calldata _proposal) external returns (bool) {
        require(
            bytes(word).length > 0 && bytes(tips).length > 0,
            "The game is not started yet."
        );
        require(address(winner) == address(0), "There is already a winner.");
        require(!players[msg.sender], "You already played.");

        players[msg.sender] = true;
        bool isMatch = keccak256(abi.encodePacked(_proposal)) ==
            keccak256(abi.encodePacked(word));
        if (isMatch) {
            winner = msg.sender;
        }
        return isMatch;
    }
}
