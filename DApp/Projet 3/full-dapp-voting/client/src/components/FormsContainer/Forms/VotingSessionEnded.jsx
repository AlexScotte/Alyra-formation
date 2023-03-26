import {
  VStack,
  Heading,
} from "@chakra-ui/react";
import useEth from "../../../contexts/EthContext/useEth";

const VotingSessionEnded = () => {

  const { state: { user } } = useEth();

  return (
    <>
      {user.isOwner ? (

        <VStack align="start" spacing="24px">
          <Heading as="h3" size="lg">
            ⏳ Voting session is now closed.
            Voters are waiting for the result !
          </Heading>
        </VStack>

      ) : (

        user.isVoter ? (
          <>
            <Heading as="h3" size="lg">
              ⏳ The voting session is now closed.
              Wait for the results !
            </Heading>
          </>
        ) : (
          <Heading as="h3" size="lg">
            ❌ Sorry, but you are not registered.
          </Heading>
        )
      )}
    </>
  );
};

export default VotingSessionEnded;
