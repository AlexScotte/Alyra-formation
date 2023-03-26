const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

const Class = artifacts.require('Class');
const { expect } = require('chai');

contract('Class', accounts => {

    const _owner = accounts[0];
    const student1 = accounts[1];
    const student2 = accounts[2];
    const student3 = accounts[3];

    let myClass;


    describe("Unit tests", function () {


        beforeEach(async function () {

            myClass = await Class.new();
        });


        describe("Test adding student in array", function () {

            let name = "Alex";
            let note = 10;

            beforeEach(async function () {

                await myClass.addStudent(student1, name, note);
            });

            it('..test name', async function () {

                var student = await myClass.EtudiantsArray(0);
                expect(student.name).to.be.equal(name);
            });

            it('..test note', async function () {

                var student = await myClass.EtudiantsArray(0);
                expect(student.note).to.be.bignumber.equal(new BN(note));
            });
        });

        describe("Test adding student in mapping", function () {

            let name = "Jean";
            let note = 5;

            beforeEach(async function () {

                await myClass.addStudent(student1, name, note);
            });

            it('..test name', async function () {

                var student = await myClass.EtudiantsMap(student1);
                expect(student.name).to.be.equal(name);
            });

            it('..test note', async function () {

                var student = await myClass.EtudiantsMap(student1);
                expect(student.note).to.be.bignumber.equal(new BN(note));
            });
        });

        describe("Test deleting", function () {

            before(async function () {
                myClass = await Class.new({ from: _owner });
                await myClass.addStudent(student1, "cyril", 12, { from: student1 });
                await myClass.addStudent(student2, "alice", 13, { from: student2 });
                await myClass.addStudent(student3, "bob", 14, { from: student2 });
                await myClass.removeStudent(student1, { from: _owner });
            });

            it("should delete name in mapping", async () => {
                const student = await myClass.EtudiantsMap(student1);
                expect(student.name).to.equal("");
            });

            it("should delete note in mapping", async () => {
                const student = await myClass.EtudiantsMap(student1);
                expect(student.note).to.be.bignumber.equal(new BN(0));
            });

            it("should delete name in array", async () => {
                const student = await myClass.EtudiantsArray(0);
                expect(student.name).to.equal("");
            });

            it("should delete note in array", async () => {
                const student = await myClass.EtudiantsArray(0);
                expect(student.note).to.be.bignumber.equal(new BN(0));
            });
        });
    });
});