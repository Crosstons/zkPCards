// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {OracleLib, AggregatorV3Interface} from "./Oracle/OracleLib.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CreditCard is ReentrancyGuard, Ownable, ERC721 {
    using OracleLib for AggregatorV3Interface;

    uint256 private _tokenId;
    uint256 private constant LIQUIDATION_THRESHOLD = 50; 
    uint256 private constant LIQUIDATION_BONUS = 10;
    uint256 private constant LIQUIDATION_PRECISION = 100;
    uint256 private constant MIN_HEALTH_FACTOR = 1e18;
    uint256 private constant PRECISION = 1e18;
    uint256 private constant ADDITIONAL_FEED_PRECISION = 1e10;
    uint256 private constant FEED_PRECISION = 1e8;
    uint256 public expirationTime;
    uint256 public poolBalance;

    address private constant WETH_ADDRESS = 0xdd13E55209Fd76AfE204dBda4007C227904f0a81;
    address private constant ETH_PRICE_FEED_ADDRESS = 0x694AA1769357215DE4FAC081bf1f309aDC325306;
    address private constant DAI_ADDRESS = 0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6;
    address private constant DAI_PRICE_FEED_ADDRESS = 0x14866185B1962B63C3Ea9E03Bc1da838bab34C19;

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
        require(amount > 0);
        _;
    }

    constructor(string memory _name, string memory _symbol, address _owner, uint256 _expirationTime) 
    Ownable(_owner) ERC721(_name, _symbol)
    {
        expirationTime = _expirationTime;
    }

    function addFunds(uint256 fundsAmount) external onlyOwner moreThanZero(fundsAmount)
    {
        poolBalance += fundsAmount;
        bool success = IERC20(DAI_ADDRESS).transferFrom(msg.sender, address(this), fundsAmount);
        require(success, "Transfer Failed!");
    }

    function issueCard(
        string memory cardName, 
        uint256 issueAmount
    ) external nonReentrant moreThanZero(issueAmount) 
    {
        uint256 issueAmountInUsd = _getUsdValue(DAI_PRICE_FEED_ADDRESS, issueAmount);
        uint256 collateralAmountInWeth = _getTokenAmountFromUsd(ETH_PRICE_FEED_ADDRESS, issueAmountInUsd * 2);
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
    }

    function _getUsdValue(address priceFeedAddress, uint256 amount) public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedAddress);
        (, int256 price,,,) = priceFeed.staleCheckLatestRoundData();
        return ((uint256(price) * ADDITIONAL_FEED_PRECISION) * amount) / PRECISION;
    }

    function _getTokenAmountFromUsd(address priceFeedAddress, uint256 usdAmountInWei) public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedAddress);
        (, int256 price,,,) = priceFeed.staleCheckLatestRoundData();
        return ((usdAmountInWei * PRECISION) / (uint256(price) * ADDITIONAL_FEED_PRECISION));
    }

    function safeMint(address to) private returns(uint256) {
        uint256 tokenId = _tokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }
}