const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const zkPCardContract = await ethers.getContractFactory("zkPCard");
  const deployedzkPContract = await zkPCardContract.deploy();
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
