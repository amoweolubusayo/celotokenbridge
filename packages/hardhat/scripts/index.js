require("dotenv").config();
const mumbai = require("../../../TokenBridgeMumbai.json");
const alfajores = require("../../../TokenBridgeCelo.json");
const Web3 = require("web3");
const ethers = require("ethers");
const {
  CeloContract,
  newKitFromWeb3,
  ContractKit,
} = require("@celo/contractkit");

// Initialize the kit with a URL to a Celo node
const web3 = new Web3("wss://alfajores-forno.celo-testnet.org/ws");
const kit = newKitFromWeb3(web3);

const mumbaiContractAddress = "0xbDeEc110E30d65Ba25B84C58aE050bf797f52438";
const contract = new kit.web3.eth.Contract(mumbai.abi, mumbaiContractAddress);

console.log("events", contract.events);

const providerCelo = new ethers.providers.JsonRpcProvider(
  "https://alfajores-forno.celo-testnet.org"
);
const providerMumbai = new ethers.providers.JsonRpcProvider(
  "https://rpc-mumbai.maticvigil.com"
);
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, providerCelo);
const fromAddress = "0x892D2863A03bAC1fEE174b2DAbE0921c402622ED"; // Alfajores contrac
const abi = ["function sendCelo(uint256 amount,address payable recipient)"];
const fromContract = new ethers.Contract(fromAddress, abi, signer);

const iface = new ethers.utils.Interface([
  "event Deposit(address indexed depositor, uint256 amount)",
]);

filter = {
  address: mumbaiContractAddress,
  topics: [
    // the name of the event, parnetheses containing the data type of each event, no spaces
    ethers.utils.id("Deposit(address,uint256)"),
  ],
};

//Watch event
providerMumbai.on(filter, (event) => {
  console.log("Received event");
  console.log("event", event);
  const eventData = iface.decodeEventLog("Deposit", event.data, event.topics);
  console.log(iface.decodeEventLog("Deposit", event.data, event.topics));
  const amount = eventData.amount;
  const tx = fromContract
    .sendCelo(amount, eventData.depositor)
    .then((d) => console.log(d))
    .catch((error) => console.log(error));
  console.log("Transaction", tx);
});
