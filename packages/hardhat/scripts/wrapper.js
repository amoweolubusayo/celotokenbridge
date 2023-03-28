require("dotenv").config();
const { providers, Contract, ethers } = require("ethers");
const { abi } = require("../../../TokenBridgeMumbai.json");
const bridgeMumbaiAddress = "0x27923264F18D9d6C9F7007B36FF5D50d56E12C97";

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
}

module.exports = { getMumbaiBridgeContract, start };
