// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CreditCardzkEVM is Ownable, ERC721, ERC721Enumerable {
    IPyth pyth;
    bytes32 daiPriceFeedId;
    bytes32 wethPriceFeedId;

    uint256 private _tokenId;
    uint256 private constant LIQUIDATION_THRESHOLD = 50;
    uint256 private constant LIQUIDATION_PRECISION = 100;
    uint256 private constant MIN_HEALTH_FACTOR = 1e18;
    uint256 private constant PRECISION = 1e18;
    uint256 private constant ADDITIONAL_FEED_PRECISION = 1e10;
    uint256 private constant FEED_PRECISION = 1e8;
    uint256 public expirationTime;
    uint256 public poolBalance;
    uint256 public lockedFunds;
    uint256 public interestRate;

    address private WETH_ADDRESS;
    address private DAI_ADDRESS;

    struct CardInfo {
        string cardName;
        uint256 amountIssued;
        uint256 amountSpent;
        uint256 collateralAmount;
        uint256 expirationTime;
        bool hasBeenDiscarded;
    }

    mapping(uint256 => CardInfo) private cards;

    modifier moreThanZero(uint256 amount) {
        require(amount > 0, "Amount must be greater than zero");
        _;
    }

        constructor(
        string memory _name, 
        string memory _symbol, 
        address _owner, 
        address _daiaddress,
        address _wethaddress,
        uint256 _expirationDays,
        uint256 _interestRate,
        address _pyth,
        bytes32 _daiPriceFeedId,
        bytes32 _wethPriceFeedId
    ) 
        Ownable(_owner) ERC721(_name, _symbol)
    {
        DAI_ADDRESS = _daiaddress;
        WETH_ADDRESS = _wethaddress;
        expirationTime = _expirationDays * 1 days;
        interestRate = _interestRate;
        pyth = IPyth(_pyth);
        daiPriceFeedId = _daiPriceFeedId;
        wethPriceFeedId = _wethPriceFeedId;
    }

    function addFunds(uint256 fundsAmount) public onlyOwner moreThanZero(fundsAmount) {
        poolBalance += fundsAmount;
        bool success = IERC20(DAI_ADDRESS).transferFrom(msg.sender, address(this), fundsAmount);
        require(success, "Transfer Failed!");
    }

    function issueCard(string memory cardName, uint256 issueAmount, bytes[] calldata pythUpdateData) public moreThanZero(issueAmount) {
        uint256 issueAmountInUsd = _getUsdValue(daiPriceFeedId, issueAmount, pythUpdateData);
        uint256 collateralAmountInWeth = _getTokenAmountFromUsd(wethPriceFeedId, issueAmountInUsd * 2, pythUpdateData);
        bool success = IERC20(WETH_ADDRESS).transferFrom(msg.sender, address(this), collateralAmountInWeth);
        require(success, "Collateral transfer failed");
        uint256 cardId = safeMint(msg.sender);
        cards[cardId] = CardInfo({
            cardName: cardName,
            amountIssued: issueAmount,
            amountSpent: 0,
            collateralAmount: collateralAmountInWeth,
            expirationTime: block.timestamp + expirationTime,
            hasBeenDiscarded: false
        });
        lockedFunds += issueAmount;
    }

    function spendFromCard(uint256 tokenId, uint256 spendAmount, address recipient) 
        public moreThanZero(spendAmount) 
    {
        require(ownerOf(tokenId) == msg.sender, "Not the card owner");
        CardInfo storage card = cards[tokenId];
        require(!card.hasBeenDiscarded, "Card has been discarded");
        require(block.timestamp <= card.expirationTime, "Card expired");
        require(card.amountIssued >= card.amountSpent + spendAmount, "Exceeds card's spending limit");
        require(spendAmount <= poolBalance, "Insufficient funds in pool");

        card.amountSpent += spendAmount;
        poolBalance -= spendAmount;

        bool success = IERC20(DAI_ADDRESS).transfer(recipient, spendAmount);
        require(success, "DAI transfer failed");
    }

    function liquidate(uint256 tokenId, bytes[] calldata pythUpdateData) public onlyOwner {
        require(ownerOf(tokenId) != address(0), "TokenId doesn't exist");
        uint256 healthFactor = calculateHealthFactor(tokenId, pythUpdateData);
        require(healthFactor < MIN_HEALTH_FACTOR, "Health factor not low enough for liquidation");

        CardInfo storage card = cards[tokenId];
        require(!card.hasBeenDiscarded, "Card has already been discarded");

        uint256 daiBalance = card.amountIssued - card.amountSpent;
        require(daiBalance <= poolBalance, "Insufficient DAI in pool for liquidation");

        poolBalance -= daiBalance;
        card.hasBeenDiscarded = true;
        lockedFunds -= card.amountIssued;

        bool collateralTransfer = IERC20(WETH_ADDRESS).transfer(owner(), card.collateralAmount);
        require(collateralTransfer, "Collateral transfer failed");

        bool daiTransfer = IERC20(DAI_ADDRESS).transfer(ownerOf(tokenId), daiBalance);
        require(daiTransfer, "DAI transfer failed");
    }

    function repay(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the card owner");
        CardInfo storage card = cards[tokenId];
        require(!card.hasBeenDiscarded, "Card has been discarded");

        uint256 amountOwed = card.amountSpent + ((card.amountSpent * interestRate) / 100);

        bool daiTransfer = IERC20(DAI_ADDRESS).transferFrom(msg.sender, address(this), amountOwed);
        require(daiTransfer, "DAI transfer for repayment failed");

        poolBalance += amountOwed;
        card.amountSpent = 0; 
        card.hasBeenDiscarded = true;
        lockedFunds -= card.amountIssued;

        bool collateralTransfer = IERC20(WETH_ADDRESS).transfer(msg.sender, card.collateralAmount);
        require(collateralTransfer, "Collateral transfer failed");
    }

    function withdrawFunds(uint256 amount) public onlyOwner moreThanZero(amount) {
        require(amount <= poolBalance - lockedFunds, "Amount exceeds unlocked funds");
        poolBalance -= amount;
        bool success = IERC20(DAI_ADDRESS).transfer(msg.sender, amount);
        require(success, "Withdrawal failed");
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

    function _getUsdValue(bytes32 priceFeedId, uint256 amount, bytes[] calldata pythUpdateData) public returns (uint256) {
        uint updateFee = pyth.getUpdateFee(pythUpdateData);
        pyth.updatePriceFeeds{value: updateFee}(pythUpdateData);
        PythStructs.Price memory currentPrice = pyth.getPrice(priceFeedId);
        uint256 price = convertToUint(currentPrice, 18);
        return (price * amount) / PRECISION;
    }

    function _getTokenAmountFromUsd(bytes32 priceFeedId, uint256 usdAmountInWei, bytes[] calldata pythUpdateData) public returns (uint256) {
        uint updateFee = pyth.getUpdateFee(pythUpdateData);
        pyth.updatePriceFeeds{value: updateFee}(pythUpdateData);
        PythStructs.Price memory currentPrice = pyth.getPrice(priceFeedId);
        uint256 price = convertToUint(currentPrice, 18);
        return (usdAmountInWei * PRECISION) / price;
    }

    function calculateHealthFactor(uint256 tokenId,  bytes[] calldata pythUpdateData) public returns (uint256) {
        (uint256 totalDaiIssuedInUsd, uint256 totalCollateralInUsd) = _getAccountInformation(tokenId, pythUpdateData);
        return _calculateHealthFactor(totalDaiIssuedInUsd, totalCollateralInUsd);
    }

    function _getAccountInformation(uint256 tokenId, bytes[] calldata pythUpdateData) private returns (uint256 totalDaiIssuedInUsd, uint256 totalCollateralInUsd) {
        CardInfo storage card = cards[tokenId];
        
        totalDaiIssuedInUsd = _getUsdValue(daiPriceFeedId, card.amountIssued, pythUpdateData);
        totalCollateralInUsd = _getUsdValue(wethPriceFeedId, card.collateralAmount, pythUpdateData);

        return (totalDaiIssuedInUsd, totalCollateralInUsd);
    }

    function _calculateHealthFactor(uint256 totalDaiIssuedInUsd, uint256 totalCollateralInUsd) private pure returns (uint256) {
        if (totalDaiIssuedInUsd == 0) return type(uint256).max;
        uint256 collateralAdjustedForThreshold = (totalCollateralInUsd * LIQUIDATION_THRESHOLD) / LIQUIDATION_PRECISION;
        return (collateralAdjustedForThreshold * PRECISION) / totalDaiIssuedInUsd;
    }

    function revertIfHealthFactorIsBroken(uint256 tokenId, bytes[] calldata pythUpdateData) private {
        uint256 healthFactor = calculateHealthFactor(tokenId, pythUpdateData);
        require(healthFactor >= MIN_HEALTH_FACTOR, "Health factor below minimum threshold");
    }

    function safeMint(address to) private returns (uint256) {
        uint256 tokenId = _tokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }

    function convertToUint(
        PythStructs.Price memory price,
        uint8 targetDecimals
    ) private pure returns (uint256) {
        if (price.price < 0 || price.expo > 0 || price.expo < -255) {
            revert();
        }
        uint8 priceDecimals = uint8(uint32(-1 * price.expo));
        if (targetDecimals >= priceDecimals) {
            return
                uint(uint64(price.price)) *
                10 ** uint32(targetDecimals - priceDecimals);
        } else {
            return
                uint(uint64(price.price)) /
                10 ** uint32(priceDecimals - targetDecimals);
        }
    }

    // The following functions are overrides required by Solidity.
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
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