require("dotenv").config();
import Web3 from "web3";
import { providers, Contract, ethers } from "ethers";

import { newAccount } from "@celo/identity";
import TokenBridgeCeloABI from "./TokenBridgeCelo.abi.json";
import TokenBridgeMumbaiABI from "./TokenBridgeMumbai.abi.json";
import TokenABI from "./Token.abi.json";

const bridgeCeloAddress = process.env.BRIDGE_CELO_ADDRESS;
const bridgeMumbaiAddress = process.env.BRIDGE_MUMBAI_ADDRESS;
const tokenAddress = process.env.TOKEN_MUMBAI_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const provider = process.env.PROVIDER_URL;

require("dotenv").config();


//TODO: make it only one function getContract()
export async function getCeloBridgeContract() {
  const bridgeCeloABI = TokenBridgeCeloABI;
  let bridgeCeloContract;
  try {
    const { ethereum } = window;
    console.log(ethereum.chainId);
    if (ethereum.chainId === "0xaef3") {
      const provider = new providers.Web3Provider(ethereum);
      console.log("provider", provider);
      const signer = provider.getSigner();
      bridgeCeloContract = new Contract(
        bridgeCeloAddress,
        bridgeCeloABI,
        signer
      );
    } else {
      throw new Error("Please connect to the Alfajores network");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  console.log(bridgeCeloContract);
  return bridgeCeloContract;
}

export async function getMumbaiBridgeContract() {
  //const contractAddress = "0x188AB17e37aF04a43f69f1454Fc4caC3edd3Af2D";
  const bridgeMumbaiABI = TokenBridgeMumbaiABI;
  let bridgeMumbaiContract;
  try {
    const { ethereum } = window;
    console.log(ethereum.chainId);
    if (ethereum.chainId === "0xaef3") {
      const provider = new providers.Web3Provider(ethereum);
      console.log("provider", provider);
      const signer = provider.getSigner();
      bridgeMumbaiContract = new Contract(
        bridgeMumbaiAddress,
        bridgeMumbaiABI,
        signer
      );
    } else {
      throw new Error("Please connect to the Alfajores network");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  console.log(bridgeMumbaiContract);
  return bridgeMumbaiContract;
}

export async function getTokenContract() {
  //const contractAddress = "0x188AB17e37aF04a43f69f1454Fc4caC3edd3Af2D";
  const aBI = TokenABI;
  let tokenContract;
  try {
    const { ethereum } = window;
    console.log(ethereum.chainId);
    if (ethereum.chainId === "0xaef3") {
      const provider = new providers.Web3Provider(ethereum);
      console.log("provider", provider);
      const signer = provider.getSigner();
      tokenContract = new Contract(tokenAddress, aBI, signer);
    } else {
      throw new Error("Please connect to the Alfajores network");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  console.log(tokenContract);
  return tokenContract;
}

async function start() {
  getMumbaiBridgeContract().events.Deposit(
    { fromBlock: 0 },
    async (error, event) => {
      if (error) {
        console.error(`Error in event handler: ${error}`);
        return;
      }

      const amount = event.returnValues.amount;
      console.log(`Deposit received: ${amount} tokens`);

      const to = newAccount().address;
      const bridgeTx = await getCeloBridgeContract()
        .methods.sendToken(to, amount)
        .send({ from, gas: 500000 });

      console.log(`Token bridged: ${bridgeTx.transactionHash}`);

      const balance = await getTokenContract().methods.balanceOf(from).call();
      console.log(`Celo stable token balance: ${balance}`);
    }
  );
}

start();
