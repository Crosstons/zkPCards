const { expect } = require("chai");

describe("Factory Contract", function () {
  before(async function () {
    [this.deployer, this.other] = await ethers.getSigners();
    this.salt =
      "0x736f6d657468696e670000000000000000000000000000000000000000000000";
    this.linkAdress = "0xa375fEfcA27a639361139718145dffc29A44cB6d";
    this.Factory = await ethers.getContractFactory("Factory");
  });

  beforeEach(async function () {
    this.factory = await this.Factory.deploy();
  });

  it("newCardWithSalt", async function () {
    const predictedAddress = await this.factory.computeAddress(
      this.salt,
      "Test",
      "TS",
      this.deployer.address,
      this.linkAdress
    );
    try {
      await this.factory
        .connect(this.deployer)
        .newCardWithSalt(this.salt, "Test", "TS", this.linkAdress);
    } catch (error) {
      console.error("Function call reverted:", error.message);
    }
    const getCardAddresses = await this.factory.getCardsIssued(
      this.deployer.address
    );
    expect(getCardAddresses[0]).to.equal(predictedAddress);
  });

  it("newCardWithoutSalt", async function () {
    try {
      await this.factory
        .connect(this.deployer)
        .newCardWithoutSalt("Test", "TS", this.linkAdress);
    } catch (error) {
      console.error("Function call reverted:", error.message);
    }
  });
});
