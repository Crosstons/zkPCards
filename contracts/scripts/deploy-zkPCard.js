const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const signers = await ethers.getSigners();
  const deployer = signers[0].address;

  const zkPCardContract = await ethers.getContractFactory("zkPCard");
  const deployedzkPContract = await zkPCardContract.deploy(
    "zkPCard",
    "ZKPC",
    deployer
  );
  console.log("zkPCard Contract Deployed!");
  console.log(`Contract Address:  ${deployedzkPContract.target} `);
  console.log(
    `Explorer link: https://testnet-zkevm.polygonscan.com/address/${deployedzkPContract.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
