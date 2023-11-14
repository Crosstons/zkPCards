// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract zkPCard is ERC721, ERC721Burnable, Pausable, Ownable {
    uint256 private _tokenId;

    struct CardInfo {
        uint256 amountIssued;
        uint256 amountSpent;
        uint256 expirationTime;
    }

    mapping (uint256 => CardInfo) cards;

    constructor(string memory name, string memory symbol, address initialOwner) 
    ERC721(name, symbol) Ownable(initialOwner) {}

    function issueCard(
        address to, 
        uint256 amountIssued,  
        uint256 expirationTime
    ) external payable onlyOwner whenNotPaused 
    {
        require(msg.value == amountIssued, "Send enough funds!");
        uint256 tokenId = safeMint(to);
        CardInfo memory newCard = CardInfo({
        amountIssued: amountIssued,
        amountSpent: 0,
        expirationTime: expirationTime
        });
        cards[tokenId] = newCard;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to) internal returns(uint256) {
        uint256 tokenId = _tokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }
}
