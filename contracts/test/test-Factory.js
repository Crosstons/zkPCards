const { expect } = require("chai");

describe("Factory Contract", function () {
  before(async function () {
    [this.deployer, this.other] = await ethers.getSigners();
    this.Factory = await ethers.getContractFactory("Factory");
  });

  beforeEach(async function () {
    this.factory = await this.Factory.deploy();
  });

  it("newCardWithSalt", async function () {
    const testSalt =
      "0x736f6d657468696e670000000000000000000000000000000000000000000000";
    const predictedAddress = await this.factory.computeAddress(
      testSalt,
      this.deployer.address
    );
    console.log("Predicted address: ", predictedAddress);
    try {
      await this.factory.connect(this.deployer).newCardWithSalt(testSalt);
      console.log("Function call was successful!");
    } catch (error) {
      console.error("Function call reverted:", error.message);
    }
  });

  it("newCardWithoutSalt", async function () {
    try {
      await this.factory.connect(this.deployer).newCardWithoutSalt();
      console.log("Function call was successful!");
    } catch (error) {
      console.error("Function call reverted:", error.message);
    }
  });
});
