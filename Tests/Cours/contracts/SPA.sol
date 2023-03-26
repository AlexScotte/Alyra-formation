// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract SPA  {

    event animalAdded(uint id);
    event animalAdopted(uint _id, address _addr);

    struct Animal{

        string race;
        uint height;
        uint age;
        bool isAdopted;
    }

    mapping(address => uint) masters;
    Animal[] animals;

    modifier isExising(uint _id){
        require(_id < animals.length, "Animal does not exist");
        _;
    }


    // ************* CRUD ********************

    function create(string calldata _race, uint _height, uint _age) external{

        Animal memory animal = Animal(_race, _height, _age, false);
        animals.push(animal);
        emit animalAdded(animals.length - 1);
    }

    function read(uint _id) external view isExising(_id) returns(Animal memory) {
        
        return animals[_id];
    }

    function update(uint _id, string calldata _race, uint _height, uint _age) external isExising(_id){
        animals[_id].race = _race;
        animals[_id].height = _height;
        animals[_id].age = _age;
    }

    function deleteAnimal(uint _id) external isExising(_id){

        delete animals[_id];
    }

    // *********************************



    function adopt(uint _id) external isExising(_id){
        
        require(animals[_id].isAdopted == false, "This animal is already adopted");
        animals[_id].isAdopted = true;
        masters[msg.sender] = _id;
        emit animalAdopted(_id, msg.sender);
    }

    function getAdopted(address _addr) public view returns(Animal memory){
        return animals[masters[_addr]];
    }

    function adoptIfMax(string calldata _race, uint _maxHeight, uint _maxAge) external returns(bool){

        Animal[] memory tempAnimal = animals;
        for(uint i; i<tempAnimal.length; i++){
            if(keccak256(abi.encodePacked(_race)) == keccak256(abi.encodePacked(animals[i].race))){
                if(tempAnimal[i].height < _maxHeight){
                    if(tempAnimal[i].age < _maxAge){
                        if(tempAnimal[i].isAdopted == false){
                            tempAnimal[i].isAdopted = true;
                            masters[msg.sender] = i;
                            emit animalAdopted(i, msg.sender);
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}