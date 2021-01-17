const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

beforeEach(async () => {
  // get list of all accounts
  accounts = await web3.eth.getAccounts()
  // use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    // what is passed into the arguments array serves as arguments for the Inbox constructor function
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // check for existence of what is passed in
    assert.ok(inbox.options.address);
  });
});