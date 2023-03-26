import {
  VStack,
  Heading,
  Card,
  Text,
  CardBody,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { errorManager, addressFormated } from "../../../utils.js";

const VotesTallied = ({ context }) => {
  const { user, contract } = context;
  const toast = useToast();

  const [voters, setVoters] = useState();
  const [winningProposal, setWinningProposal] = useState({
    id: -1,
    description: "",
    voteCount: 0,
    isVisible: false,
  });

  useEffect(() => {
    if (!contract) return;

    const waitEvents = async () => {
      const events = await contract.getPastEvents("Voted", {
        fromBlock: 0,
        toBlock: "latest",
      });

      setVoters(
        events.map((e) => ({
          address: e.returnValues.voter,
          id: e.returnValues.proposalId,
        }))
      );
    };

    waitEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!contract) {
      return;
    }

    (async function () {
      try {
        const winningProposalID = await contract.methods
          .winningProposalID()
          .call();

        if (user.isVoter) {
          var result = await contract.methods
            .getOneProposal(winningProposalID)
            .call({ from: user.address });
        }

        setWinningProposal({
          id: winningProposalID,
          description: result ? result.description : "",
          voteCount: result ? result.voteCount : 0,
          isVisible: true,
        });
      } catch (error) {
        toast({
          position: "bottom-left",
          title: "Get winner error.",
          description: `${errorManager(error)}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  return (
    <>
      <VStack align="center" spacing="24px">
        <Heading as="h3" size="lg">
          🏆 La proposition {winningProposal.id} remporte le vote ! 🏆
        </Heading>

        {user.isVoter && (
          <Card
            hidden={!winningProposal.isVisible}
            style={{ alignSelf: "center" }}
          >
            <CardBody>
              <Text fontSize="xl" as="b">
                Proposal N° {winningProposal.id}.
              </Text>
              <Text fontSize="xl">{winningProposal.description}</Text>
              <Text fontSize="xl" as="i">
                (Nombre de vote: {winningProposal.voteCount})
              </Text>
            </CardBody>
          </Card>
        )}
        {voters && (
          <Wrap>
            {voters.map((voter, index) => (
              <WrapItem
                style={{
                  listStyle: "none",
                  fontSize: 16,
                  width: "fit-content",
                }}
                key={index}
              >
                👤 : {addressFormated(voter.address)} voted for proposal
                <Text
                  style={{ marginLeft: 4, fontSize: 16, fontWeight: "bold" }}
                  as="kbd"
                >
                  [{voter.id}]
                </Text>
              </WrapItem>
            ))}
          </Wrap>
        )}
      </VStack>
    </>
  );
};

export default VotesTallied;
