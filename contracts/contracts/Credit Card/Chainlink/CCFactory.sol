// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {CreditCard} from "./CreditCard.sol";

contract CCFactory {

    event CreditCardCreated(address indexed creditCardAddress, address indexed owner);
    
    address[] allCards;
    mapping(address => address[]) private _creditCardsIssued;

    function createCreditCard(
        string memory name,
        string memory symbol,
        address daiAddress,
        address wethAddress,
        uint256 expirationTime,
        uint256 interestRate
    ) external returns (address) {
        CreditCard newCreditCard = new CreditCard(
            name,
            symbol,
            msg.sender,
            daiAddress,
            wethAddress,
            expirationTime,
            interestRate
        );
        _creditCardsIssued[msg.sender].push(address(newCreditCard));
        allCards.push(address(newCreditCard));
        emit CreditCardCreated(address(newCreditCard), msg.sender);

        return address(newCreditCard);
    }

    function getCreditCardsIssuedByAddress(address owner) public view returns (address[] memory) {
        return _creditCardsIssued[owner];
    }

    function getAllCreditCards() public view returns (address[] memory) {
        return allCards;
    }
}
