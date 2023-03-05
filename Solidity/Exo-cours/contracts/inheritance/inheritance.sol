// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

contract Parent {
    uint256 myValue;

    function setValue(uint256 _value) external {
        myValue = _value;
    }
}

contract Child is Parent {
    function getParentValue() external view returns (uint256) {
        return myValue;
    }
}

contract Caller {
    function createChild(uint256 _value) public returns (uint256) {
        Child child = new Child();
        child.setValue(_value);
        return child.getParentValue();
    }
}
