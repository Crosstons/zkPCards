const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const FactoryContract = await ethers.getContractFactory("CCFactoryzkEVM");
  const factory = await FactoryContract.deploy();
  console.log("Credit Card Factory Contract Deployed!");
  console.log(`Contract Address: ${factory.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
