// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {CreditCardzkEVM} from "./CreditCardzkEVM.sol";

contract CCFactoryzkEVM {

    event CreditCardCreated(address indexed creditCardAddress, address indexed owner);
    
    address[] allCards;
    mapping(address => address[]) private _creditCardsIssued;

    function createCreditCard(
        string memory name,
        string memory symbol,
        address daiAddress,
        address wethAddress,
        uint256 expirationDays,
        uint256 interestRate,
        address _pythAddress, 
        bytes32 _daiPriceFeedId, 
        bytes32 _wethPriceFeedId
    ) external returns (address) {
        CreditCardzkEVM newCreditCard = new CreditCardzkEVM(
            name,
            symbol,
            msg.sender,
            daiAddress,
            wethAddress,
            expirationDays,
            interestRate,
            _pythAddress,
            _daiPriceFeedId,
            _wethPriceFeedId
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
