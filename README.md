# zkPCards

**CONSTELLATION: A CHAINLINK HACKATHON PROJECT**

---

## 🚀 Overview

Welcome to zkPCards, a cutting-edge financial platform combining traditional banking ease with blockchain technology's transformative power. Our dual-card system, featuring Debit and Credit Cards, redefines decentralized finance by leveraging Chainlink on the Sepolia network and Pyth Network on zkEVM Testnet.

---

## 🛠️ Technology Stack

- **Blockchain Networks:** Sepolia (Ethereum), Polygon zkEVM Testnet
- **Oracles:** Chainlink (Sepolia), Pyth Network (Polygon zkEVM Testnet)
- **Smart Contracts:** Solidity
- **Development Tools:** Hardhat
- **Frontend:** React JS
- **Backend:** Express JS

---

## 🌉 Chainlink Integration

In the zkPCards Credit Card system on the Sepolia network, Chainlink oracles play an indispensable role by providing real-time and reliable price feeds. This integration is central to the functionality of our credit protocol, which relies heavily on accurate and timely financial data.

- **Reliable Price Feeds for Asset Valuation:** Chainlink's decentralized oracles fetch real-time price data for various assets, essential for our `Collateralized Debt Position (CDP)` system. This allows for accurate valuation of collateral (e.g., WETH) and stablecoins (e.g., DAI) used in credit transactions.
- **Collateral Management:** The `OracleLib` library utilizes Chainlink's `AggregatorV3Interface` to access the latest round data of price feeds. By calling latestRoundData(), the system retrieves the most recent price, ensuring that the collateral amount is always in sync with current market values. This is critical for maintaining the health of the CDPs and ensuring the system's solvency.
- **Health Factor Calculation:** The `calculateHealthFactor` function depends on `Chainlink Price Feeds` to determine the health of each credit card account. It uses the current asset prices to calculate the ratio of collateral value to the amount issued. This ratio is crucial for assessing the risk of liquidation and for managing the overall risk of the platform.

Explore our Chainlink integration in detail:

- [View Chainlink Usage Code](https://github.com/kamuikatsurgi/zkPCards/tree/main/contracts/contracts/Credit%20Card/Chainlink/Oracle)

## 🔗 zkEVM and Pyth Network Usage

On zkEVM Testnet, we harness the Pyth Network for high-fidelity price feeds, combining zkEVM's efficiency with Pyth oracles' accuracy.

---

## 🌟 Project Highlights

### Debit Cards on zkPCards

#### Overview:

The Debit Card system in zkPCards, deployed on both Sepolia and zkEVM Testnet, offers a straightforward and efficient digital spending solution. This system allows users to transact instantly using blockchain technology, making it a user-friendly alternative to traditional banking cards.

#### How it Works:

- **NFT Representation:** Each debit card is uniquely represented as a Non-Fungible Token (NFT), making it a distinct digital asset on the blockchain. This NFT format ensures that each card is identifiable and transferable.
- **Loading and Spending:** Users can load their cards with funds, which are then available for spending. The balance on the card can be used for various transactions, just like a regular debit card.
- **Expiration and Renewal:** Debit cards come with an expiration date, ensuring security and regular updates. Users can easily check the remaining days until expiration and renew their cards as needed.

### Credit Cards on zkPCards

#### Overview:

The Credit Card system in zkPCards utilizes Chainlink oracles on Sepolia and Pyth oracles on zkEVM. This dual-system approach ensures accurate price feeds and a reliable credit service across different blockchain networks.

#### How it Works:

- **NFT-Based Credit Cards:** Similar to the debit card system, each credit card is also represented as an NFT. This unique representation allows for the transferability and ownership of credit privileges.
- **Collateral and Spending:** Users can deposit collateral (like WETH) to issue credit against it. This credit can then be spent, with the system dynamically adjusting credit limits based on real-time market data.
- **Health Factor and Liquidation:** The health factor of each credit card account is continuously monitored, ensuring the safety of the system. In case of market volatility, the system can initiate liquidation processes to maintain balance.

---
