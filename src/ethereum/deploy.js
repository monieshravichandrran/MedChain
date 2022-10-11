const Web3 = require("web3");
const compiledRecord = require("./build/Record.json");

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(provider);

const deploy = async () => {
  let accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  let contract = await new web3.eth.Contract(JSON.parse(compiledRecord.interface))
    .deploy({ data: compiledRecord.bytecode })
    .send({ from: accounts[0], gas: "5000000" });

  await contract.methods.addHospitals(accounts[1]).send({ from: accounts[0] });
  await contract.methods.addPatients(accounts[2]).send({ from: accounts[0] });

  console.log("Contract deployed to ", contract.options.address);
};
deploy();
