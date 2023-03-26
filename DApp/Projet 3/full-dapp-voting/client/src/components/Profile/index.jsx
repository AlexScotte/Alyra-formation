import { HStack, VStack, Tag, Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Profile = ({ user, contract }) => {
  const [voter, setVoter] = useState();

  useEffect(() => {
    if (!user && !contract) {
      return;
    }

    const waitVoter = async () => {
      if (contract && user.isVoter) {
        const result = await contract.methods
          .getVoter(user.address)
          .call({ from: user.address });

        setVoter((crr) => ({ ...crr, hasVoted: result.hasVoted }));
      } else {
        setVoter((crr) => ({ ...crr, hasVoted: false }));
      }
    };

    waitVoter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getUserEmoji = (user) => {
    if (!user) return `👤`;
    if (user.isOwner) return `🤴`;
    else if (user.isVoter) return `🙋‍♂️`;
    else if (user.isVoter) return `🙋‍♂️`;
    else return `🦹‍♂️`;
  };

  return (
    <Box
      alignSelf="end"
      p="16px"
      maxW="fit-content"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      style={{ marginTop: 40 }}
    >
      <Heading as="h3" size="xl" style={{ marginBottom: 8 }}>
        Profile
      </Heading>
      {user && (
        <Text fontSize="xl" as="i">{`${user.address.substring(
          0,
          5
        )}...${user.address.substr(user.address.length - 5)}`}</Text>
      )}
      <HStack spacing="24px">
        <span style={{ fontSize: 36 }}>{getUserEmoji(user)}</span>
        {user && (
          <VStack align="stretch">
            {user.isOwner && (
              <Tag colorScheme="orange" size="lg">
                Owner
              </Tag>
            )}
            {user.isVoter && (
              <Tag colorScheme="cyan" size="lg">
                Voter
              </Tag>
            )}
            {!user.isVoter && <Tag size="lg">Not voter</Tag>}
            {voter?.hasVoted && (
              <Tag colorScheme="pink" size="lg">
                Has voted
              </Tag>
            )}
          </VStack>
        )}
      </HStack>
    </Box>
  );
};

export default Profile;
