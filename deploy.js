const dotenv = require('dotenv');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env')});

const mneumonic = process.env.MNEUMONIC;
console.log('mneumonic', mneumonic)

const provider = new HDWalletProvider(
  'cloth plunge increase glide round hope achieve fat worth mistake submit equal',
  'https://rinkeby.infura.io/v3/df229ca01f3c474996806f60f74c0e03'
);
// instance of web3 enabled for the rinkeby network
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: ['yo boi'] })
    .send({ from: accounts[0] });

    console.log('Contract deployed to', result.options.address)
}

deploy();