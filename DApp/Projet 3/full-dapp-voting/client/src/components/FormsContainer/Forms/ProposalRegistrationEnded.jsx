import React from "react";
import { Heading } from "@chakra-ui/react";
const ProposalRegistrationEnded = () => {
  return (
    <>
      <Heading as="h3" size="lg">
        ⏳ Proposal registration ended !
      </Heading>
      <Heading as="h4" size="md" style={{ marginTop: 8 }}>
        You need to wait that the owner start the voting sessions.
      </Heading>
    </>
  );
};

export default ProposalRegistrationEnded;
