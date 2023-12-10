const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

  const _name = "Test";
  const _symbol = "TST";
  const _daiAddress = "0x3135c523d4423959f92B6a0C8a047D456808a62D";
  const _wethAddress = "0x0D8Cc62b73a1E20A2466567d0Ff9bB8E8ABeFa8a";
  const _expirationDays = 30;
  const _interestRate = 5;
  const _pyth = "0xFf255f800044225f54Af4510332Aa3D67CC77635";
  const _daiPriceFeedId =
    "0xb0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd";
  const _wethPriceFeedId =
    "0x2fd8f34e9e6cb5c1a757e1aeb919136da3ae6d0d2243b2ad93d661e590578cd1";

  const CreditCardzkEVMContract = await ethers.getContractFactory(
    "CreditCardzkEVM"
  );
  const creditCard = await CreditCardzkEVMContract.deploy(
    _name,
    _symbol,
    deployer,
    _daiAddress,
    _wethAddress,
    _expirationDays,
    _interestRate,
    _pyth,
    _daiPriceFeedId,
    _wethPriceFeedId
  );
  console.log("CreditCardzkEVM Contract Deployed!");
  console.log(`Contract Address: ${creditCard.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
