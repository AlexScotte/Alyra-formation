// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

contract Class {
    enum Classe {
        sixieme,
        cinquieme,
        troisieme
    }

    struct Etudiant {
        string name;
        uint256 note;
    }

    mapping(address => Etudiant) public EtudiantsMap;
    Etudiant[] public EtudiantsArray;
    Classe public classe;

    function addStudent(
        address _addr,
        string memory name,
        uint256 note
    ) public {
        Etudiant memory student = Etudiant(name, note);
        EtudiantsMap[_addr] = student;
        EtudiantsArray.push(student);
    }

    function removeStudent(address _addr) public {
        Etudiant memory student = EtudiantsMap[_addr];

        require(bytes(student.name).length > 0, "Unknown student");

        for (uint256 i = 0; i < EtudiantsArray.length; i++) {
            if (
                keccak256(abi.encodePacked(EtudiantsArray[i].name)) ==
                keccak256(abi.encodePacked(student.name))
            ) {
                delete EtudiantsArray[i];
            }
        }

        delete EtudiantsMap[_addr];
    }

    function setClass(Classe _class) public {
        classe = _class;
    }
}
