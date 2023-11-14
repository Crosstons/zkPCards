const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const signers = await ethers.getSigners();
  const deployer = signers[0];
  console.log(deployer.address);
  const zkPCardContract = await ethers.getContractFactory("zkPCard");
  const deployedzkPContract = await zkPCardContract.deploy(deployer.address);
  console.log("zkPCard Contract Deployed!");
  console.log(`Contract Address:  ${deployedzkPContract.target} `);
  console.log(
    `Explorer link: https://explorer.public.zkevm-test.net/address/${deployedzkPContract.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
