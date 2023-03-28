const hre = require("hardhat");

async function main() {
  const celoAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // celo contract address
  const TokenBridgeCelo = await hre.ethers.getContractFactory(
    "TokenBridgeCelo"
  );
  const tokenBridgeCelo = await TokenBridgeCelo.deploy(celoAddress);
  await tokenBridgeCelo.deployed();
  console.log("TokenBridgeCelo address deployed to:", tokenBridgeCelo.address);
}

main();
