require("dotenv").config();
const abi = require("../../../TokenBridgeMumbai.json");
const Web3 = require("web3");
const {
  CeloContract,
  newKitFromWeb3,
  ContractKit,
} = require("@celo/contractkit");

// Initialize the kit with a URL to a Celo node
const web3 = new Web3("wss://alfajores-forno.celo-testnet.org/ws");
const kit = newKitFromWeb3(web3);

const contractAddress = "0x27923264F18D9d6C9F7007B36FF5D50d56E12C97";
const contract = new kit.web3.eth.Contract(abi.abi, contractAddress);

console.log("events", contract.events);

const fromAddress = "0x1B46F75aC63bc57DFE82A374bDCdbfB08d125792";
const toAddress = contract.options.address;

contract.events.Deposit(
  {
    fromBlock: "latest",
  },
  async (error, event) => {
    if (!error) {
      console.log("Deposit event:", event);
      const amount = event.returnValues.amount;
      const tx = kit.sendTransaction(
        {
          from: fromAddress,
          to: toAddress,
          value: amount,
        },
        (error, transactionHash) => {
          if (!error) {
            console.log("Transaction hash:", transactionHash);
          } else {
            console.error("Error:", error);
          }
        }
      );
    } else {
      console.error("Error:", error);
    }
    console.log(await tx);
  }
);

contract.events
  .Deposit({})
  .on("connected", (subscriptionId) => {
    console.log(`Connected to subscription ${subscriptionId}`);
  })
  .on("data", (event) => {
    console.log("Received deposit event:", event);
  })
  .on("error", (error) => {
    console.error("Error:", error);
  });
