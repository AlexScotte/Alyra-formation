// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract notation is Ownable {
    enum course {
        Biology,
        Math,
        Fr
    }

    struct Student {
        string name;
        uint256 noteBiology;
        uint256 noteMath;
        uint256 noteFr;
    }

    mapping(course => mapping(string => Student)) notes;

    Student[] private students;
    mapping(course => address) teachers;

    event studentAdded(string _name, address _addr);
    event teacherAdded(course _course, address _addr);

    function addStudent(string calldata _name, address _addr) public onlyOwner {
        students.push(Student(_name, 0, 0, 0));
        emit studentAdded(_name, _addr);
    }

    function addTeacher(course _course, address _addr) public onlyOwner {
        teachers[_course] = _addr;
        emit teacherAdded(_course, _addr);
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
        revert("The student does not exist.");
    }

    function calculateMeanPerCourse(course _course)
        public
        view
        returns (uint256)
    {
        require(
            msg.sender == teachers[_course],
            "You are not the teacher of this class course."
        );
        uint256 totalNote;
        uint256 totalStudent;

        for (uint256 i = 0; i < students.length; i++) {
            if (_course == course.Biology) {
                totalNote += students[i].noteBiology;
                totalStudent += 1;
            } else if (_course == course.Fr) {
                totalNote += students[i].noteFr;
                totalStudent += 1;
            } else if (_course == course.Math) {
                totalNote += students[i].noteMath;
                totalStudent += 1;
            }
        }
        uint256 mean = (totalNote * 100) / totalStudent;
        return mean;
    }

    function calculateMeanStudent(string memory _name)
        public
        view
        onlyOwner
        returns (uint256)
    {
        uint256 idStudent = getStudentFromName(_name);
        return
            ((students[idStudent].noteBiology +
                students[idStudent].noteFr +
                students[idStudent].noteMath) * 100) / 3;
    }

    function isPassing(string memory _name)
        public
        view
        onlyOwner
        returns (bool)
    {
        return calculateMeanStudent(_name) >= 1000;
    }

    function calculateMeanGlobal() public view onlyOwner returns (uint256) {
        uint256 totalNote;
        uint256 totalStudent;

        for (uint256 i = 0; i < students.length; i++) {
            totalNote +=
                students[i].noteBiology +
                students[i].noteFr +
                students[i].noteMath;
            totalStudent += 3;
        }
        return totalNote / totalStudent;
    }

    function setNote(
        course _course,
        string calldata _nameStudent,
        uint256 _note
    ) public {
        uint256 idStudent = getStudentFromName(_nameStudent);
        require(
            msg.sender == teachers[_course],
            "You are not the teacher of this student course."
        );
        if (_course == course.Biology) {
            students[idStudent].noteBiology = _note;
        } else if (_course == course.Fr) {
            students[idStudent].noteFr = _note;
        } else if (_course == course.Math) {
            students[idStudent].noteMath = _note;
        } else {
            revert("Course type does not exist.");
        }
    }
}
