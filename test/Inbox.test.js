const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

beforeEach(async () => {
  // get list of all accounts
  accounts = await web3.eth.getAccounts()
  // use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    // what is passed into the arguments array serves as arguments for the Inbox constructor function
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });
  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // check for existence of what is passed in
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    // .call() takes an object where you tell it how that function off the methods
    // object gets called, like amount of gas and who will pay, but message() isn't
    // modifying data, so no need
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, 'Hi there!');
  });
});