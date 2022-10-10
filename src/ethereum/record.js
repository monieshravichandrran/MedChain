const Record = require("./build/Record.json");
const Web3 = require("web3");
const contractAddress = require("./contractAddress");

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(provider);

const instance = new web3.eth.Contract(
  JSON.parse(Record.interface),
  contractAddress
);

export default instance;