require("dotenv").config();
const { providers, Contract, ethers } = require("ethers");
const { abi } = require("../../../TokenBridgeMumbai.json");
const bridgeMumbaiAddress = "0xbDeEc110E30d65Ba25B84C58aE050bf797f52438";

async function getMumbaiBridgeContract() {
  const bridgeMumbaiABI = abi;
  let bridgeMumbaiContract;
  try {
    const { ethereum } = window;
    console.log(ethereum.chainId);
    if (ethereum.chainId === "0x13881") {
      const provider = new providers.Web3Provider(ethereum);
      console.log("provider", provider);
      const signer = provider.getSigner();
      bridgeMumbaiContract = new Contract(
        bridgeMumbaiAddress,
        bridgeMumbaiABI,
        signer
      );
    } else {
      throw new Error("Please connect to the Mumbai network");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  console.log(bridgeMumbaiContract);
  return bridgeMumbaiContract;
}

async function start(amount) {
  const contract = await getMumbaiBridgeContract();
  console.log("bridge", await contract);
  const tx = contract.depositMatic({
    gasLimit: 300000,
    value: ethers.utils.parseUnits(amount, 18),
  });
  console.log(await tx);
  tx.then((receipt) => {
    console.log("Transaction receipt:", receipt);
  });
  return tx;
}

module.exports = { getMumbaiBridgeContract, start };
