// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {CreditCard} from "./CreditCard.sol";

contract CCFactory {

    event CreditCardCreated(address indexed creditCardAddress, address indexed owner);
    
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
        emit CreditCardCreated(address(newCreditCard), msg.sender);

        return address(newCreditCard);
    }

    function getCreditCardsIssued(address owner) external view returns (address[] memory) {
        return _creditCardsIssued[owner];
    }
}
