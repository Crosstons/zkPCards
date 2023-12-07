const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const OracleLib = await ethers.getContractFactory("OracleLib");
  const oracleLib = await OracleLib.deploy();
  console.log(`OracleLib deployed to: ${oracleLib.target}`);

  const FactoryContract = await ethers.getContractFactory("CCFactory", {
    libraries: {
      OracleLib: oracleLib.target,
    },
  });

  const factory = await FactoryContract.deploy();

  console.log("Credit Card Factory Contract Deployed!");
  console.log(`Contract Address: ${factory.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
