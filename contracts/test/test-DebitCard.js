const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Debit Card Contract", function () {
  before(async function () {
    [this.deployer, this.other] = await ethers.getSigners();
    this.DebitCard = await ethers.getContractFactory("DebitCard");
  });

  beforeEach(async function () {
    this.debitcard = await this.DebitCard.deploy(
      "Test",
      "TS",
      this.deployer.address
    );
  });

  it("Should be deployed with correct owner", async function () {
    expect(await this.debitcard.owner()).to.equal(this.deployer.address);
  });
  it("Should be unpaused", async function () {
    expect(await this.debitcard.paused()).to.equal(false);
  });
  it("Only owner can pause and can be paused correctly", async function () {
    await expect(
      this.debitcard.connect(this.other).pause()
    ).to.be.revertedWithCustomError(
      this.debitcard,
      "OwnableUnauthorizedAccount"
    );
    await this.debitcard.connect(this.deployer).pause();
    expect(await this.debitcard.paused()).to.equal(true);
  });

  it("Owner can issue a debit card", async function () {
    const timestamp = await time.latest();
    await this.debitcard
      .connect(this.deployer)
      .issueCard("Test", this.other, 10000000000, timestamp + 1000);
    expect(await this.debitcard.getTotalSupply()).to.equal(1);
  });

  it("Can not spend from the card if the pool don't have enough funds", async function () {
    // Issue a card
    const timestamp = await time.latest();
    const issueAmount = 1000;
    await this.debitcard
      .connect(this.deployer)
      .issueCard("Test", this.other.address, issueAmount, timestamp + 1000);

    const tokenId = 1;
    // Spend from the card
    const spendAmount = 500;
    await expect(
      this.debitcard
        .connect(this.other)
        .spendFromCard(tokenId, this.deployer.address, spendAmount)
    ).to.be.reverted;
  });
});
