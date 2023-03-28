const hre = require("hardhat");

async function main() {
  const maticAddress = "0x0000000000000000000000000000000000001010"; // matic contract address
  const TokenBridgeMumbai = await hre.ethers.getContractFactory(
    "TokenBridgeMumbai"
  );
  const tokenBridgeMumbai = await TokenBridgeMumbai.deploy(maticAddress);
  await tokenBridgeMumbai.deployed();
  console.log(
    "TokenBridgeMumbai address deployed to:",
    tokenBridgeMumbai.address
  );
}

main();
