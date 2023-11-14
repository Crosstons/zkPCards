// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract zkPCard is ERC721, ERC721Burnable, Pausable, Ownable {

    error TransferFailed();
    error CardExpired();
    error NotAuthorized();
    error InsufficientBalance();

    uint256 private _tokenId;
    IERC20 public token;
    struct CardInfo {
        uint256 amountIssued;
        uint256 amountSpent;
        uint256 expirationTime;
    }
    mapping (uint256 => CardInfo) cards;

    constructor(string memory name, string memory symbol, address initialOwner, address tokenAddress) 
    ERC721(name, symbol) Ownable(initialOwner) 
    {
        token = IERC20(tokenAddress);
    }

    function issueCard(
        address to, 
        uint256 amountIssued,  
        uint256 expirationTime
    ) external onlyOwner 
    {
        bool success = token.transferFrom(msg.sender, address(this), amountIssued);
        if (!success) {
            revert TransferFailed();
        }
        uint256 tokenId = safeMint(to);
        CardInfo memory newCard = CardInfo({
        amountIssued: amountIssued,
        amountSpent: 0,
        expirationTime: expirationTime
        });
        cards[tokenId] = newCard;
    }

    function spendFromCard(uint256 tokenId, address recipient, uint256 spendAmount) external whenNotPaused {
        if (ownerOf(tokenId) != msg.sender) {
            revert NotAuthorized();
        }
        if (block.timestamp > cards[tokenId].expirationTime) {
            revert CardExpired();
        }
        CardInfo storage card = cards[tokenId];
        if (card.amountIssued == 0) {
            revert InsufficientBalance();
        }
        if (card.amountIssued - card.amountSpent < spendAmount) {
            revert InsufficientBalance();
        }
        card.amountSpent += spendAmount;
        bool success = token.transfer(recipient, spendAmount);
        if (!success) {
            revert TransferFailed();
        }
    }

    function addFundsToCard(uint256 tokenId, uint256 additionalAmount) external onlyOwner {
        bool success = token.transferFrom(msg.sender, address(this), additionalAmount);
        if (!success) {
            revert TransferFailed();
        }
        CardInfo storage card = cards[tokenId];
        card.amountIssued += additionalAmount;
    }

    function removeFundsFromCard(uint256 tokenId) external onlyOwner {
        CardInfo storage card = cards[tokenId];
        uint256 refundAmount = card.amountIssued - card.amountSpent;
        card.amountIssued = 0;
        card.amountSpent = 0;
        if (refundAmount > 0) {
            bool success = token.transfer(owner(), refundAmount);
            if (!success) {
                revert TransferFailed();
            }
        }
    }

    function getCardInfo(uint256 tokenId) public view returns(CardInfo memory) {
        return cards[tokenId];
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
