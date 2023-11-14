// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract zkPCard is ERC721, ERC721Burnable, Pausable, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner) ERC721("zkPCard", "ZKPC") Ownable(initialOwner) {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to) internal {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
