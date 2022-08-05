// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Lottary{
    address public manager;
    address payable[] public participents;
    address[] public winners;
    // address[] public player;

    constructor(){
        manager = msg.sender;
    }

    function TotalParticipents() public view returns(address payable[] memory){
        return participents;
    }

    //Special function only once can be written on a contract.
    receive() external payable{
        require(msg.value == 1 ether, 'Only 1 ether is accepted!');
        participents.push(payable(msg.sender));
    }

    function getLottaryNumber() public view returns(uint){
        uint count = 0;
        for(uint i; i<participents.length;i++){
            if(participents[i]==msg.sender){
                count++;
            }
        }
        return count;
    }

    function getBalance() public view returns(uint){
        require(msg.sender == manager, "You don't have permission, Son!");
        return address(this).balance;
    }

    //Random function to generate a random number.
    function Random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participents.length)));
    }

    function Winner() public returns(address){
        require(msg.sender == manager, "Sorry boy you don't have permission!");
        require(participents.length>=3, "Not enough perticepents !");
        uint rand_value = Random();
        uint winner_index = rand_value%participents.length;
        address payable winner;
        winner = participents[winner_index];
        winners.push(winner);
        //Diffrent ways of transfer?
        winner.transfer(getBalance());
        participents = new address payable[](0);
        
        return winner;
        
        

    }
   
    
}