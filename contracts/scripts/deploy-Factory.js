const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const FactoryContract = await ethers.getContractFactory("Factory");
  const factory = await FactoryContract.deploy();
  console.log("Factory Contract Deployed!");
  console.log(`Contract Address:  ${factory.target} `);
  console.log(
    `Explorer link: https://testnet-zkevm.polygonscan.com/address/${factory.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
