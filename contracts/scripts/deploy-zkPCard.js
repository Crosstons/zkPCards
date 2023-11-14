const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const signers = await ethers.getSigners();
  const deployer = signers[0].address;

  // Just for testing keeping LINK as the token
  const LINKAddress = "0xa375fEfcA27a639361139718145dffc29A44cB6d";
  const zkPCardContract = await ethers.getContractFactory("zkPCard");
  const deployedzkPContract = await zkPCardContract.deploy(
    "zkPCard",
    "ZKPC",
    deployer,
    LINKAddress
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
