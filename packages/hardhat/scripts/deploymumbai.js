const hre = require("hardhat");

async function main() {
  const TokenBridgeMumbai = await hre.ethers.getContractFactory(
    "TokenBridgeMumbai"
  );
  const tokenBridgeMumbai = await TokenBridgeMumbai.deploy();
  await tokenBridgeMumbai.deployed();
  console.log(
    "TokenBridgeMumbai address deployed to:",
    tokenBridgeMumbai.address
  );
}

main();
