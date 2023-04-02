const hre = require("hardhat");

async function main() {
  const TokenBridgeCelo = await hre.ethers.getContractFactory(
    "TokenBridgeCelo"
  );
  const tokenBridgeCelo = await TokenBridgeCelo.deploy();
  await tokenBridgeCelo.deployed();
  console.log("TokenBridgeCelo address deployed to:", tokenBridgeCelo.address);
}

main();
