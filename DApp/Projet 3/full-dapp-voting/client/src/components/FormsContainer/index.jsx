import { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading, Spinner, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import useEth from "../../contexts/EthContext/useEth";

import RegisteringVoters from "./Forms/RegisteringVoters";
import VotingSessionStarted from "./Forms/VotingSessionStarted";
import VotingSessionEnded from "./Forms/VotingSessionEnded";
import ProposalRegistrationStart from "./Forms/ProposalRegistrationStart";
import ProposalRegistrationEnded from "./Forms/ProposalRegistrationEnded";
import VotesTallied from "./Forms/VotesTallied";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  min-height: 100%;
  width: 100%;

  h2 {
    margin: ${({ theme }) => theme.space.three} 0;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden scroll;

  ${({ theme }) => `
    padding: ${theme.space.two};
    border-radius: ${theme.space.one};

    border: 1px solid ${theme.colors.borderGrey};
    box-shadow: ${theme.shadow};
  `}
  width: 100%;
`;

const SwitchForms = (currentStatus, ethContext) => {
  switch (currentStatus) {
    case 0:
      return <RegisteringVoters context={ethContext} />;
    case 1:
      return <ProposalRegistrationStart context={ethContext} />;
    case 2:
      return <ProposalRegistrationEnded />;
    case 3:
      return <VotingSessionStarted context={ethContext} />;
    case 4:
      return <VotingSessionEnded />;
    case 5:
      return <VotesTallied context={ethContext} />;
    default:
      return null;
  }
};

const FormsContainer = ({ currentStatus }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useEth();

  const buttonLabels = [
    "Start proposals registration",
    "Close proposals registration",
    "Start voting session",
    "Close voting session",
    "Tally votes",
  ];

  useEffect(() => {
    if (state.user && state.web3) {
      setIsLoading(false);
    }
  }, [state]);

  const onChangeWorkflow = async (currentStatus) => {
    switch (currentStatus) {
      case 0:
        await state.contract.methods
          .startProposalsRegistering()
          .send({ from: state.user.address });
        break;
      case 1:
        await state.contract.methods
          .endProposalsRegistering()
          .send({ from: state.user.address });
        break;
      case 2:
        await state.contract.methods
          .startVotingSession()
          .send({ from: state.user.address });
        break;
      case 3:
        await state.contract.methods
          .endVotingSession()
          .send({ from: state.user.address });
        break;
      case 4:
        await state.contract.methods
          .tallyVotes()
          .send({ from: state.user.address });
        break;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Heading as="h2" size="xl">
        📄 Forms
      </Heading>
      {isLoading ? (
        <Spinner style={{ alignSelf: "center" }} size="xl" />
      ) : (
        <Card>{SwitchForms(currentStatus, state)}</Card>
      )}

      {!isLoading && state.user.isOwner && currentStatus < 5 && (
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="orange"
          size="lg"
          style={{ marginTop: 24, width: "fit-content", alignSelf: "end" }}
          onClick={() => onChangeWorkflow(currentStatus)}
        >
          {buttonLabels[currentStatus]}
        </Button>
      )}
    </Container>
  );
};

export default FormsContainer;
