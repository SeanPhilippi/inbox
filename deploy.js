const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const mneumonic = process.env.MNEUMONIC;

const provider = newHDWalletProvider(
  mneumonic,
  'https://rinkeby.infura.io/v3/df229ca01f3c474996806f60f74c0e03'
);
// instance of web3 enabled for the rinkeby network
const web3 = new Web3(provider);