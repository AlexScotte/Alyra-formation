// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract notationV2 is Ownable {
    struct Student {
        string name;
        string class;
        address addr;
        uint256 noteBiology;
        uint256 noteMaths;
        uint256 noteFr;
    }

    Student[] private students;

    // class => course => address
    mapping(string => mapping(string => address)) teachers;

    event studentAdded(string _name, string _class, address _addr);
    event teacherAdded(string _class, string _course, address _addr);

    function addStudent(
        string memory _name,
        string memory _class,
        address _addr
    ) public onlyOwner {
        students.push(Student(_name, _class, _addr, 0, 0, 0));
        emit studentAdded(_name, _class, _addr);
    }

    function setTeacher(
        string memory _class,
        string memory _course,
        address _addr
    ) public onlyOwner {
        teachers[_class][_course] = _addr;
        emit teacherAdded(_class, _course, _addr);
    }

    function getStudentFromName(string memory _name)
        private
        view
        returns (uint256)
    {
        for (uint256 i = 0; i < students.length; i++) {
            if (
                keccak256(abi.encodePacked(students[i].name)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                return i;
            }
        }
        return 0;
    }

    function stringsEquals(string memory _string1, string memory _string2)
        private
        pure
        returns (bool)
    {
        bool test;
        if (
            keccak256(abi.encodePacked(_string1)) ==
            keccak256(abi.encodePacked(_string2))
        ) {
            test = true;
        }
        return test;
    }

    function setNote(
        string memory _course,
        string memory _nameStudent,
        uint256 _note
    ) public {
        uint256 idStudent = getStudentFromName(_nameStudent);
        require(
            msg.sender == teachers[students[idStudent].class][_course],
            "you re not the teacher of this student course"
        );
        if (stringsEquals(_course, "biology")) {
            students[idStudent].noteBiology = _note;
        } else if (stringsEquals(_course, "maths")) {
            students[idStudent].noteMaths = _note;
        } else if (stringsEquals(_course, "french")) {
            students[idStudent].noteFr = _note;
        } else {
            revert("type a real course");
        }
    }

    function calculateMoyennePerCourse(
        string memory _class,
        string memory _course
    ) public view returns (uint256) {
        require(
            msg.sender == teachers[_class][_course],
            "you're not the teacher of this class course"
        );
        uint256 totalNote;
        uint256 totalStudent;
        for (uint256 i = 0; i < students.length; i++) {
            if (stringsEquals(_class, students[i].class)) {
                if (stringsEquals(_course, "biology")) {
                    totalNote += students[i].noteBiology;
                    totalStudent += 1;
                }
                if (stringsEquals(_course, "maths")) {
                    totalNote += students[i].noteMaths;
                    totalStudent += 1;
                }
                if (stringsEquals(_course, "french")) {
                    totalNote += students[i].noteFr;
                    totalStudent += 1;
                }
            }
        }
        uint256 moyenne = (totalNote * 100) / totalStudent;
        return moyenne;
    }

    function calculateMoyenneStudent(string memory _name)
        public
        view
        onlyOwner
        returns (uint256)
    {
        uint256 idStudent = getStudentFromName(_name);
        return
            (students[idStudent].noteBiology +
                students[idStudent].noteMaths +
                students[idStudent].noteFr) / 3;
    }

    function isPassing(string memory _name)
        public
        view
        onlyOwner
        returns (bool)
    {
        if (calculateMoyenneStudent(_name) >= 10) {
            return true;
        } else {
            return false;
        }
    }

    function calculateMoyenneGenerale(string memory _class)
        public
        view
        onlyOwner
        returns (uint256)
    {
        uint256 totalNote;
        uint256 totalStudent;
        for (uint256 i = 0; i < students.length; i++) {
            if (stringsEquals(_class, students[i].class)) {
                totalNote +=
                    students[i].noteBiology +
                    students[i].noteMaths +
                    students[i].noteFr;
                totalStudent += 3;
            }
        }
        return totalNote / totalStudent;
    }
}
