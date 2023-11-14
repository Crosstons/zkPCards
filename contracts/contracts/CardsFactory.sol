// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "./zkPCard.sol";

contract Factory {
    error AddressesDiffer();

    event CardCreated(address indexed cardAddress);

    function newCardWithoutSalt() external returns (address) {
        zkPCard newCard = new zkPCard(msg.sender);
        emit CardCreated(address(newCard));
        return address(newCard);
    }

    function newCardWithSalt(bytes32 salt) external returns (address) {
        address initialOwner = msg.sender;
        address computedAddress = computeAddress(salt, initialOwner);
        zkPCard newCard = new zkPCard{salt: salt}(initialOwner);
        if (address(newCard) != computedAddress) {
            revert AddressesDiffer();
        }
        emit CardCreated(address(newCard));
        return address(newCard);
    }

    function computeAddress(bytes32 salt, address initialOwner) public view returns (address) {
        bytes memory bytecode = abi.encodePacked(type(zkPCard).creationCode, abi.encode(initialOwner));
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
}
