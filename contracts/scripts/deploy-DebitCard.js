const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const signers = await ethers.getSigners();
  const deployer = signers[0].address;

  const DCContract = await ethers.getContractFactory("DebitCard");
  const deployedDCContract = await DCContract.deploy(
    "Smart Debit Card",
    "SDC",
    deployer
  );
  console.log("Debit Card Contract Deployed!");
  console.log(`Contract Address:  ${deployedDCContract.target} `);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
