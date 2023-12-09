// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DebitCard is ERC721, ERC721Enumerable, ERC721Pausable, Ownable {

    error TransferFailed();
    error CardExpired();
    error NotAuthorized();
    error ZeroAmountIssued();
    error InsufficientPoolBalance();
    error InsufficientCredit();
    error SendEnoughFunds();
    error CardHasBeenDiscarded();

    uint256 private _tokenId;
    uint256 public poolSize;
    string public poolName;

    struct CardInfo {
        string cardName;
        uint256 amountIssued;
        uint256 amountSpent;
        uint256 expirationTime;
        bool hasBeenDiscarded;
    }
    mapping (uint256 => CardInfo) cards;

    event CardIssued(uint256 tokenId, string cardName, address issuedTo, uint256 amountIssued, uint256 expirationTime);
    event FundsSpentFromCard(uint256 tokenId, address recipient, uint256 spendAmount);
    event FundsAddedToPool(uint256 amount, address addedBy);
    event CardUpdated(uint256 tokenId, uint256 additionalAmount, uint256 newExpirationTime);
    event CardDiscarded(uint256 tokenId);
    event ContractPaused();
    event ContractUnpaused();

    constructor(string memory name, string memory symbol, address initialOwner) 
    ERC721(name, symbol) Ownable(initialOwner) 
    {
        poolName = name;
    }

    function issueCard(
        string memory name,
        address to, 
        uint256 amountIssued,  
        uint256 expirationDays
    ) external onlyOwner 
    {
        uint256 expirationTimestamp = block.timestamp + expirationDays * 1 days;
        uint256 tokenId = safeMint(to);
        CardInfo memory newCard = CardInfo({
        cardName: name,
        amountIssued: amountIssued,
        amountSpent: 0,
        expirationTime: expirationTimestamp,
        hasBeenDiscarded: false
        });
        cards[tokenId] = newCard;
        emit CardIssued(tokenId, name, to, amountIssued, expirationTimestamp);
    }

    function spendFromCard(uint256 tokenId, address recipient, uint256 spendAmount) external whenNotPaused {
        CardInfo storage card = cards[tokenId];
        if (ownerOf(tokenId) != msg.sender) {
            revert NotAuthorized();
        }
        if (block.timestamp > card.expirationTime) {
            revert CardExpired();
        }
        if (card.hasBeenDiscarded == true) {
            revert CardHasBeenDiscarded();
        }
        if (card.amountIssued == 0) {
            revert ZeroAmountIssued();
        }
        if (card.amountIssued - card.amountSpent < spendAmount) {
            revert InsufficientCredit();
        }
        if (address(this).balance < spendAmount) {
            revert InsufficientPoolBalance();
        }
        card.amountSpent += spendAmount;
        (bool success , ) = payable(recipient).call{ value : spendAmount}("");
        if(!success) {
            revert TransferFailed();
        }
        emit FundsSpentFromCard(tokenId, recipient, spendAmount);
    }

    function addFundsToPool(uint256 amount) external payable onlyOwner {
        if (amount != msg.value) {
           revert SendEnoughFunds(); 
        }
        poolSize += amount;
        emit FundsAddedToPool(amount, msg.sender);
    }

    function updateCard(
        uint256 tokenId, 
        uint256 additionalAmount,
        uint256 newExpirationDays
    ) external onlyOwner {
        uint256 newExpirationTimestamp = block.timestamp + newExpirationDays * 1 days;
        CardInfo storage card = cards[tokenId];
        card.amountIssued += additionalAmount;
        card.expirationTime = newExpirationTimestamp;
        emit CardUpdated(tokenId, additionalAmount, newExpirationTimestamp);
    }

    function withdrawFunds(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Not enough funds in the contract!");
        payable(owner()).transfer(amount);
    }

    function discardCard(uint256 tokenId) external onlyOwner {
        CardInfo storage card = cards[tokenId];
        card.hasBeenDiscarded = true;
        emit CardDiscarded(tokenId);
    }

    function getCardInfo(uint256 tokenId) public view returns(CardInfo memory) {
        return cards[tokenId];
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply();
    }

    function getDaysUntilExpiration(uint256 tokenId) public view returns (uint256) {
        CardInfo storage card = cards[tokenId];
        if (block.timestamp >= card.expirationTime) {
            return 0;
        }
        uint256 timeLeftInSeconds = card.expirationTime - block.timestamp;
        uint256 daysRemaining = timeLeftInSeconds / 1 days; 
        return daysRemaining;
    }

    function pause() public onlyOwner {
        _pause();
        emit ContractPaused();
    }

    function unpause() public onlyOwner {
        _unpause();
        emit ContractUnpaused();
    }

    function safeMint(address to) internal returns(uint256) {
        uint256 tokenId = _tokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }

    // The following functions are overrides required by Solidity.
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}