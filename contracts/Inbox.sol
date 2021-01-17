// specify solidity version being used
pragma solidity ^0.4.17;

// declaring new contract (structured like a class in JS)
contract Inbox {
    // declaring contract's instance variables
    // public means it will be accessible to anyone in the world
    string public message;
    // constructor function, same name and casing as the contract name
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}