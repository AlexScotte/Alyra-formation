// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

interface IStorage{
    function store(uint256 num) external;
    function retrieve() external view returns(uint256);
}   
    
contract inheritance{

    IStorage dc;

    function getContractByAddress(address _addr) external{

        dc = IStorage(_addr);
    }

    function getValue() public view returns(uint){
        return dc.retrieve();
    }

    function setValue(uint _val) public returns(uint){
        dc.store(_val);
        return _val;
    }
}