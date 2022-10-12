const assert = require("assert");
const Web3 = require("web3");
const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(provider);

const compiledRecord = require("../src/ethereum/build/Record.json");

let accounts;
let record;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  record = await new web3.eth.Contract(JSON.parse(compiledRecord.interface))
    .deploy({ data: compiledRecord.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await record.methods.addHospitals(accounts[1]).send({ from: accounts[0] });
  await record.methods.addPatients(accounts[2]).send({ from: accounts[0] });
});

const asciiArray = [
  81,
  109,
  81,
  71,
  75,
  51,
  112,
  102,
  98,
  70,
  78,
  107,
  82,
  89,
  85,
  114,
  82,
  101,
  98,
  100,
  97,
  75,
  89,
  110,
  122,
  104,
  55,
  103,
  86,
  100,
  111,
  72,
  106,
  105,
  110,
  103,
  114,
  89,
  106,
  74,
  51,
  80,
  52,
  111,
  87,
  80,
];

describe("Record", () => {
  it("deploys a record and a campaign", () => {
    assert.ok(record.options.address);
  });
  it("adds records", async () => {
    await record.methods
      .addPatientRecords(accounts[2], asciiArray)
      .call({ from: accounts[1], gas: "6100000" });
  });
  it("get records", async () => {
    await record.methods
      .addPatientRecords(accounts[2], asciiArray)
      .send({ from: accounts[1], gas: "6100000" });
    const res = await record.methods.getPatientRecords(accounts[2]).call({
      from: accounts[1],
      gas: "6100000",
    });
    console.log(res);
  });
  it("get records count", async () => {
    await record.methods
      .addPatientRecords(accounts[2], asciiArray)
      .send({ from: accounts[1], gas: "6100000" });
    const res = await record.methods.getPatientRecords(accounts[2]).call({
      from: accounts[1],
      gas: "6100000",
    });
    console.log(res);
    const res1 = await record.methods.getPatientRecordsCount(accounts[2]).call({
      from: accounts[1],
      gas: "6100000",
    });
    console.log("res:", res1);
  });
});
