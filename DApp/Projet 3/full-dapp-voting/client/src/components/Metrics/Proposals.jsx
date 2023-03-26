import { VStack, HStack, Heading, Text, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const Proposals = ({ storedProposals, rencentProposals }) => {
  const {
    state: { contract, user },
  } = useEth();
  const [storedDescriptions, setStoredDescriptions] = useState([]);
  const [rencentDescriptions, setRencentDescriptions] = useState([]);

  const getProposals = async (propsalIds, setter) => {
    if (!user.address) {
      return;
    }

    propsalIds.forEach(async (id) => {
      const desc = await contract.methods
        .getOneProposal(id)
        .call({ from: user.address });

      setter((crr) => [...crr, desc.description]);
    });
  };

  useEffect(() => {
    if (!contract && !user) {
      return;
    }

    if (storedProposals && contract) {
      getProposals(storedProposals, setStoredDescriptions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedProposals, contract, user]);

  useEffect(() => {
    if (!contract && !user) {
      return;
    }

    if (rencentDescriptions && contract) {
      getProposals(rencentProposals, setRencentDescriptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rencentProposals, contract, user]);

  const length = storedProposals.length + rencentProposals.length;

  return (
    <>
      <Heading as="h4" size="lg" style={{ marginBottom: 8, marginTop: 24 }}>
        Proposal{length > 1 ? "s" : ""} list ({length})
      </Heading>
      <VStack align="stretch" spacing={4}>
        {rencentProposals &&
          rencentProposals.map((id, index) => (
            <VStack align="stretch" key={index}>
              <Heading as="h5" size="lg">
                🆕 recently added
              </Heading>
              <HStack align="stretch" spacing={4}>
                <Text style={{ fontSize: 16 }}>Proposal id:</Text>
                <Text style={{ fontSize: 16, fontWeight: "bold" }} as="kbd">
                  [{id}]
                </Text>
              </HStack>
              <HStack align="stretch" spacing={4}>
                <Text style={{ fontSize: 16 }}>Description:</Text>
                <Text style={{ fontSize: 16, fontWeight: "bold" }} as="kbd">
                  {rencentDescriptions[index]}
                </Text>
              </HStack>
              <Divider />
            </VStack>
          ))}
        {storedProposals &&
          storedProposals.map((id, index) => (
            <VStack align="stretch" key={index}>
              <Heading as="h5" size="lg">
                📥
              </Heading>
              <HStack align="stretch" spacing={4}>
                <Text style={{ fontSize: 16 }}>Proposal id:</Text>
                <Text style={{ fontSize: 16, fontWeight: "bold" }} as="kbd">
                  [{id}]
                </Text>
              </HStack>
              <HStack align="stretch" spacing={4}>
                <Text style={{ fontSize: 16 }}>Description:</Text>
                <Text style={{ fontSize: 16, fontWeight: "bold" }} as="kbd">
                  {storedDescriptions[index]}
                </Text>
              </HStack>
              <Divider />
            </VStack>
          ))}
      </VStack>
    </>
  );
};

export default Proposals;
//
