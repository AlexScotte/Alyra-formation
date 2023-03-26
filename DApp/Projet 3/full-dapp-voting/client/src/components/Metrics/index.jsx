import { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading } from "@chakra-ui/react";
import Voters from "./Voters";
import Proposals from "./Proposals";

const Container = styled.div`
  ${({ theme }) => `
    margin-top: ${theme.space.five};
    padding-top: ${theme.space.five};
    border-top: 1px solid ${theme.colors.borderGrey};
  `}
`;

const Metrics = ({ contract, user }) => {
  const [storedVoters, setStoredVoters] = useState([]);
  const [rencentVoter, setRencentVoter] = useState();
  const [storedProposals, setStoredProposal] = useState([]);
  const [rencentProposals, setRencentProposals] = useState([]);

  useEffect(() => {
    const waitingFunctions = async () => {
      function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
      }

      const oldEvents = await contract.getPastEvents("VoterRegistered", {
        fromBlock: 0,
        toBlock: "latest",
      });

      oldEvents.forEach((event) => {
        setStoredVoters((crr) =>
          removeDuplicates([...crr, event.returnValues.voterAddress])
        );
      });

      await contract.events
        .VoterRegistered({ fromBlock: "earliest" })
        .on("data", (event) => {
          setRencentVoter(event.returnValues.voterAddress);
        });

      const old = await contract.getPastEvents("ProposalRegistered", {
        fromBlock: 0,
        toBlock: "latest",
      });

      old.forEach((event) => {
        setStoredProposal((crr) =>
          removeDuplicates([...crr, event.returnValues.proposalId])
        );
      });

      await contract.events
        .ProposalRegistered({ fromBlock: "earliest" })
        .on("data", (event) => {
          setRencentProposals((crr) =>
            removeDuplicates([...crr, event.returnValues.proposalId])
          );
        });
    };

    if (contract) {
      waitingFunctions();
    }
  }, [contract]);

  return (
    <Container>
      <Heading as="h2" size="xl" style={{ marginBottom: 24 }}>
        📊 Metrics
      </Heading>
      <Voters addressList={storedVoters} lastAddress={rencentVoter} />
      {user && user.isVoter && (
        <Proposals
          storedProposals={storedProposals}
          rencentProposals={rencentProposals}
        />
      )}
    </Container>
  );
};

export default Metrics;
