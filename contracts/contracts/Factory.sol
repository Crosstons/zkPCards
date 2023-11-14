// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "./zkPCard.sol";

contract Factory {
    error AddressesDiffer();

    mapping (address => address[]) cardsIssued;

    event CardCreated(address indexed cardAddress);

    function newCardWithoutSalt(
        string memory name, 
        string memory symbol, 
        address tokenAddress
    ) external returns (address) 
    {
        zkPCard newCard = new zkPCard(name, symbol, msg.sender, tokenAddress);
        cardsIssued[msg.sender].push(address(newCard));
        emit CardCreated(address(newCard));
        return address(newCard);
    }

    function newCardWithSalt(
        bytes32 salt, 
        string memory name, 
        string memory symbol,
        address tokenAddress
    ) external returns (address) 
    {
        address initialOwner = msg.sender;
        address computedAddress = computeAddress(salt, name, symbol, initialOwner, tokenAddress);
        zkPCard newCard = new zkPCard{salt: salt}(name, symbol, initialOwner, tokenAddress);
        if (address(newCard) != computedAddress) {
            revert AddressesDiffer();
        }
        cardsIssued[initialOwner].push(address(newCard));
        emit CardCreated(address(newCard));
        return address(newCard);
    }

    function computeAddress(
        bytes32 salt, 
        string memory name, 
        string memory symbol, 
        address initialOwner, 
        address tokenAddress
    ) public view returns (address) 
    {
        bytes memory bytecode = abi.encodePacked(type(zkPCard).creationCode, abi.encode(name, symbol, initialOwner, tokenAddress));
        return address(
            uint160(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            bytes1(0xff),
                            address(this),
                            salt,
                            keccak256(bytecode)
                        )
                    )
                )
            )
        );
    }

    function getCardsIssued(address issuer) public view returns(address[] memory) {
        return cardsIssued[issuer];
    }
}
