const Voting = artifacts.require("./Voting.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

const { expect } = require('chai');

contract("Voting", accounts => {

    const _admin = accounts[0];
    const _voter1 = accounts[1];
    const _voter2 = accounts[2];
    const _voter3 = accounts[3];

    const proposal1 = "Proposal 1";
    const proposal2 = "Proposal 2";
    const proposal3 = "Proposal 3";

    const errorMessageOnlyOwner = "Ownable: caller is not the owner.";
    const errorMessageOnlyVoter = "You're not a voter";
    let voting;

    describe("Deployment", function () {

        beforeEach(async function () {

            voting = await Voting.new({ from: _admin });
        });

        it("...Should store the administrator address", async () => {

            var owner = await voting.owner.call();
            expect(owner).to.equal(_admin);
            expect(owner).not.equal(_voter1);
        });

        it("...Should default winning proposal ID be 0", async () => {

            var receipt = await voting.workflowStatus.call();
            expect(receipt).to.be.bignumber.equal(BN(0));
        });
    });

    describe("Voter registration", function () {

        beforeEach(async function () {

            voting = await Voting.new({ from: _admin });
        });

        describe("Voter registration started", function () {

            it("...Should the first status be RegisteringVoters", async () => {

                expect(await voting.workflowStatus.call()).to.be.bignumber.equal(BN(0));
            });

            it("...Should revert if the caller is not the administrator", async () => {

                await expectRevert(
                    voting.addVoter(_voter1, { from: _voter1 }),
                    errorMessageOnlyOwner
                );
            });

            it("...Should generates an event when adding a voter", async () => {

                var receipt = await voting.addVoter(_voter1, { from: _admin });
                expectEvent(receipt, 'VoterRegistered', { voterAddress: _voter1 });
            });

            it("...Should revert if adding the same voter", async () => {

                await voting.addVoter(_voter1, { from: _admin });
                await expectRevert(
                    voting.addVoter(_voter1, { from: _admin }),
                    "Already registered."
                );
            });

            it("...Should not be able to check the stored voter if the caller is not a voter", async () => {

                await expectRevert(
                    voting.getVoter(_voter1, { from: _admin }),
                    errorMessageOnlyVoter
                );
            });

            it("...Should be able to get the registered voter stored", async () => {

                await voting.addVoter(_voter1, { from: _admin });
                var receipt = await voting.getVoter(_voter1, { from: _voter1 });
                expect(receipt.isRegistered).to.be.equal(true);
            });
        });

    });

    describe("Proposals registration", function () {

        beforeEach(async function () {

            voting = await Voting.new({ from: _admin });
            await voting.addVoter(_voter1, { from: _admin });
            await voting.addVoter(_voter2, { from: _admin });
        });

        describe("Before starting proposals registration", function () {

            it("...Should not be able to do anything except starting the proposal registration", async () => {

                await expectRevert(
                    voting.endProposalsRegistering({ from: _admin }),
                    "Registering proposals havent started yet"
                );

                await expectRevert(
                    voting.startVotingSession({ from: _admin }),
                    "Registering proposals phase is not finished"
                );

                await expectRevert(
                    voting.endVotingSession({ from: _admin }),
                    "Voting session havent started yet"
                );

                await expectRevert(
                    voting.tallyVotes({ from: _admin }),
                    "Current status is not voting session ended"
                );
            });

            it("...Should revert when trying to add a proposal if the proposal registration is not started", async () => {

                await expectRevert(
                    voting.addProposal(proposal1, { from: _voter1 }),
                    "Proposals are not allowed yet."
                );
            });

            it("...Should not be able to start the proposal session if caller is not the administrator", async () => {

                await expectRevert(
                    voting.startProposalsRegistering({ from: _voter1 }),
                    errorMessageOnlyOwner
                );
            });
        });

        describe("Proposal registration started", function () {

            it("...Should generates an event when changing workflow status to start proposal registration", async () => {

                var receipt = await voting.startProposalsRegistering({ from: _admin });
                expectEvent(receipt, 'WorkflowStatusChange', { previousStatus: BN(0), newStatus: BN(1) });
            });

            it("...Should revert when adding a proposal if the caller is not a voter", async () => {

                await voting.startProposalsRegistering({ from: _admin });
                await expectRevert(
                    voting.addProposal(proposal1, { from: _admin }),
                    errorMessageOnlyVoter
                );
            });

            it("...Should add a default proposal after starting registration", async () => {

                await voting.startProposalsRegistering({ from: _admin });
                var receipt = await voting.getOneProposal(0, { from: _voter1 });
                expect(receipt.description).to.equal("GENESIS");
                expect(receipt.voteCount).to.be.bignumber.equal(BN(0));
            });

            it("...Should revert if the proposal is empty", async () => {

                await voting.startProposalsRegistering({ from: _admin });
                await expectRevert(
                    voting.addProposal("", { from: _voter1 }),
                    "Vous ne pouvez pas ne rien proposer"
                );
            });

            it("...Should generates an event when adding a proposal", async () => {

                await voting.startProposalsRegistering({ from: _admin });
                var receipt = await voting.addProposal(proposal1, { from: _voter1 });
                expectEvent(receipt, 'ProposalRegistered', { proposalId: BN(1) });
            });

            it("...Should not be able to get a proposal if not voter", async () => {

                await voting.startProposalsRegistering({ from: _admin });
                await expectRevert(
                    voting.getOneProposal(0, { from: _admin }),
                    errorMessageOnlyVoter
                );
            });

            it("...Should revert if the proposal doesn't exists", async () => {

                await voting.startProposalsRegistering({ from: _admin });
                await voting.addProposal(proposal1, { from: _voter1 });
                await expectRevert(
                    voting.getOneProposal(99, { from: _voter1 }), "revert"
                );
            });
        });

        describe("Ending proposal registration", function () {

            it("...Should not be able to to do anything except ending the proposal registration", async () => {

                await voting.startProposalsRegistering({ from: _admin });

                await expectRevert(
                    voting.startProposalsRegistering({ from: _admin }),
                    "Registering proposals cant be started now"
                );

                await expectRevert(
                    voting.startVotingSession({ from: _admin }),
                    "Registering proposals phase is not finished"
                );

                await expectRevert(
                    voting.endVotingSession({ from: _admin }),
                    "Voting session havent started yet"
                );

                await expectRevert(
                    voting.tallyVotes({ from: _admin }),
                    "Current status is not voting session ended"
                );
            });

            it("...Should not be able to close the proposal registration if caller is not the administrator", async () => {

                await voting.startProposalsRegistering({ from: _admin });
                await expectRevert(
                    voting.endProposalsRegistering({ from: _voter1 }),
                    errorMessageOnlyOwner
                );
            });

            it("...Should generates an event when changing workflow status to close proposal registration", async () => {

                await voting.startProposalsRegistering({ from: _admin });
                var receipt = await voting.endProposalsRegistering({ from: _admin });
                expectEvent(receipt, 'WorkflowStatusChange', { previousStatus: BN(1), newStatus: BN(2) });
            });
        });
    });

    describe("Voting session", function () {

        beforeEach(async function () {

            voting = await Voting.new({ from: _admin });
            await voting.addVoter(_voter1, { from: _admin });
            await voting.addVoter(_voter2, { from: _admin });
            await voting.startProposalsRegistering({ from: _admin });
            await voting.addProposal(proposal1, { from: _voter1 });
            await voting.addProposal(proposal2, { from: _voter2 });
            await voting.endProposalsRegistering();
        });

        describe("Before starting voting session", function () {

            it("...Should not be able to do anything except starting the voting session", async () => {

                await expectRevert(
                    voting.startProposalsRegistering({ from: _admin }),
                    "Registering proposals cant be started now"
                );

                await expectRevert(
                    voting.endProposalsRegistering({ from: _admin }),
                    "Registering proposals havent started yet"
                );

                await expectRevert(
                    voting.endVotingSession({ from: _admin }),
                    "Voting session havent started yet"
                );

                await expectRevert(
                    voting.tallyVotes({ from: _admin }),
                    "Current status is not voting session ended"
                );
            });

            it("...Should revert when trying to vote if the voting session is not started", async () => {

                await expectRevert(
                    voting.setVote(0, { from: _voter1 }),
                    "Voting session havent started yet"
                );
            });

            it("...Should not be able to start the voting session if caller is not the administrator", async () => {

                await expectRevert(
                    voting.startVotingSession({ from: _voter1 }),
                    errorMessageOnlyOwner
                );
            });
        });

        describe("Voting session started", function () {

            it("...Should generates an event when changing workflow status to start the voting session", async () => {

                var receipt = await voting.startVotingSession({ from: _admin });
                expectEvent(receipt, 'WorkflowStatusChange', { previousStatus: BN(2), newStatus: BN(3) });
            });

            it("...Should revert when voting if the caller is not a voter", async () => {

                await voting.startVotingSession({ from: _admin });
                await expectRevert(
                    voting.setVote(0, { from: _admin }),
                    errorMessageOnlyVoter
                );
            });

            it("...Should revert if the proposal doesn't exists", async () => {

                await voting.startVotingSession({ from: _admin });
                await expectRevert(
                    voting.setVote(99, { from: _voter1 }),
                    "Proposal not found"
                );
            });

            it("...Should generates an event when voter voted", async () => {

                await voting.startVotingSession({ from: _admin });
                var receipt = await voting.setVote(1, { from: _voter1 });
                expectEvent(receipt, 'Voted', { proposalId: BN(1) });
            });

            it("...Should revert if the voter already voted", async () => {

                await voting.startVotingSession({ from: _admin });
                await voting.setVote(1, { from: _voter1 });
                await expectRevert(
                    voting.setVote(2, { from: _voter1 }),
                    "You have already voted"
                );
            });
        });

        describe("Ending voting session", function () {

            it("...Should not be able to do anything except ending the votes", async () => {

                await voting.startVotingSession({ from: _admin });

                await expectRevert(
                    voting.startProposalsRegistering({ from: _admin }),
                    "Registering proposals cant be started now"
                );

                await expectRevert(
                    voting.endProposalsRegistering({ from: _admin }),
                    "Registering proposals havent started yet"
                );

                await expectRevert(
                    voting.startVotingSession({ from: _admin }),
                    "Registering proposals phase is not finished"
                );

                await expectRevert(
                    voting.tallyVotes({ from: _admin }),
                    "Current status is not voting session ended"
                );
            });

            it("...Should not be able to end the voting session if caller is not the administrator", async () => {

                await voting.startVotingSession({ from: _admin });
                await expectRevert(
                    voting.endVotingSession({ from: _voter1 }),
                    errorMessageOnlyOwner
                );
            });

            it("...Should generates an event when changing workflow status to end voting session", async () => {

                await voting.startVotingSession({ from: _admin });
                var receipt = await voting.endVotingSession({ from: _admin });
                expectEvent(receipt, 'WorkflowStatusChange', { previousStatus: BN(3), newStatus: BN(4) });
            });
        });
    });

    describe("Tallying votes", function () {

        beforeEach(async function () {

            voting = await Voting.new({ from: _admin });
            await voting.addVoter(_voter1, { from: _admin });
            await voting.addVoter(_voter2, { from: _admin });
            await voting.addVoter(_voter3, { from: _admin });
            await voting.startProposalsRegistering({ from: _admin });
            await voting.addProposal(proposal1, { from: _voter1 });
            await voting.addProposal(proposal2, { from: _voter1 });
            await voting.addProposal(proposal3, { from: _voter2 });
            await voting.endProposalsRegistering();
            await voting.startVotingSession({ from: _admin });
            await voting.setVote(1, { from: _voter1 });
            await voting.setVote(1, { from: _voter2 });
            await voting.setVote(2, { from: _voter3 });
        });

        describe("Before starting tally votes", function () {

            it("...Should not be able to do anything except tallying the votes", async () => {

                await voting.endVotingSession({ from: _admin });

                await expectRevert(
                    voting.startProposalsRegistering({ from: _admin }),
                    "Registering proposals cant be started now"
                );

                await expectRevert(
                    voting.endProposalsRegistering({ from: _admin }),
                    "Registering proposals havent started yet"
                );

                await expectRevert(
                    voting.startVotingSession({ from: _admin }),
                    "Registering proposals phase is not finished"
                );

                await expectRevert(
                    voting.endVotingSession({ from: _admin }),
                    "Voting session havent started yet"
                );
            });

            it("...Should revert when tallying votes if the voting session is not ended", async () => {

                await expectRevert(
                    voting.tallyVotes({ from: _admin }),
                    "Current status is not voting session ended"
                );
            });

            it("...Should not be able to tally the votes if caller is not the administrator", async () => {

                await expectRevert(
                    voting.tallyVotes({ from: _voter1 }),
                    errorMessageOnlyOwner
                );
            });
        });

        describe("Tallying vote started", function () {

            it("...Should generates an event when changing workflow status to tally votes", async () => {

                await voting.endVotingSession({ from: _admin });
                var receipt = await voting.tallyVotes({ from: _admin });
                expectEvent(receipt, 'WorkflowStatusChange', { previousStatus: BN(4), newStatus: BN(5) });
            });

            it("...Should returns the correct winning proposal ID", async () => {

                await voting.endVotingSession({ from: _admin });
                await voting.tallyVotes({ from: _admin });
                var winningProposalId = await voting.winningProposalID();
                expect(winningProposalId).to.be.bignumber.equal(new BN(1));
            });
        });

        describe("Ending tally votes", function () {

            it("...Should not be able to do anything, the session is over", async () => {

                await voting.endVotingSession({ from: _admin });
                await voting.tallyVotes({ from: _admin });

                await expectRevert(
                    voting.startProposalsRegistering({ from: _admin }),
                    "Registering proposals cant be started now"
                );

                await expectRevert(
                    voting.endProposalsRegistering({ from: _admin }),
                    "Registering proposals havent started yet"
                );

                await expectRevert(
                    voting.startVotingSession({ from: _admin }),
                    "Registering proposals phase is not finished"
                );

                await expectRevert(
                    voting.endVotingSession({ from: _admin }),
                    "Voting session havent started yet"
                );

                await expectRevert(
                    voting.tallyVotes({ from: _admin }),
                    "Current status is not voting session ended"
                );
            });
        });
    });
});