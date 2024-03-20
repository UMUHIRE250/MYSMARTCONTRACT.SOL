// contracts/ContractManager.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContractManager {
    address public owner;
    uint256 public fineAmount;

    event FineSet(uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor(uint256 _fineAmount) {
        owner = msg.sender;
        fineAmount = _fineAmount;
    }

    function setFineAmount(uint256 _newFine) public onlyOwner {
        fineAmount = _newFine;
        emit FineSet(_newFine);
    }

    function createSubcontract() public onlyOwner returns (address) {
        Subcontract newSubcontract = new Subcontract(msg.sender);
        return address(newSubcontract);
    }
}

contract Subcontract {
    address public participant;

    modifier onlyParticipant() {
        require(msg.sender == participant, "Not a participant");
        _;
    }

    constructor(address _participant) {
        participant = _participant;
    }

    function payFine() public onlyParticipant payable {
        require(msg.value >= ContractManager(msg.sender).fineAmount(), "Insufficient funds to pay the fine");
        // Handle fine payment logic
    }
}
