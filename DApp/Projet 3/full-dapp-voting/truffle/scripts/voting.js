
const Voting = artifacts.require("Voting");

module.exports = async (deployer, network) => {

    var accounts = await web3.eth.getAccounts();
    var owner = accounts[0];
    var voter1 = accounts[1];
    var voter2 = accounts[2];
    var proposal1 = "Proposal number 1";
    var proposal2 = "Proposal number 2";
    var proposal3 = "Proposal number 3";

    // get current deployed contract
    const votingInstance = await Voting.deployed();
    console.log((await votingInstance.workflowStatus()).toNumber());
    console.log(await votingInstance.owner());
    console.log(accounts[0]);

    // // Voter registration
    // await votingInstance.addVoter(voter1, { from: owner });
    // await votingInstance.addVoter(voter2, { from: owner });

    // // Start proposal registration
    // await votingInstance.startProposalsRegistering({ from: owner });
    // console.log((await votingInstance.workflowStatus()).toNumber());

    // // Proposal registration
    // await votingInstance.addProposal(proposal1, { from: voter1 });
    // await votingInstance.addProposal(proposal2, { from: voter2 });
    // await votingInstance.addProposal(proposal3, { from: voter1 });

    // // End proposal registration
    // await votingInstance.endProposalsRegistering({ from: owner });
    // console.log((await votingInstance.workflowStatus()).toNumber());

    // // Start voting session
    // await votingInstance.startVotingSession({ from: owner });
    // console.log((await votingInstance.workflowStatus()).toNumber());

    // // Voting session
    // await votingInstance.setVote(2, { from: voter1 });
    // await votingInstance.setVote(2, { from: voter2 });
    // console.log((await votingInstance.workflowStatus()).toNumber());

    // End voting session
    // await votingInstance.endVotingSession({ from: owner });
    console.log((await votingInstance.workflowStatus()).toNumber());

    // End voting session
    await votingInstance.tallyVotes({ from: owner });
    console.log((await votingInstance.workflowStatus()).toNumber());

    // var p1 = await votingInstance.getOneProposal(0, { from: voter1 });
    // console.log(p1);


};
