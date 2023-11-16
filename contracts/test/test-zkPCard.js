const { expect } = require("chai");

describe("zkPCard Contract", function () {
  before(async function () {
    [this.deployer, this.other] = await ethers.getSigners();
    this.zkPCardContract = await ethers.getContractFactory("zkPCard");
  });

  beforeEach(async function () {
    this.zkPCard = await this.zkPCardContract.deploy(
      "Test",
      "TS",
      this.deployer.address
    );
  });

  it("Should be deployed with correct owner", async function () {
    expect(await this.zkPCard.owner()).to.equal(this.deployer.address);
  });
  it("Should be unpaused", async function () {
    expect(await this.zkPCard.paused()).to.equal(false);
  });
  it("Only owner can pause and can be paused correctly", async function () {
    await expect(
      this.zkPCard.connect(this.other).pause()
    ).to.be.revertedWithCustomError(this.zkPCard, "OwnableUnauthorizedAccount");
    await this.zkPCard.connect(this.deployer).pause();
    expect(await this.zkPCard.paused()).to.equal(true);
  });
});
