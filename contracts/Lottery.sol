// specify solidity version being used
pragma solidity ^0.4.17;

contract Lottery {
    // public variables defined up here have an auto function created that returns that value
    address public manager;
    // dynamic array of addresses
    address[] public players;
    // get this to work later
    // address public lastWinner;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        // used for validation, mass in a value that gets converted to true or false
        // if true, rest of function executes, if false, exits
        // require() is used to see that a requirement has been satisfied before executing the rest of a function
        // default is measured in wei, have to put 'ether' if you want the unit to be ether
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        // keccak256 is essentially the same as sha3 hashing algorithm
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public {
        require(msg.sender == manager);
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        // get this to work later
        // lastWinner = players[index];
        // create new players dynamic array with initial length of 0
        players = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}