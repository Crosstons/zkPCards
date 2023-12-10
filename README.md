# zkPCards

**CONSTELLATION: A CHAINLINK HACKATHON PROJECT**

---

## 🚀 Overview

Welcome to zkPCards, a cutting-edge financial platform combining traditional banking ease with blockchain technology's transformative power. Our dual-card system, featuring Debit and Credit Cards, redefines decentralized finance by leveraging Chainlink on the Sepolia network and Pyth Network on zkEVM Testnet.

---

## 🛠️ Technology Stack

- **Blockchain Networks:** Sepolia (Ethereum), Polygon zkEVM Testnet
- **Oracles:** Chainlink (Sepolia), Pyth Network (Polygon zkEVM Testnet)
- **Frontend:** React JS
- **Smart Contracts:** Solidity
- **Development Tools:** Hardhat

---

## 🌟 Project Highlights

### Debit Cards on zkPCards

#### Overview:

The Debit Card system in zkPCards, deployed on both Sepolia and zkEVM Testnet, offers a straightforward and efficient digital spending solution. This system allows users to transact instantly using blockchain technology, making it a user-friendly alternative to traditional banking cards.

#### How it Works:

- **ERC-721 NFT Representation:** Each debit card is a unique Non-Fungible Token (NFT) on the blockchain, identifiable and transferable. This NFT representation transforms each card into a distinct digital asset, providing clear ownership and the ability to transfer the card's access and associated funds to another user seamlessly.

- **User Control and Accessibility**: Whoever holds the NFT (the debit card) has complete access to its funds. This feature allows for easy transferability of the card's access and balance, making it a flexible financial tool.

- **Loading and Spending Flexibility:** Users can load their cards with funds and use the balance for a variety of transactions, mirroring the functionality of a conventional debit card but with the added benefits of blockchain technology.

- **Expiration and Renewability:** The cards come with an expiration date, ensuring security and up-to-date functionality. Users can track the days left until expiration and renew their cards when necessary, maintaining continuous access to their funds.

### Credit Cards on zkPCards

#### Overview:

The Credit Card system in zkPCards utilizes Chainlink oracles on Sepolia and Pyth oracles on zkEVM. This dual-system approach ensures accurate price feeds and a reliable credit service across different blockchain networks.

#### How it Works:

- **NFT-Based Credit Cards:** Following the debit card model, each credit card is also an ERC-721 NFT. This format provides transferability of credit privileges and clear ownership: the NFT holder is the legitimate user of the credit card, with full access to its credit line.

- **Collateral-Based Credit Issuance:** Users can secure credit by depositing collateral, such as WETH. The credit limit adjusts dynamically, reflecting real-time market conditions and the user's collateral value.

- **Health Factor Monitoring:** The system continuously monitors each account's health factor, assessing the risk and stability of the credit issued. This mechanism is crucial for maintaining the system's integrity, especially in volatile market conditions.

- **Secure and Transparent Liquidation Process:** In case the health factor falls below a certain threshold, the system can initiate a transparent and secure liquidation process to safeguard the ecosystem's stability.

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
